var globalDrawMarker;
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
    return function () {
      marker.setMap(null);
    }
  }

  globalDrawMarker = drawMarker;
});

function GenerateItinerary () {
  this.hotels = [];
  this.restaurants = [];
  this.activities= [];
}

var dayItineraries = [new GenerateItinerary(), new GenerateItinerary(), new GenerateItinerary()];
var currentDay = 0;

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
  let itineraryDiv, drawMarker;
  if($(this).prev().data("type") === 'hotel') {
    itineraryDiv = $("#hotel-itinerary .itinerary-item")
    itineraryDiv.append("<span class=\"title\" data-id=" + index + " data-type=\"hotel\">" + hotels[index].name + "</span>");
    itineraryDiv.append("<button class=\"btn btn-xs btn-danger remove btn-circle\">x</button>");
    drawMarker = globalDrawMarker('hotel', hotels[index].place.location);
    dayItineraries[currentDay].hotels.push({hotel: hotels[index], marker: drawMarker});
  } else if($(this).prev().data("type") === 'restaurant') {
    itineraryDiv = $("#restaurant-itinerary .itinerary-item")
    itineraryDiv.append("<span class=\"title\" data-id=" + index+ " data-type=\"restaurant\">" + restaurants[index].name + "</span>");
    itineraryDiv.append("<button class=\"btn btn-xs btn-danger remove btn-circle\">x</button>");
    drawMarker = globalDrawMarker('restaurant', restaurants[index].place.location);
    dayItineraries[currentDay].restaurants.push({restaurant: restaurants[index], marker: drawMarker});
  } else if($(this).prev().data("type") === 'activity') {
    itineraryDiv =  $("#activity-itinerary .itinerary-item")
    itineraryDiv.append("<span class=\"title\" data-id=" + index+ " data-type=\"activity\">" + activities[index].name + "</span>");
    itineraryDiv.append("<button class=\"btn btn-xs btn-danger remove btn-circle\">x</button>");
    drawMarker = globalDrawMarker('activity', activities[index].place.location);
    dayItineraries[currentDay].activities.push({activity: activities[index], marker: drawMarker});
  }
  console.log(dayItineraries[currentDay]);
});

$("#itinerary").on('click', 'button', function() {
  let index = $(this).prev().data('id');
  let indexToRemove;
  if ($(this).prev().data('type') === 'hotel'){
    for(var i = 0; i < dayItineraries[currentDay].hotels.length; i++) {
      if(dayItineraries[currentDay].hotels[i].hotel.id === hotels[index].id) {
        indexToRemove = i;
        break;
      }
    }
    dayItineraries[currentDay].hotels[indexToRemove].marker();
    dayItineraries[currentDay].hotels.splice(indexToRemove, 1);
  } else if ($(this).prev().data('type') === 'restaurant'){
    for(var i = 0; i < dayItineraries[currentDay].restaurants.length; i++) {
      if(dayItineraries[currentDay].restaurants[i].restaurant.id === restaurants[index].id) {
        indexToRemove = i;
        break;
      }
    }
    dayItineraries[currentDay].restaurants[indexToRemove].marker();
    dayItineraries[currentDay].restaurants.splice(indexToRemove, 1);
  } else if ($(this).prev().data('type') === 'activity'){
    for(var i = 0; i < dayItineraries[currentDay].activities.length; i++) {
      if(dayItineraries[currentDay].activities[i].activity.id === activities[index].id) {
        indexToRemove = i;
        break;
      }
    }
    dayItineraries[currentDay].activities[indexToRemove].marker();
    dayItineraries[currentDay].activities.splice(indexToRemove,1)
  }
  $(this).prev().remove();
  $(this).remove();
  console.log(dayItineraries[currentDay]);
})

$('.day-buttons').on('click', '#day-add', function() {
  var nextDay = +$(this).prev().text() + 1;
  $(this).before("<button class=\"btn btn-circle day-btn\">" + nextDay + "</button>")
})

