const BASE_URL = "http://data.sfgov.org/resource/yitu-d5am.json?";

$(document).ready(function(){
	google.maps.event.addDomListener(window, 'load', initialize);

	$("input").keypress(function(event) {
                if (event.which == 13)  onClickLookup();
        });
});

function initialize(){
	var mapCanvas = document.getElementById('map_canvas');
	var mapOptions= {
		center: new google.maps.LatLng(37.76161126, -122.4263385),
		zoom: 12,
		mapTypeId: google.maps.MapTypeId.ROADMAP
		//draggable: false,
		//zoomControl: false,  --interesting features to add later-- 
		//scrollwheel: false,
		//disableDoubleClickZoom: true
	}
	var map = new google.maps.Map(mapCanvas, mapOptions);
	var myLatLng = new google.maps.LatLng(37.75161126, -122.4463385); //"Justin Herman Plaza");
        var marker=  new google.maps.Marker({
                position: myLatLng,
    		map: map,
		title: 'Testing!'
        });
}

function onClickLookup(){
	//TODO: add validation
	document.getElementById("body").style.cursor= "progress";
	var filter = document.querySelector('input[name="filter"]:checked').value;
	var filterVal = (document.filterForm.filterVal.value).toLowerCase(); //.replace(/ /g,'');
	//console.log( buildURL(BASE_URL, filter, filterVal) );
	$.ajax( buildURL(BASE_URL, filter, filterVal) , {
		type: 'GET',
		dataType:"json",
		success: function(data){
	 	       if(data.length >0) getLocations(data);
		},	
		error: function(req, status, err){
		       console.log("Yeah, no. ", status, err);
		}
	});

}

function buildURL(baseURL, filter, filterVal){
	return baseURL + filter + "=" + filterVal;
}

function getLocations(data){
	var locations = [];
	for(var i = 0; i<data.length; i++){
		locations.push(data[i].locations);
	}
	//console.log(locations);

	$.ajax( 'http://64.71.177.103:8001' , {
                type: 'GET',
                data: {locations:locations},
                dataType:"json",
                success: function(response){
                        //console.log(JSON.stringify(response));
		        document.getElementById("body").style.cursor= "default";
			makeMarkers(data, response);
                },
                error: function(req, status, err){
		        document.getElementById("body").style.cursor= "default";
                        console.log("Yeah, no. ", status, err);
                }
        });

}

function makeMarkers(data, response){
	var length = data.length;
	var lat = [];
	var long= [];
	console.log(JSON.stringify(data));
// Pushes reponse to lat and long arrays
	for(var i = 0; i<length; i++){
		if(typeof(response[i]) != 'undefined'){
			var coords = response[i].split(",");
			lat.push( parseFloat(coords[0]));
			long.push(parseFloat(coords[1]));
		}
		else{
			lat.push(NaN);
			long.push(NaN);
		}
	}
// Clear make of previous markers	
	var mapCanvas = document.getElementById('map_canvas');
        mapCanvas.innerHTML = "";
        //mapCanvas= null;
	var mapOptions= {
                center: new google.maps.LatLng(37.76161126, -122.4263385),
                zoom: 12,
                mapTypeId: google.maps.MapTypeId.ROADMAP
        }
	var map = new google.maps.Map(mapCanvas, mapOptions);
	
// Markers
	var infowindow = new google.maps.InfoWindow({ maxWidth:300 });
	var j, info, marker, movieInfo;
	
	for(j = 0; j< length; j++){
		if(typeof(lat[j]) == 'number' && typeof(long[j]) == 'number'){
			movieInfo = getMovieInfo(data, j);
	                info = '<div id=\"infoWin\">'+ movieInfo+ '<br>-Eunji</div>';
                	var marker = new google.maps.Marker({
			         position: new google.maps.LatLng(lat[j], long[j]),
         			 map: map,
				 title: 'Eunji!'
    			});
			
 			bindInfoWindow(marker, map, infowindow, info);
		}
	}
}

function getMovieInfo(data, j){
	var info = '<b>Movie: </b>' + data[j].title + 
		'<br><b>Director: </b>' + data[j].director + 
		'<br><b>Released: </b>' + data[j].release_year + 
		'<br><b>Location: </b>' + data[j].locations + 
		'<br><b>Starring: </b><br>' + '<ul><li>';
	if(typeof(data[j].actor_1) != 'undefined'){
		if(typeof(data[j].actor_2) == 'undefined' && typeof(data[j].actor_3) != 'undefined') info += data[j].actor_1 + '</li><li>' + data[j].actor_3 + '</li></ul>';
 		else if(typeof(data[j].actor_3) != 'undefined') info+= data[j].actor_1 +'</li><li>' + data[j].actor_2 +'</li><li>' + data[j].actor_3 + '</li></ul>';
		else info += data[j].actor_1 + '</li></ul>';
	}
	else{
		info+= 'None Listed</li></ul>';
	}
	return info;
}

function bindInfoWindow(marker, map, infowindow, info){
	google.maps.event.addListener(marker, 'click', function() {
       		infowindow.setContent(info);
       		infowindow.open(map, marker);
    	});
}
