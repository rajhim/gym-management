require("dotenv").config();
const express = require("express");
const app = express();
const memberRouter = require("./api/member/member.router");
const securityRouter = require("./api/security/security.router");

var os = require('os');

var ifaces = os.networkInterfaces();
var Ip;
Object.keys(ifaces).forEach(function (ifname) {
  var alias = 0;

  ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }

    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      Ip = iface.address
      // console.log(ifname + ':' + alias, iface.address);
    } else {
      Ip = iface.address
      // this interface has only one ipv4 adress
      console.log(ifname, iface.address);
    }
    ++alias;
  });
});



app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});

app.use("/api/member", memberRouter);
app.use("/api/security", securityRouter)
app.get('/api/getIp', function (req, res, next) {
  res.send(Ip)
})

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});


const port = process.env.PORT || 4500;
app.listen(port, () => {
  console.log("server up and running on PORT :", port);
});
