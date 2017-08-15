$(function initializeMap (){

  var fullstackAcademy = new google.maps.LatLng(41.8884073, -87.6293817);

  var styleArr = [{
    featureType: 'landscape',
    stylers: [{ saturation: -100 }, { lightness: 60 }]
  }, {
    featureType: 'road.local',
    stylers: [{ saturation: -100 }, { lightness: 40 }, { visibility: 'on' }]
  }, {
    featureType: 'transit',
    stylers: [{ saturation: -100 }, { visibility: 'simplified' }]
  }, {
    featureType: 'administrative.province',
    stylers: [{ visibility: 'off' }]
  }, {
    featureType: 'water',
    stylers: [{ visibility: 'on' }, { lightness: 30 }]
  }, {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [{ color: '#ef8c25' }, { lightness: 40 }]
  }, {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ visibility: 'off' }]
  }, {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [{ color: '#b6c54c' }, { lightness: 40 }, { saturation: -40 }]
  }];

  var mapCanvas = document.getElementById('map-canvas');

  var currentMap = new google.maps.Map(mapCanvas, {
    center: fullstackAcademy,
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: styleArr
  });

  var iconURLs = {
    hotel: '/images/lodging_0star.png',
    restaurant: '/images/restaurant.png',
    activity: '/images/star-3.png'
  };

  function drawMarker (type, coords) {
    var latLng = new google.maps.LatLng(coords[0], coords[1]);
    var iconURL = iconURLs[type];
    var marker = new google.maps.Marker({
      icon: iconURL,
      position: latLng
    });
    marker.setMap(currentMap);
  }

    // drawMarker('hotel', [41.8884073, -87.6293817]);
    // drawMarker('restaurant', [41.9134555, -87.6503527]);
    // drawMarker('activity', [41.8675766, -87.6162267])
});

function GenerateItinerary () {
  this.hotels = [];
  this.restaurants = [];
  this.activities= [];
}

var day1 = new GenerateItinerary();

for (var i = 0; i < hotels.length; i++) {
    let hotelChoice = hotels[i].name;
    $("#hotel-choices").append(`<option value="${i}">${hotelChoice}</option>`);
}

for (var i = 0; i < restaurants.length; i++) {
    let restaurantChoice = restaurants[i].name;
    $("#restaurant-choices").append(`<option value="${i}">${restaurantChoice}</option>`);
}

for (var i = 0; i < activities.length; i++) {
    let activityChoice = activities[i].name;
    $("#activity-choices").append(`<option value="${i}">${activityChoice}</option>`);
}

$("#options-panel").on('click', 'button', function() {
  let index = $(this).prev().val();
  if($(this).prev().data("type") === 'hotel') {
    day1.hotels.push(hotels[index]);
    $("#hotel-itinerary .itinerary-item").append("<span class=\"title\">" + hotels[index].name + "</span>");
    $("#hotel-itinerary .itinerary-item").append("<button class=\"btn btn-xs btn-danger remove btn-circle\">x</button>");
  } else if($(this).prev().data("type") === 'restaurant') {
    day1.restaurants.push(restaurants[index]);
    $("#restaurant-itinerary .itinerary-item").append("<span class=\"title\">" + restaurants[index].name + "</span>");
    $("#restaurant-itinerary .itinerary-item").append("<button class=\"btn btn-xs btn-danger remove btn-circle\">x</button>");
  } else if($(this).prev().data("type") === 'activity') {
    day1.activities.push(activities[index]);
    $("#activity-itinerary .itinerary-item").append("<span class=\"title\">" + activities[index].name + "</span>");
    $("#activity-itinerary .itinerary-item").append("<button class=\"btn btn-xs btn-danger remove btn-circle\">x</button>");
  }
  console.log(day1);
});

