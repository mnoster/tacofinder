/**
 * Created by njporter10 on 9/8/16.
 */
$(document).ready(function () {
    getUrlVars();
});
// Read a page's GET URL variables and return them as an associative array.
function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    get_all_data(vars);
    console.log("lat long obj: " ,vars);
}
var quality_lat = [];
var quality_long = [];
var price_lat = [];
var price_long = [];

function carousel (lat_by_rating,long_by_rating,lat_by_price,long_by_price,rating_array_final,price_array_final) {
    var quality_index = 1;
    var price_index=0;
    init_images();
function init_images(){
    //init quality taco info
    quality_lat = lat_by_rating[quality_index];
    quality_long = long_by_rating[quality_index];
    initMap(quality_lat, quality_long, price_lat, price_long);
    quality_index--;
    $('.qualityStore1').attr('src',rating_array_final[quality_index].photo_link).addClass('tacoPic');
    $('.qualityStoreName').html(rating_array_final[quality_index].name );
    $('.openCloseStatus').html("<div>" +rating_array_final[quality_index].status+"</div>" +"<div style='display: inline-block'><img src='images/nicetaco1.png'>&nbsp <span style='color:blue'>Quality</span></div>");
    if(quality_index<1){
        quality_index = 1;
    }
//    ----init cheap taco info
    price_lat = lat_by_price[price_index];
    price_long = long_by_price[price_index];
    initMap(quality_lat, quality_long, price_lat, price_long);
    $('.cheapStore').attr('src',price_array_final[price_index].photo_link).addClass('tacoPic');
    $('.cheapStoreName').html(price_array_final[price_index].name);
    $('.openCloseStatus2').html("<div>" +price_array_final[price_index].status+"</div>" + "<div style='display: inline-block'><img src='images/Taco_pin.png'>&nbsp <span style='color:red'>Cheap</span></div>");

    price_index--;
    if(price_index<0){
        price_index = 0;
    }
}


    $('#qualityCarousel').swiperight(function () {
        $('#qualityCarousel').carousel('prev');
        quality_lat = lat_by_rating[quality_index];
        quality_long = long_by_rating[quality_index];
        initMap(quality_lat, quality_long, price_lat, price_long);
        quality_index--;
        console.log("quality lat: " ,quality_lat);
        console.log("quality long: " ,quality_long);
        $('.qualityStore1').attr('src',rating_array_final[quality_index].photo_link).addClass('tacoPic');
        $('.qualityStoreName').html(rating_array_final[quality_index].name );
        $('.openCloseStatus').html("<div>" +rating_array_final[quality_index].status+"</div>" +"<div style='display: inline-block'><img src='images/nicetaco1.png'>&nbsp <span style='color:blue'>Quality</span></div>");
        if(quality_index<1){
            quality_index = 1;
        }

    });
    $('#qualityCarousel').swipeleft(function () {
        $('#qualityCarousel').carousel('next');
        quality_lat = lat_by_rating[quality_index];
        quality_long = long_by_rating[quality_index];
        initMap(quality_lat, quality_long, price_lat, price_long);
        $('.qualityStore1').attr('src',rating_array_final[quality_index].photo_link).addClass('tacoPic');
        $('.qualityStoreName').html(rating_array_final[quality_index].name);
        $('.openCloseStatus').html("<div>" +rating_array_final[quality_index].status+"</div>" + "<div style='display: inline-block'><img src='images/nicetaco1.png'>&nbsp <span style='color:blue'>Quality</span></div>");
        quality_index++;
        if(quality_index > lat_by_rating.length-1){
            quality_index = lat_by_rating.length-1;
        }

    });
    //--------this will disable the slide if the user tries to slide too many times to the left on the quality carousel
    $('#qualityCarousel').bind('slid.bs.carousel', function (e) {
        var $this = $(this);
        $this.children('.carousel-control').show();
        if ($('.carousel-inner .item:last').hasClass('active')) {
            $('#carousel-b').carousel('pause');
            $this.children('.right.carousel-control').hide();
        }
        else if ($('.carousel-inner .item:first').hasClass('active')) {
            $this.children('.left.carousel-control').hide();
        }
    });
    $('#cheapCarousel').swiperight(function () {
        $('#cheapCarousel').carousel('prev');
        price_lat = lat_by_price[price_index];
        price_long = long_by_price[price_index];
        initMap(quality_lat, quality_long, price_lat, price_long);
        $('.cheapStore').attr('src',price_array_final[price_index].photo_link).addClass('tacoPic');
        $('.cheapStoreName').html(price_array_final[price_index].name);
        $('.openCloseStatus2').html("<div>" +price_array_final[price_index].status+"</div>" + "<div style='display: inline-block'><img src='images/Taco_pin.png'>&nbsp <span style='color:red'>Cheap</span></div>");

        price_index--;
        if(price_index<0){
            price_index = 0;
        }
    });
    //--------------------------
    $('#cheapCarousel').swipeleft(function () {
        $('#cheapCarousel').carousel('next');
        price_lat = lat_by_price[price_index];
        price_long = long_by_price[price_index];
        initMap(quality_lat, quality_long, price_lat, price_long);
        $('.cheapStore').attr('src',price_array_final[price_index].photo_link).addClass('tacoPic');
        $('.cheapStoreName').html(price_array_final[price_index].name);
        $('.openCloseStatus2').html("<div>" + price_array_final[price_index].status+ "</div>" + "<div style='display: inline-block'><img src='images/Taco_pin.png'>&nbsp <span style='color:red'>Cheap</span></div>");

        price_index++;
        if(price_index > lat_by_rating.length-1){
            price_index = lat_by_price.length-1;
        }
    });
    //--------this will disable the slide if the user tries to slide too many times to the left on the quality carousel
    $('#cheapCarousel').bind('slid.bs.carousel', function (e) {
        var $this = $(this);
        $this.children('.carousel-control').show();
        if ($('.carousel-inner .item:last').hasClass('active')) {
            $('#carousel-b').carousel('pause');
            $this.children('.right.carousel-control').hide();
        }
        else if ($('.carousel-inner .item:first').hasClass('active')) {
            $this.children('.left.carousel-control').hide();
        }
    });
}


function get_all_data(location_obj){
    var query_text = 'tacos';
    var zip_code = $("#zipcode").val();
    var radius = 10000; //meters
    var lat_long = null;
    var list_item = {};
    var keys_not_found = [];
    var lat_by_rating = [];
    var long_by_rating = [];
    var lat_by_price = [];
    var long_by_price = [];
    var rating_array = [];
    var price_array = [];
    var num_of_results = 12;


    if(!location_obj){
        console.log('client denied location service');
        //----------this is the FIRST function to be called in get all data-----------------
        get_lat_long(zip_code);
    }else{
        lat_long = location_obj['lat'] + ',' + location_obj['long'];
        four_square_search(query_text, lat_long);
    }


    if(!zip_code){
        zip_code= 90014;
    }else{
        zip_code= $("#zipcode").val();
    }
    function get_lat_long(zip_code) {
        $.ajax({
            type: "GET",
            url: 'http://maps.googleapis.com/maps/api/geocode/json?address=' + zip_code,
            async: true,
            dataType: "json",
            success: function (result) {
                console.log('GET LAT LONG RESULT: ', result); //ajax result for debugging
                var lat = result.results[0].geometry.location.lat;
                var long = result.results[0].geometry.location.lng;
                lat_long = lat + ',' + long;
                console.log('lat_long: ', lat_long);
                four_square_search(query_text, lat_long);
            },
            error: function () { //unfinished error function
                console.log(result);
            }
        })
    }

//----------this is the SECOND function to be called in get all data-----------------
    function four_square_search(query_text, lat_long) {
        var url_start = 'https://api.foursquare.com/v2/venues/explore?query=';
        var client_id = 'X5QHEENJQETYKAW42K5DX4OQYUH4TSBCULEPY23TZIDE15K4';
        var client_secret = '0ILZVZF3OVML0IF50WN23QLVSJNFNL45QZDE0AKW0U4R0SCG';
        var url_end = '&limit='+ num_of_results+'&venuePhotos=1&openNow=1&sortByDistance=1&v=20160831';
        $.ajax({
            type: "GET",
            url: url_start + query_text + '&ll=' + lat_long + '&radius=' + radius + '&client_id=' + client_id + '&client_secret=' + client_secret + url_end,
            async: true,
            dataType: "json",
            success: function (result) {
                // console.log('four_square RESULT: ', result);

                for (i = 0; i < result.response.groups[0].items.length; i++) {
                    var item = result.response.groups[0].items[i];
                    var fsq_venue = item.venue;
                    list_item = {};
                    list_item.id = fsq_venue.id;
                    // var item_category_length = item.venue.categories.length;
                    list_item.category = fsq_venue.categories[0].name;
                    list_item.name = fsq_venue.name;
                    // console.log('VENUE NAME: ', list_item.name);
                    list_item.phone = fsq_venue.contact.phone;
                    list_item.address_st = fsq_venue.location.formattedAddress[0];
                    list_item.address_city_state = fsq_venue.location.formattedAddress[1];
                    list_item.lat = fsq_venue.location.lat;
                    list_item.long = fsq_venue.location.lng;
                    list_item.distance = fsq_venue.location.distance;

                    if (fsq_venue.hasOwnProperty('featuredPhotos')) {
                        // var feat_photo_length = item.venue.featuredPhotos.items.length;
                        var feat_photo_prefix = fsq_venue.featuredPhotos.items[0].prefix;
                        var feat_photo_suffix = fsq_venue.featuredPhotos.items[0].suffix;
                        // var feat_photo_width = item.venue.featuredPhotos.items[0].width;
                        var feat_photo_width = 300; //can specify any width (in pixels) but is required to form working link to photo
                        list_item.photo_link = feat_photo_prefix + 'width' + feat_photo_width + feat_photo_suffix;
                       // $('<img>').attr({src: list_item.photo_link}).appendTo('body');
                    }

                    // var four_square_keys = ['rating', 'price', 'hours', 'test', 'test2'];
                    var four_square_keys = ['rating', 'price', 'hours'];
                    for (var key in four_square_keys) {
                        var key_name = four_square_keys[key];
                        if (fsq_venue.hasOwnProperty(key_name)) {
                            if (Object.keys(fsq_venue[key_name]).length > 0) {
                                var obj_key = Object.keys(fsq_venue[key_name]);
                                // console.log('obj_key: ', obj_key);
                                var obj_keys_qty = Object.keys(fsq_venue[key_name]).length;
                                for (a = 0; a < obj_keys_qty; a++) {
                                    var obj_key_i = obj_key[a];
                                    // console.log('obj_key_i: ', obj_key_i);
                                    list_item[obj_key_i] = fsq_venue[key_name][obj_key_i];
                                }
                            } else {
                                list_item[key_name] = fsq_venue[key_name];
                            }
                        } else {
                            keys_not_found.push(key_name);
                        }
                    }
                    // console.log('keys not found: ', keys_not_found);

                    if (keys_not_found.length > 0) {
                        // googlePlacePhone(list_item.phone, list_item.lat, list_item.long);
//                             googlePlaceId('ChIJPZ98hv_n3IARNlUsKN348nU');
                    }

                    // console.log('LIST ITEM: ', list_item);
                    // console.log('*****************************************************');

                    // eliminates duplicate based on name
                    if (rating_array.length > 1) {
                        function findName(venue) {
                            return venue.name === list_item.name;
                        }

                        // console.log('FIND RESULT: ', rating_array.find(findName));
                        if (rating_array.find(findName) === undefined) {
                            console.log('ok to push');
                            rating_array.push(list_item);
                            price_array.push(list_item);
                        } else {
                            console.log('dont push ' + list_item.name);
                        }
                    } else {
                        rating_array.push(list_item);
                        price_array.push(list_item);
                    }
                    // rating_array.push(list_item);
                    // price_array.push(list_item);
                }
                // sortArrays();
                sorting();
            },
            error: function () { //unfinished error function
                console.log(result);
            }
        })
    }

    function sorting() {
        function object_sort_low_to_high(array, sort_by_key) {
            var swapped = true;
            var temp = null;
            while (swapped) {
                swapped = false;
                for (var i = 0; i < array.length - 1; i++) {
                    var firstnum = array[i];
                    var secnum = array[i + 1];
                    if (firstnum[sort_by_key] > secnum[sort_by_key]) {
                        temp = firstnum;
                        array[i] = array[i + 1];
                        array[i + 1] = temp;
                        swapped = true;
                    }
                }
            }
            return array;
        }

        function object_sort_high_to_low(array, sort_by_key) {
            var swapped = true;
            var temp = null;
            while (swapped) {
                swapped = false;
                for (var i = 0; i < array.length - 1; i++) {
                    var firstnum = array[i];
                    var secnum = array[i + 1];
                    if (firstnum[sort_by_key] < secnum[sort_by_key]) {
                        temp = firstnum;
                        array[i] = array[i + 1];
                        array[i + 1] = temp;
                        swapped = true;
                    }
                }
            }
            return array;
        }

        var price_array_sorted_by_rating1 = object_sort_high_to_low(price_array, 'rating');
        var price_array_sorted_by_distance1 = object_sort_low_to_high(price_array_sorted_by_rating1, 'distance'); //price array already sorted by rating, now sorted by distance
        // var price_array_sorted_by_tier1 = object_sort_low_to_high(price_array_sorted_by_distance1, 'tier'); //price array already sorted by rating, then distance, now sorted by tier
        var price_array_final = object_sort_low_to_high(price_array_sorted_by_distance1, 'tier'); //price array already sorted by rating, then distance, now sorted by tier

        var rating_array_sorted_by_tier2 = object_sort_low_to_high(rating_array, 'tier');
        var rating_array_sorted_by_distance2 = object_sort_low_to_high(rating_array_sorted_by_tier2, 'distance');
        // var rating_array_sorted_by_rating2 = object_sort_high_to_low(rating_array_sorted_by_distance2, 'rating');
        var rating_array_final = object_sort_high_to_low(rating_array_sorted_by_distance2, 'rating');
        create_map_coordinates(price_array_final,rating_array_final);

    }


    function create_map_coordinates(price_array_final,rating_array_final){
        console.log("rating array length: " , rating_array_final.length, price_array_final.length);
        for(var i = 0; i < num_of_results+1;i++){
            if(!rating_array_final[i]){
                break;
            }
            lat_by_rating.push(rating_array_final[i].lat);
            // console.log('rating array final: ',rating_array_final[i].lat, i );
            long_by_rating.push(rating_array_final[i].long);
            lat_by_price.push(price_array_final[i].lat);
            // console.log('rating array final: ',price_array_final[i].lat, i );

            long_by_price.push(price_array_final[i].long)
        }
        carousel(lat_by_rating,long_by_rating,lat_by_price,long_by_price,rating_array_final,price_array_final);
        quality_lat = lat_by_rating[0];
        quality_long = long_by_rating[0];
        price_lat = lat_by_price[0];
        price_long = long_by_price[0];
        initMap(quality_lat, quality_long, price_lat, price_long);

    }


//        function sortArrays() {
//            //sort by rating; if rating is same then sort by cheapest first
//            rating_array.sort(function (a, b) {
//                if (a.rating === b.rating) {
//                    return a.tier - b.tier;
//                }
//                return b.rating - a.rating;
//            });
//
//            //sort by price; if price is same then sort by highest rating first
//            price_array.sort(function (a, b) {
//                if (a.tier === b.tier) {
//                    return b.rating - a.rating;
//                }
//                return a.tier - b.tier;
//            });
//        }

    //returns one place searches by phone number and lat/long
    function googlePlacePhone(phone, lat, long) {
        //takes in a phone and lat lon coordiantes
        // var phoneData = {mode: "phoneSearch", phone: 9494724468, lat: 33.665242, lon:-117.7490656};
        var phoneData = {mode: "phoneSearch", phone: phone, lat: lat, lon: long};
        $.ajax({
            url: 'http://nealcloud.com/yelpaco/api/place_api.php',
            data: phoneData,
            method: 'post',
            dataType: 'json',
            success: function (data) {
                if (data.query.place.results[0].hasOwnProperty('place_id')) {
                    var google_place_id = data.query.place.results[0].place_id;
                    console.log('PHONE SEARCH - PLACE ID: ', google_place_id);
                    googlePlaceId(google_place_id);
                }
            }
        })
    }

    //future calls can add the property apiKey to override mine
    //returns one place by business id
    function googlePlaceId(place_id) {
        // var idData = {mode: "placeIdSearch", id: "ChIJHU1kl5s2w4ARwGSmC0EH61Y"};
        var idData = {mode: "placeIdSearch", id: place_id};
        $.ajax({
            url: 'http://nealcloud.com/yelpaco/api/place_api.php',
            data: idData,
            method: 'post',
            dataType: 'json',
            success: function (data) {
                console.log('google place id: ', data);
                console.log('keys not found: ', keys_not_found);
                for (var key in keys_not_found) {
                    switch (keys_not_found[key]) {
                        case 'rating':
                            console.log('case rating');
                            list_item.rating = data.query.place.result.rating;
                            break;
                        case 'price':
                            console.log('case price');
                            list_item.tier = data.query.place.result.price_level;
                            break;
                        case 'hours':
                            console.log('case hours');
                            list_item.isOpen = data.query.place.result.opening_hours.open_now;
                            var d = new Date();
                            var n = d.getDay();
                            console.log('today\'s day of week: ' + n);
                            var closing_time = data.query.place.result.opening_hours.periods[n].close.time;
                            list_item.status = 'Open until ' + getFormattedTime(closing_time);
                            break;
                        case 'test':
                            console.log('test');
                            list_item.test = 'test';
                            break;
                        case 'test2':
                            console.log('test2');
                            list_item.test2 = 'test2';
                    }
                }
            }
        })
    }

    //returns a list of places by radius and lat and long
    function googlePlaceRadius() {
        // takes in radius in meters , lat lon coordinates, and search keyword defaults to taco
        var radiusData = {mode: "radiusSearch", radius: 10000, lat: 33.665242, lon: -117.7490656, keyword: 'taco'};
        $.ajax({
            url: 'http://nealcloud.com/yelpaco/api/place_api.php',
            data: radiusData,
            method: 'post',
            dataType: 'json',
            success: function (data) {
                console.log(data);
            }
        })
    }

    function google_places_search(phone, lat_long) {
        $.ajax({
            url: 'http://nealcloud.com/yelpaco/api/place_id_api.php',
            data: {id: "ChIJHU1kl5s2w4ARwGSmC0EH61Y"},
            method: 'post',
            dataType: 'json',
            success: function (data) {
                console.log(data.place.result.name);
                console.log(data.place.result.opening_hours);
            },
            error: function () { //unfinished error function
                console.log(result);
            }
        })
    }

    function getFormattedTime(fourDigitTime) {
        var hours24 = parseInt(fourDigitTime.substring(0, 2));
        var hours = ((hours24 + 11) % 12) + 1;
        var amPm = hours24 > 11 ? 'PM' : 'Am';
        var minutes = fourDigitTime.substring(2);
        return hours + ':' + minutes + ' ' + amPm;
    }
}
//--------------------------------------------------------------------------------

// initMap(default_lat, default_long);

function initMap(quality_lat,quality_long,price_lat,price_long) {
    var citymap = {

        first_taco: {
            center: {lat: quality_lat, lng: quality_long}
        },
        second_taco: {
            center: {lat: price_lat, lng: price_long} //currently these are hard coded, they indicate where the red circle perimeter is
        }


    };
    console.log("init map");
    // Create the map.
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11,
        center: {lat: quality_lat, lng: quality_long}

    });
    var marker = new google.maps.Marker({
        position: {lat: quality_lat, lng: quality_long},
        map: map,
        icon: "images/Taco_pin.png",
        animation: google.maps.Animation.BOUNCE
    });
    var marker2 = new google.maps.Marker({
        position: {lat: price_lat, lng: price_long},
        map: map,
        icon: "images/nicetaco1.png",
        animation: google.maps.Animation.BOUNCE
    });
    // function drop() {
    //     for (var i =0; i < markerArray.length; i++) {
    //         setTimeout(function() {
    //             addMarkerMethod();
    //         }, i * 300);
    //     }
    // }

    // Construct the circle for each value in citymap.
    // Note: We scale the area of the circle based on the population.
    for (var city in citymap) {
        // Add the circle for this city to the map.
        var cityCircle = new google.maps.Circle({
            strokeColor: '#FF0000 ',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000 ',
            fillOpacity: 0.35,
            map: map,
            center: citymap[city].center,
            radius: 100
        });
    }

}
// checks the zip input for numbers only
function validate(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode( key );
    var regex = /[0-9]|\./;
    if( !regex.test(key) ) {
        theEvent.returnValue = false;
        if(theEvent.preventDefault) theEvent.preventDefault();
    }
}