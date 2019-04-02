const http = require('http'),
	https = require('https'),
	connect = require('connect'),
	httpProxy = require('http-proxy'),
	colors = require('colors'),
	express = require('express'),
	app = express(),
	socketServer = require('http').Server(app),
	fs = require('fs')
    dtrump = require('./donald_j_trump_quotes');

const PROXY_PORT = process.env.PORT || 8000;

app.use(express.static('public'));
let selects = [];
let simpleselect = {};

simpleselect.query = 'body';
simpleselect.func = function (node) {

	let peerStream = `
    <style>
        .secretMsg:first-letter {
            font-size: 24px!important;
            color: red!important;
            font-weight: 900;
        }
    </style>
    		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
            <script type="text/javascript" >
var djt=        {
    "description" : "Quotes from Donald J. Trump",
    "quotes"      : [
        "I have a great relationship with the blacks.",
        "I will build a great wall, and nobody builds walls better than me, believe me, and I'll build them very inexpensively. I will build a great, great wall on our southern border, and I will make Mexico pay for that wall. Mark my words.",
        "The beauty of me is that I'm very rich.",
        "It's freezing and snowing in New York. We need global warming!",
        "Our country is in serious trouble. We don't have any victories anymore. We used to have victories, but we don't have them. When was the last time anybody saw us beating, let's say China, in a trade deal? I beat China all the time. All the time.",
        "I just start kissing them. It’s like a magnet. Just kiss. I don’t even wait. And when you’re a star, they let you do it. You can do anything. Grab them by the pussy. You can do anything.",
        "I've said if Ivanka weren't my daughter, perhaps I'd be dating her.",
        "We have a 5 billion dollar website. I have so many websites. I have them all over the place. I hire people. it costs me three dollars.",
        "All of the women on The Apprentice flirted with me, consciously or unconsciously. That's to be expected.",
        "My Twitter has become so powerful that I can actually make my enemies tell the truth.",
        "Before a show, I'll go backstage and everyone's getting dressed, and everything else, and you know, no men are anywhere, and I'm allowed to go in because I'm the owner of the pageant and therefore I'm inspecting it. You know, they're standing there with no clothes. And you see these incredible looking women, and so, I sort of get away with things like that.",
        "They had a person who was extremely proud that a number of the women had become doctors. And I wasn't interested.",
        "I will be the greatest jobs president that God ever created.",
        "I'm their worst nightmare.",
        "Ariana Huffington is unattractive both inside and out. I fully understand why her former husband left her for a man, he made a good decision.",
        "When Mexico sends its people, they're not sending the best. They're not sending you, they're sending people that have lots of problems and they're bringing those problems. They're bringing drugs, they're bringing crime. They're rapists and some, I assume, are good people, but I speak to border guards and they're telling us what we're getting.",
        "My fingers are long and beautiful, as, it has been well documented, are various other parts of my body.",
        "I take advantage of the laws of the nation. Because I'm running a company.",
        "I did try and fuck her. I moved on her like a bitch, but I couldn’t get there. And she was married.",
        "I have never seen a thin person drinking Diet Coke.",
        "Our great African-American President hasn't exactly had a positive impact on the thugs who are so happily and openly destroying Baltimore!",
        "I think the only difference between me and the other candidates is that I'm more honest and my women are more beautiful.",
        "I'm proud of my net worth; I've done an amazing job. The total is $8,737,540,000 USD. I'm not doing that to brag, because you know what, I don't have to brag.",
        "What is it at 35? It's called check-out time.",
        "No, I have no age — I mean, I have age limit. I don't want to be like Congressman Foley, with, you know, 12-year-olds.",
        "That may be the best idea of all. I would say I'm the all-time judge, don't forget, I own the Miss Universe pageant.",
        "I know nothing about the inter workings of Russia.",
        "That makes me smart."
    ]

}
let ranQuote;
ranQuote = djt.quotes[Math.floor(Math.random() * djt.quotes.length)];

const splitAt = index => x => [x.slice(0, index), x.slice(index)];

splitQuote = ranQuote.split("");


setTimeout(10000,$("h2.title").each(function() { // <-- Run over each li
//for(let i = 0; i<splitQuote.length; i++){

  
  var s = $(this).find("a").html().charAt(0).toLowerCase(); // <-- takes the first character of link
     	if(s===splitQuote[i].toLowerCase()){
			  $(this).addClass("secretMsg") // <-- Add the character as a class to the li

    }

//}
}))
            </script>

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

app.use('/quotes', (req, res)=>{
    res.send(dtrump);
});

console.log(`Proxy is up on ${PROXY_PORT}`.green);
http.createServer(server).listen(PROXY_PORT);

