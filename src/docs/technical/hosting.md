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