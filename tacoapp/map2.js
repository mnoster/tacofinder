var citymap2 = {

    losangeles: {
        center: {lat: 34.052, lng: -118.243}
    }
};

function initMap2() {
    // Create the map.
    var map2 = new google.maps.Map(document.getElementById('map2'), {
        zoom: 10,
        center: {lat: 35.090, lng: -118.212}

    });
    var marker2 = new google.maps.Marker({
        position: {lat: 35.052, lng: -118.243},
        map: map2,
        title: 'Hello World!',
        icon: "images/Taco_pin.png",
        animation: google.maps.Animation.BOUNCE
    });

    // Construct the circle for each value in citymap.
    // Note: We scale the area of the circle based on the population.
    for (var city in citymap2) {
        // Add the circle for this city to the map.
        var cityCircle2 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: map2,
            center: citymap2[city].center,
            radius: 100
        });
    }
}
