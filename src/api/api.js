
var request = require('request');

export function get (url){
    return new Promise(function(resolve, reject){
        request({
          method: 'GET',
          url: url,
          json: true,
          headers: {
            'User-Agent': 'request'
          }
        }, function(err, resp, body){
          if(err){
            reject(err);
        } else {
            resolve(body);
          }
        });
    });
}
export function post (url,body){
    return new Promise(function(resolve, reject){
        request({
          method: 'POST',
          url: url,
          json: true,
          headers: {
            'User-Agent': 'request'
        },
        body: body,
        }, function(err, resp, body){
          if(err){
            reject(err);
        } else {
            resolve(body);
          }
        });
    });
}
