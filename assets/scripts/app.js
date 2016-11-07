var sendUrlBase = "https://nomadlist.com/api/v2/list/cities"
//var sendUrlBase = "http://api.openweathermap.org/data/2.5/weather?q=hyderabad&APPID=0a72030de86532dc606cd9e539fc94bd"
var nObj = "empty";
var map;
var cityMap = {};
var circle_list = new google.maps.MVCArray();
var rect_list = new google.maps.MVCArray();
var myLocation = {};

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: myLocation,
    zoom: 4
  });
}

$(document).ready(function(){
  console.log("ready");
  //write();
  //run();
  Util.loading("retrieving location from ipinfo.io");
  getLocation();
});

function getLocation(){
  if(navigator.geolocation){
   navigator.geolocation.getCurrentPosition(getLocationSuccessCallback, getLocationErrorCallback);
  }else{
    getLocationErrorCallback();
  }
}

function getLocationSuccessCallback(position){
  myLocation["lat"] = position.coords.latitude;
  myLocation["lng"] = position.coords.longitude;
  initMap();
  getNomadList();
}

function getLocationErrorCallback(){
  console.log("ajax-ip:start");
  $.ajax({
    url: "https://ipinfo.io/json",
    crossDomain: true,
    dataType: 'json',
    type: "GET",
  }).done(function(data){
    console.log("ajax-ip:data received");

    var location = data.loc.split(",");
    myLocation["lat"] = parseInt(location[0]);
    myLocation["lng"] = parseInt(location[1]);
    console.log(myLocation);
    initMap();
    getNomadList();

  }).fail(function(data){
    console.log("ajax-ip:error");
    //console.log(data);
  }).always(function(data){
    console.log("ajax-ip:end");
  });
}

function getNomadList()
{
  console.log("ajax-nomadlist:start");
  Util.loading("retrieving nomad data from nomadlist.com");
  $.ajax({
    url: sendUrlBase,
    crossDomain: true,
    dataType: 'json',
    type:"GET",
  }).done(function(data){
    console.log("ajax-nomadlist:data received");
    nObj = data.result;
    //console.log(nObj);
    makeCityMap(nObj);
    Buttons.selector_clicked($("#population"));
    Util.loaded();
    //console.log(data);
  }).fail(function(data){
    console.log("ajax-nomadlist:error");
    //console.log(data);
  }).always(function(data){
    console.log("ajax-nomadlist:end");
  });
}

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
$(".selector").click(function(){
  Buttons.selector_clicked(this);
});
