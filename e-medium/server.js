const http = require('http'),
	https = require('https'),
	connect = require('connect'),
	httpProxy = require('http-proxy'),
	colors = require('colors'),
	express = require('express'),
	app = express(),
	socketServer = require('http').Server(app),
	fs = require('fs');


const PROXY_PORT = process.env.PORT || 8000;

app.use(express.static('public'));
let selects = [];
let simpleselect = {};

simpleselect.query = 'head';
simpleselect.func = function (node) {

	let peerStream = `

    		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	
				 `

	let rs = node.createReadStream();
	let ws = node.createWriteStream({ outer: false });
	rs.pipe(ws, { end: false });

	rs.on('end', function () {
		ws.end(peerStream);
	});
	//console.log(peerStream);
}

selects.push(simpleselect);

let server = connect();

let proxy = httpProxy.createProxyServer({
	target: 'https://www.foxnews.com',
	agent: https.globalAgent,
	headers: { host: 'www.foxnews.com' }
});

server.use(require('./')([], selects, true));

server.use((req, res) => {
	console.log('Serving up a hot proxy! 😘'.red);
	proxy.web(req, res);
});

console.log(`Proxy is up on ${PROXY_PORT}`.green);
http.createServer(server).listen(PROXY_PORT);

