const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

const faunadb = require('faunadb');
const q = faunadb.query;
const adminClient = new faunadb.Client({ secret: process.env.FAUNADB_ADMIN_SECRET || 'fnAEYF9RMoACSYdCNvXRkitKbQJEyvkEUp8BnssU' });


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


app.get('/quotes', async (req, res) => {
  try {
    let quotes = await adminClient.query(
      q.Map(
        q.Paginate(q.Documents(q.Collection("quotes"))),
        q.Lambda("X", q.Get(q.Var("X")))
      )
    )

    res.status(200).json(quotes)
  } catch (error) {
    res.status(500).json({error: error.description})
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
