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
	var urls = [];
	for(var i = 0; i< locations.length; i++){
                locations[i] = locations[i].replace(/ /g,'+');
		urls.push( buildURL(BASE_URL, locations[i],SECOND_URL, API_KEY) );
	}
	//console.log(urls);
	console.log("HTTP GET");
	res.header('Access-Control-Allow-Origin', 'http://64.71.177.103');
	res.send(test);
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
	console.log("URLS: " + base+address+city+key);
	return base+ address + city+ key;
}
