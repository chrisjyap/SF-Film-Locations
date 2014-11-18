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
	//res.header('Access-Control-Allow-Origin', 'http://64.71.177.103');
	//res.send(test);
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
			console.log(c + ": " + JSON.stringify(body.results)); 
			results[body.results["formatted_address"]] = body; //{ error: error, response: response, body: body };
			if (++c === urls.length) { callback(results); }
		};

	while (t--) { request(urls[t], handler); }
};

function somethingRequest(locations, res){
	var urls = [];
        var responses=[];
        var completed_request = 0;
	console.log("Break yet?");
        for(var i = 0; i< locations.length; i++){
                locations[i] = locations[i].replace(/ /g,'+');
                urls.push( buildURL(BASE_URL, locations[i],SECOND_URL, API_KEY) );
                http.get(url, function(response) {
                    //responses.push(response.body);
	           console.log("EHORALWJRKLAWJAWKL:RKLJ:AWJKLTJL:AKWT");
                   completed_request++;
                    if (completed_request == locations.length) {
                          // All download done, process responses array
                         console.log(responses);
			//res.header('Access-Control-Allow-Origin', 'http://64.71.177.103');
                	//res.send(responses);	 
                    }
                });
        }

}
