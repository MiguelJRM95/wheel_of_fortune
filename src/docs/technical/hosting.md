# Hosting depending on user requests per minute
---

Well for this task since the app is quite simple, we only will needed to focus on the requests,
for this topic, I will use a load balancer server as a gateway between the users and the servers
that host the app.

This require that the load balancer server and the server nodes to be in the same network or 
the load balancer be capable of reach the network of the nodes for example adding the nodes network
to the load balancer route table.

But for this laboratory the load balancer and the nodes will be in the same network for simplicity.

This load balancer server will use:
 - apache httpd service 
    - the mod_proxy 
    - mod_proxy_http (since the servers would only recieve http requests from the users)
    - mod_lbmethod_byrequests

 - apache JMeter to test the load balancer configuration and know how the nodes will handle the amount of requests

### A general overview of the set up would be like this:

> ![Network](https://github.com/MiguelJRM95/wheel_of_fortune/blob/master/media/host.png)


### General Configuration

- Both Load Balancer server and Nodes will be running Ubuntu Server 24.04
- All the Nodes will have instaled Nodejs version 16.13.0
- As mentioned before all will be in the same network


## Load Balancer Configuration
> - The apache httpd service needs to have enable:
   - the mod_proxy 
   - mod_proxy_http
   - mod_lbmethod_byrequests
   > For that, the file **httpd.conf** need to have that lines uncommented:

      
         ...
         LoadModule lbmethod_byrequests_module modules/mod_lbmethod_byrequests.so
         ...
         LoadModule proxy_module modules/mod_proxy.so
         #LoadModule proxy_ajp_module modules/mod_proxy_ajp.so
         LoadModule proxy_balancer_module modules/mod_proxy_balancer.so
         LoadModule proxy_connect_module modules/mod_proxy_connect.so
         #LoadModule proxy_express_module modules/mod_proxy_express.so
         #LoadModule proxy_fcgi_module modules/mod_proxy_fcgi.so
         #LoadModule proxy_ftp_module modules/mod_proxy_ftp.so
         #LoadModule proxy_hcheck_module modules/mod_proxy_hcheck.so
         #LoadModule proxy_html_module modules/mod_proxy_html.so
         LoadModule proxy_http_module modules/mod_proxy_http.so
         ...
      

- We also can check that this modules are enable:

      
      httpd -M | grep proxy
      httpd -M | grep quequests
      

- In some cases the firewall could refuse or block connection, for avoid that we could type:

      
      firewall-cmd --permanent --add-service=http
      firewall-cmd reload
    

- Now we need to create a vhost config file, this will contain the directives to send the users requests to the nodes,
Our apache server will listen in port 80, the default port

      
      <VirtualHost *:80>
         # This directive is off by default, and is a good practise to keep it off for security reasons
         ProxyRequests Off 

         # Enable web GUI to monitor how the load balancing is working
         <Location /balancer-manager>
            SetHandler balancer-manager
            # Whit this directive you set who have access to the manager, it's also recomended for security reasons to config the IP that will have access to this manager
            Require host localhost
         </Location>
         
         # Directives for load balancer
         # Here we need to define our modules as BalancerMembers
         # <DNS/IP> The Ip or DNS of each server, for this example we are going to use a static IP 10.0.1.X
         # <PORT> The port to connect, in this case, the app will run by default at the 3000 port
         # We can set up the netplan of the worker nodes to have a static IP instead of recieving a dinamic one via DHCP
         <Proxy balancer://master-balancer>
            BalancerMember http://<DNS/IP>:<PORT>
            BalancerMember http://<DNS/IP>:<PORT>
            BalancerMember http://<DNS/IP>:<PORT>
            BalancerMember http://<DNS/IP>:<PORT>
            # We also can set the preference of the workers with the attribute loadfactor
            # And setting up backup workers with the attribute lbset=X where X is a number, and the lowest this number is, the earliest that worker will be required
            ....
            ProxySet lbmethod=byrequests
         </Proxy>

         # So we can connect to the balance manager
         ProxyPass /balancer-manager !

         # will aloud request to the app home that it's running on each worker for example http://10.0.1.2:3000/ for worker 1
         ProxyPass / balancer://master-balancer
         ProxyPassReverse / balancer://master-balancer

      </VirtualHost>
      
   > Now we need to restart the httpd service

     
      systemctl restart httpd
      

   > We can check now the state of the service 


      systemctl status httpd
      
- Now before open the network to the internet we will run the test with JMeter, to know how our workers will perform. Inside
   jMeter folder are the test for the three scenarios. To run a test simply go to the bin folder inside the jmeter instalation and type:

    jmeter -n –t test.jmx -l testresults.jtl

    > You need first to edit the test file to modify the IP of the balancer-master
    > [jMeter](../jMeter/)


## Workers Configuration

> Our workers only need to have Nodejs installed and the node app
> We can made a simple script that runs the node app when the system start
> Finally we can calculate the RAM resouces use in each worker

   ``
   # RAM that a apache request by a user use
   ps -ylC node –sort:rss | awk ‘{SUM += $8; I += 1} END {print SUM/I/1024}’

   ``

   # RAM of the rest of the service use
   ps -N -ylC node –sort:rss | awk ‘{SUM += $8} END {print SUM/1024}’

> Knowing this we can calculet aproximatly the maximum amount of concurrent conexions supported for each user by our worker
RAM concurrence = (total RAM - RAM uses by the system)/ RAM per user
   - We need to remember that a user could by consuming more than one request for the service


Documentation used: