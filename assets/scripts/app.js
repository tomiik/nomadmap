var sendUrlBase = "https://nomadlist.com/api/v2/list/cities"
//var sendUrlBase = "http://api.openweathermap.org/data/2.5/weather?q=hyderabad&APPID=0a72030de86532dc606cd9e539fc94bd"
var nObj = "empty";
var map;
var cityMap = {};
var circle_list = new google.maps.MVCArray();
var rect_list = new google.maps.MVCArray();

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 2
  });
}

$(document).ready(function(){
  console.log("ready");
  //write();
  //run();
  run();
  initMap();
});

function run(){

  $.ajax({
    url: sendUrlBase,
    crossDomain: true,
    dataType: 'json',
    type:"GET",
  }).done(function(data){
    console.log("ajax:data received");
    nObj = data.result;
    console.log(nObj);

    makeCityMap(nObj);

    //console.log(data);
  }).fail(function(data){
    console.log("ajax:error");
    //console.log(data);
  }).always(function(data){
    console.log("ajax:end");
  });
};

function makeCityMap(nObj){
  for(var i = 0; i < nObj.length; i++){
    e = nObj[i];
    cityName = e.info.city.name;
    countryName = e.info.country.name;
    location["latitude"] = e.info.location.latitude;
    location["longitude"] = e.info.location.longitude;
    image = e.media.image;
    people = e.people.checkins;
    coffee = e.cost.coffee_in_cafe.USD;
    beer = e.cost.beer_in_cafe.USD;
    drink = e.cost.non_alcoholic_drink_in_cafe.USD;
    airbnb = e.cost.airbnb_median.USD;
    coworking = e.cost.coworking.monthly.USD;
    hotel = e.cost.hotel.USD;
    nomad = e.cost.nomad.USD;
    safety = e.scores.safety;
    racism = e.scores.racism;
    internet = e.info.internet.speed.download;

    cityMap[cityName] = {
      "country": countryName,
      "center":{"lat": location["latitude"],
      "lng": location["longitude"]},
      "population":people,
      "coffee": coffee,
      "beer": beer,
      "drink": drink,
      "airbnb": airbnb,
      "hotel": hotel,
      "coworking": coworking,
      "hotel": hotel,
      "nomad": nomad,
      "safety": safety,
      "racism": racism,
      "internet": internet
    };
  }
}
