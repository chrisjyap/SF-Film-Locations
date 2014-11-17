var BASE_URL = "http://data.sfgov.org/resource/yitu-d5am.json?";


$(document).ready(function(){
	google.maps.event.addDomListener(window, 'load', initialize);

	$("filterVal").keypress(function(event) {
                if (event.which == 13)  onClickLookup();
        });
});

function initialize(){
	var mapCanvas = document.getElementById('map_canvas');
	var mapOptions= {
		center: new google.maps.LatLng(37.75161126, -122.4463385),
		zoom: 12,
		mapTypeId: google.maps.MapTypeId.ROADMAP
		//draggable: false,
		//zoomControl: false,  --interesting features to add later-- 
		//scrollwheel: false,
		//disableDoubleClickZoom: true
	}
	var map = new google.maps.Map(mapCanvas, mapOptions);
	
	var myLatLng = new google.maps.LatLng(37.75161126, -122.4463385); //"Justin Herman Plaza");
        var marker = new google.maps.Marker({
                position: myLatLng,
    		map: map,
		title: 'Testing!'
        });
}

function onClickLookup(){
	//TODO: add validation
	var filter = document.querySelector('input[name="filter"]:checked').value;
	var filterVal = (document.filterForm.filterVal.value).toLowerCase().replace(/ /g,'');
	console.log( buildURL(BASE_URL, filter, filterVal) );
	$.ajax( buildURL(BASE_URL, filter, filterVal) , {
		type: 'GET',
		//data: data,
		dataType:"json",
		success: function(data){
			console.log(JSON.stringify(data));
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
	var test= {
		girl: "Jung Eunji",
		guy: "Chris Yap"
	};
	console.log(locations);
	$.ajax( 'http://64.71.177.103:8001' , {
                type: 'GET',
                data: {locations:locations},
                dataType:"json",
                success: function(data){
                        console.log(JSON.stringify(data));
                },
                error: function(req, status, err){
                        console.log("Yeah, no. ", status, err);
                }
        });

}
