const express = require('express');
const path = require('path');
const nodemailer = require("nodemailer");
const app = express();
const port = process.env.PORT || 3000;
const emailHost = process.env.EMAIL_HOST || "smtp.mailtrap.io";
const emailPort = process.env.EMAIL_PORT || 2525;
const emailUser = process.env.EMAIL_USER || "a558b8d1e7d5cd";
const emailPwd = process.env.EMAIL_PWD || "151995bd37d8f6";
const emailAddrs = process.env.EMAIL_ADDRS || "miguel@mail.spain";


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const faunadb = require('faunadb');
const q = faunadb.query;
const adminClient = new faunadb.Client({ secret: process.env.FAUNADB_ADMIN_SECRET || 'fnAEYF9RMoACSYdCNvXRkitKbQJEyvkEUp8BnssU' });

const transporter = nodemailer.createTransport({
  host: emailHost,
  port: emailPort,
  secure: false, 
  auth: {
    user: emailUser, 
    pass: emailPwd, 
  },
});


app.use(express.static(path.join(__dirname,'public')));

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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
