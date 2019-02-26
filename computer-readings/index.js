const https = require('https'),
      oauthJsonFile = require('fs').createWriteStream('oauth.json'),
      SECRETS = require('./secrets.js');

const getAccess = {
    consumerKey: SECRETS.consumerKey,
    consumerSecretKey: SECRETS.consumerSecretKey
}

var request = https.request({
  method: 'POST',
  host: 'api.twitter.com',
  path: '/oauth2/token',
  headers: {
    'User-Agent': 'Coding Defined',
    Authorization: 'Basic ' + Buffer.from((encodeURIComponent(getAccess.consumerKey) + ':' + encodeURIComponent(getAccess.consumerSecretKey))).toString('base64'),
    'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'Content-length': 29
  }
});

request.end('grant_type=client_credentials');

request.on('response', function(response) {
  if(response.statusCode !== 200) {
    return console.log('Error ' + response.statusCode);
  }
  response.pipe(oauthJsonFile);
});
