// This example creates circles on the map, representing populations in North
// America.

// First, create an object containing LatLng and population for each city.
var citymap = {

    first_taco: {
        center: {lat: 34.052, lng: -118.273}
    },
    second_taco: {
        center: {lat: 34.092, lng: -118.273} //currently these are hard coded, they indicate where the red circle perimeter is
    }


};
var default_lat = 34.052;
var default_long = -118.212;
var markers_array = [default_lat,default_long];

//---------------------------------------------------
$(document).ready(function () {
    $('#qualityCarousel').swiperight(function () {
        $('#qualityCarousel').carousel('prev');

    });
    $('#qualityCarousel').swipeleft(function () {
        $('#qualityCarousel').carousel('next');
    });
    $('#cheapCarousel').swiperight(function () {
        $('#cheapCarousel').carousel('prev');
    });
    $('#cheapCarousel').swipeleft(function () {
        $('#cheapCarousel').carousel('next');
    });
    $('.left-arrow').on('click', function(){
        default_lat = 38.072;
        default_long = -118.217;
        initMap(default_lat, default_long);
    })
});
function preInitMap() {

    initMap(default_lat, default_long);

    function initMap(lat, long) {
        console.log("init map");
        // Create the map.
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 10,
            center: {lat: 34.090, lng: -118.212}

        });
        var marker = new google.maps.Marker({
            position: {lat: lat, lng: long},
            map: map,
            icon: "images/Taco_pin.png",
            animation: google.maps.Animation.BOUNCE
        });
        var marker2 = new google.maps.Marker({
            position: {lat: 34.092, lng: -118.273},
            map: map,
            icon: "images/nicetaco1.png",
            animation: google.maps.Animation.BOUNCE
        });
        markers_array.push(marker,marker2);
        console.log(markers_array);


        // Construct the circle for each value in citymap.
        // Note: We scale the area of the circle based on the population.
        for (var city in citymap) {
            // Add the circle for this city to the map.
            var cityCircle = new google.maps.Circle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                map: map,
                center: citymap[city].center,
                radius: 100
            });
        }
    }
}