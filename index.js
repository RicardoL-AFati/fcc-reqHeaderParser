const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.get('/api/whoami', (req, res) => {
  let { ip } = req;
  const ipv6Regex = /:{2}f{4}:/;
  if (req.ip.match(ipv6Regex)) {
    ip = ip.replace(ipv6Regex, '');
  }
  res.send({
    ipaddress: ip,
    language: req.headers['accept-language'],
    software: req.headers['user-agent'],
  });
});

app.use(express.static('build'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
