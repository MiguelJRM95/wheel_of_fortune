const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname,'public')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/win', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/win.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
