const https = require('https');

const headers = {
    'User-Agent': 'nodejs',
    Authorization: 'bearer ' + require('./oauth.json').access_token
};

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
    maxresults: 10,
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
            console.log('\n' + tweet.user.screen_name + ' : ' + tweet.text);
        })
    })
});
