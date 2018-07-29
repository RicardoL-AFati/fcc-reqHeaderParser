const express = require('express');
const cors = require('cors');
const path = require('path');
// Creating app and adding middleware
const app = express();
app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('build'));

/* GET ROUTES */

// GET api route - returns IP, preferred langs, and system info for device
app.get('/api/whoami', (req, res) => {
  // taking ip from req body and assigning to ip
  let { ip } = req;
  // regex to check for ipv6 placeholder '::ffff:' for ipv4 addresses
  const ipv6Regex = /:{2}f{4}:/;
  // if present - remove from ip
  if (req.ip.match(ipv6Regex)) {
    ip = ip.replace(ipv6Regex, '');
  }
  // send JSON with: ip, lang. and system info
  res.send({
    ipaddress: ip,
    language: req.headers['accept-language'],
    software: req.headers['user-agent'],
  });
});

// GET for serving static assets
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

// Port is production port or localhost:5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);
