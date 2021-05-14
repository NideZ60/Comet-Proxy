var url = require('url');
var querystring = require('querystring');
var Unblocker = require('unblocker');
var Transform = require('stream').Transform;
var express = require('express')
var app = express();
function XFrameSameOrigin(data) {
  data.headers['x-frame-options'] = 'allow';
}
var unblocker = new Unblocker({
    prefix: '/proxy',
      responseMiddleware: [
    XFrameSameOrigin,
  ]
});

var unblocker2 = new Unblocker({
    prefix: '/proxychain',
      responseMiddleware: [
    XFrameSameOrigin,
  ]
});

var unblocker3 = new Unblocker({
    prefix: '/superchain',
      responseMiddleware: [
    XFrameSameOrigin,
  ]
});


// ...
app.use(unblocker);

app.use('/', express.static(__dirname + '/public'));

const port = process.env.PORT || process.env.VCAP_APP_PORT || 443;

app.get('index.html', function(req, res) {
    //...
});

app.use(unblocker2);

app.use('/', express.static(__dirname + '/public'));

const port2 = process.env.PORT || process.env.VCAP_APP_PORT || 8080;

app.get('index.html', function(req, res) {
    //...
});

app.use(unblocker3);

app.use('/', express.static(__dirname + '/public'));

const port3 = process.env.PORT || process.env.VCAP_APP_PORT || 8443;

app.get('index.html', function(req, res) {
    //...
});

app.listen(port, function() {
    console.log(`Comet Proxy process listening`);
}).on("upgrade", unblocker.onUpgrade); 

app.listen(port2, function() {
    console.log(`Comet Proxy process listening port 2`);
}).on("upgrade", unblocker2.onUpgrade); 

app.listen(port3, function() {
    console.log(`Comet Proxy process listening port 3`);
}).on("upgrade", unblocker2.onUpgrade); 
