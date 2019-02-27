const https = require('http');

const headers = {
    'User-Agent': 'nodejs',
    Authorization: 'bearer ' + require('./oauth.json').access_token
};

let tweetQuery={};
let tweets=[];
let queryTweet;

function jsonHandler(response, callback){
    let json = '';
    response.setEncoding('utf8');
    if(response.statusCode ===200){
    response.on('data', function(chunk){
        json+=chunk;
    }).on('end', function(){
        callback(JSON.parse(json));
        });
    } else {
        console.log('Error: ' + response.statusCode);
    }
}


const trendOption = {
    host: 'api.twitter.com',
    path: '/1.1/trends/place.json?id=1',
    headers: headers
}

const tweetDetails = {
    maxresults: 2,
    resultType: 'recent',
    options: {
        host: 'api.twitter.com',
        headers: headers,
    }
}

function fullTweetPath(query){
    let path = '/1.1/search/tweets.json?q=' + query + '&count=' + tweetDetails.maxResult + '&include_entities=ture&result_type=' + tweetDetails.resultType;
    tweetDetails.options.path = path;
}

function callTwitter(options, callback){
    https.get(options, function(response){
        jsonHandler(response, callback);
    }).on('error', function(e) {
        console.log('Error : ' + e.message);
    });
}

callTwitter(trendOption, function(trendsArray){
    fullTweetPath(trendsArray[0].trends.query);
    callTwitter(tweetDetails.options, function(tweetObj){
        tweetObj.statuses.forEach(function(tweet){
         let twee={
            "status": `${tweet.text}`,
            "user": `${tweet.user.screen_name}`,
             "url": `https:\/\/twitter.com/${tweet.id_str}`
         }
            tweets.push(twee)
    queryTweet=tweets[0]
        })
    return queryTweet
    })
});

module.exports.asktwitter=function thistweet(){
        let queryTweet;
    callTwitter(trendOption, function(trendsArray){
        fullTweetPath(trendsArray[0].trends.query);
        callTwitter(tweetDetails.options, function(tweetObj){
            tweetObj.statuses.forEach(function(tweet){
             let twee={
                "status": `${tweet.text}`,
                "user": `${tweet.user.screen_name}`,
                 "url": `https:\/\/twitter.com/${tweet.id_str}`
             }
                tweets.push(twee)
            queryTweet=tweets[0]
            })
        return queryTweet
        })
    });
}


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
           "hi": queryTweet
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

setTimeout(whatsMyFortune, 100);
