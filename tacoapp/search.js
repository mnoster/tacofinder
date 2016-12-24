// https://api.foursquare.com/v2/venues/explore?query=tacos &ll=33.665242,-117.7490656 &openNow=1&sortByDistance=1&client_id=X5QHEENJQETYKAW42K5DX4OQYUH4TSBCULEPY23TZIDE15K4 &client_secret=0ILZVZF3OVML0IF50WN23QLVSJNFNL45QZDE0AKW0U4R0SCG &v=20160831

var query_text = 'tacos';
var zip_code = '92618';
// var lat_long = null;   <<< will be null once live
var lat_long = 'll=33.665242,-117.7490656';

function four_square_search(query_text, lat_long) {
    var url_start = 'https://api.foursquare.com/v2/venues/explore?query=';
    var client_id = 'X5QHEENJQETYKAW42K5DX4OQYUH4TSBCULEPY23TZIDE15K4';
    var client_secret = '0ILZVZF3OVML0IF50WN23QLVSJNFNL45QZDE0AKW0U4R0SCG';
    $.ajax({
        type: "GET",
        url: url_start + query_text + '&ll=' + lat_long + 'client_id=' + client_id + '&client_secret=' + client_secret + '&radius=10000&openNow=1&sortByDistance=1&v=20160831',
        async: true,
        dataType: "json",
        success: function (result) {
            console.log(result);
        },
        error: function () { //unfinished error function
            console.log(result);
        }
    })
}

// zip_code is zip code field that appears if no geolocation data available
function get_lat_long(zip_code) {
    $.ajax({
        type: "GET",
        url: 'http://maps.googleapis.com/maps/api/geocode/json?address=' + zip_code,
        async: true,
        dataType: "json",
        success: function (result) {
            console.log(result); //ajax result for debugging
            var lat = result.results[0].geometry.location.lat;
            var long = result.results[0].geometry.location.lng;
            lat_long = lat + ',' + long;
            console.log('lat_long: ',lat_long);
        },
        error: function () { //unfinished error function
            console.log(result);
        }
    })
}

get_lat_long(zip_code);
four_square_search(query_text,lat_long);