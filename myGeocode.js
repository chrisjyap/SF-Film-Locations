var request = require('request');
var express = require('express');
var http = require('http');
var async = require('async');

var app = express();
var server = http.createServer(app);

const BASE_URL = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
const SECOND_URL = ',+San+Francisco,+CA&key=';
const API_KEY= 'AIzaSyAcKlim_q4phTwQ4cpNdDx7BxMxdVbUknA';


app.get('/', function(req, res){
	var test = {
		ugh: "Jung",
		whoo: "Eunji"
	};
	var locations = req.query.locations;
	somethingRequest(locations, res);
	console.log("HTTP GET");
});

app.get('*', function(req, res, next) {
  console.log("Here?");
  var err = new Error();
  err.status = 503;
  next(err);
});

server.listen(8001);
console.log('Express running on %s', server.address().port);


function buildURL(base, address, city, key){
	//console.log("URLS: " + base+address+city+ key);
	return base+ address + city+ key;
}

var __request = function (urls, callback) {
 
	'use strict';

	var results = {}, t = urls.length, c = 0,
		handler = function (error, response, body) {
 			body = JSON.parse(body);
			
			//if(body.results.length>0) results[response.request.href] = body.results[0]['formatted_address'];
			if(body.results.length>0) results[response.request.href] = body.results[0]['geometry']['location']['lat'] + ","+ body.results[0]['geometry']['location']['lng']; //{ error: error, response: response, body: body };
			else results[response.request.href] = '';
			
			if (++c === urls.length) { callback(results); }
		};

	while (t--) { request(urls[t], handler); }
};

function somethingRequest(locations, res){
	var urls = [];
        var responses=[];
        var completed_request = 0;
	
        for(var i = 0; i< locations.length; i++){
                locations[i] = locations[i].replace(/ /g,'+');
                urls.push( buildURL(BASE_URL, locations[i],SECOND_URL, API_KEY) );
        }
	//console.log(urls);
	__request(urls, function(response){
		var results={};
		for(var i = 0; i<urls.length; i++){
			//console.log("WORK: "+ response[urls[i]]);
			if(typeof(response[urls[i]]) != 'undefined') results[i] = response[urls[i]];
			else results[i] = '';	
		}
		console.log(results);
		//console.log(response);
                res.header('Access-Control-Allow-Origin', 'http://64.71.177.103');
                res.send(results);
      	});

}
