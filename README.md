Hello!

This is a simple Google map indicator of film locations in SF. The data is pulled from 
DataSF. One of the major issues for this project is that Google maps only took lat/long 
coords while DataSF gave rough street locations. To fix this, the client script makes an 
AJAX request to a nodejs script running in the background. The nodejs script uses Google's
Geocoding API to translate the DataSF locations in lat/long coords and returns it to the 
client side script. From there, the client side script creates markers with Infomation 
Windows on a Google map of SF!

It was simple, but fun to work with various APIs. Would love comment/feedback.
