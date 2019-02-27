const https = require('https');

const tweet = require('./trends');

function callback(response){
    let result = '';

    response.on('data', function(data){
        result+=data;
    })
    response.on('end', function(){
        console.log(result);
    });
}

function whatsMyFortune(){
    let payload = JSON.stringify(
        {
           "hi": 1
        }
    )
   let options={
       host: 'localhost',
       port: 8000,
       path: '/tarot',
       method: 'POST',
       headers: {
           'User-Agent': 'nodejs',
           'Content-type': 'text',
           'Content-Length': payload.length
       }
   };
    let request = https.request(options, callback);
    request.write(payload);
    request.end();
}

console.log(tweet.asktwitter())
//setTimeout(whatsMyFortune, 100);
