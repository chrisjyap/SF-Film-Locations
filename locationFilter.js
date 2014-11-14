$(document).ready(function(){
	google.maps.event.addDomListener(window, 'load', initialize);

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
}
