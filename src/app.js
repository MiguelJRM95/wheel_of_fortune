const express = require('express');
const path = require('path');
const nodemailer = require("nodemailer");
const app = express();
//Port you want the app to listen and run
const port = process.env.PORT || 3000;

//Config params of Nodemailer
const emailHost = process.env.EMAIL_HOST || "smtp.mailtrap.io";
const emailPort = process.env.EMAIL_PORT || 2525;
const emailUser = process.env.EMAIL_USER || "a558b8d1e7d5cd";
const emailPwd = process.env.EMAIL_PWD || "151995bd37d8f6";
const emailAddrs = process.env.EMAIL_ADDRS || "miguel@mail.spain";


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Import of faunadb module
//q Query object of the faunadb module
const faunadb = require('faunadb');
const q = faunadb.query;
//Connection to the client via admin secret, once per admin client {FAUNADB_ADMIN_SECRET}
const adminClient = new faunadb.Client({ secret: process.env.FAUNADB_ADMIN_SECRET || 'fnAEYF9RMoACSYdCNvXRkitKbQJEyvkEUp8BnssU' });


//Creates the connection to Nodemailer with the env passed
const transporter = nodemailer.createTransport({
  host: emailHost,
  port: emailPort,
  secure: false, 
  auth: {
    user: emailUser, 
    pass: emailPwd, 
  },
});

//In order to serve statics file from the public folder this function is a must
//function .static(x) where x is the path of the folder to serve
app.use(express.static(path.join(__dirname,'public')));


//Routing for the statics pages
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/win', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/win.html'));
});

app.get('/about', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/about.html'));
});

app.get('/contact', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/contact.html'));
});



//Get route where the home route fetch the data
//from faunadb. This await query is fetching
//all the entries of the quotes collection
//and then responding with the data in json
//if there is an error it will responde with json as well
app.get('/quotes', async (req, res) => {
  try {
    let quotes = await adminClient.query(
      q.Map(
        q.Paginate(q.Documents(q.Collection("quotes"))),
        q.Lambda("X", q.Get(q.Var("X")))
      )
    );

    res.status(200).json(quotes);
  } catch (error) {
    res.status(500).json({error: error.description});
  }
});



//Post request from the Contact Us page
//It recieving the name, email, subject and body
//of the message from the user and sending to 
//the email of the env. variable {EMAIL_ADDRS}
//It uses all the env. variables for the Nodemailer config
app.post('/email', async (req, res) => {
  try{
    let nameSender = req.body.name;
    let sender = req.body.email;
    let emailBody = req.body.body;
    let subject = req.body.subject;

    await transporter.sendMail({
      from: `"${nameSender}" <${sender}>`, 
      to: `${emailAddrs}`, 
      subject: `${subject}`,
      text: "Plaintext version of the message", 
      html: `<p>${emailBody}</p>`
    });
    res.sendFile(path.join(__dirname, '/public/index.html'));
  }catch{
    console.error;
  }
});


//Logging to remind the port the app is listening
app.listen(port, () => {
  console.log(`Newfordneurcoach app listening at http://localhost:${port}`);
})
