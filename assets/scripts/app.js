var sendUrlBase = "https://nomadlist.com/api/v2/list/cities"
//var sendUrlBase = "http://api.openweathermap.org/data/2.5/weather?q=hyderabad&APPID=0a72030de86532dc606cd9e539fc94bd"
var nObj = "empty";
var map;
var cityMap = {};

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

    var cityName = "";
    var countryName = "";
    var location = {};
    var image = [];
    var people = 0;
    // for(var i = 0; i < nObj.length; i++){
    //   e = nObj[i];
    //   cityName = e.info.city.name;
    //   countryName = e.info.country.name;
    //   location["latitude"] = e.info.location.latitude;
    //   location["longitude"] = e.info.location.longitude;
    //   image = e.media.image;
    //   people = e.people.checkins;
    //
    //   console.log("country name:" + countryName);
    //   console.log("city name:" + cityName);
    //   console.log("location:" + location["latitude"] + "," + location["longitude"]);
    //   console.log("people:" + people);
    //   console.log("");
    // }
    makeCityMap(nObj);
    //drawCircle("#0000ff",1000000,getPeople);
    drawCircle("#ff0000",10000,getBeer);
    drawRect("#0000ff",0.5,getBeer);
    //drawCircle("#00ff00",100000,getCoffee);

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
    //console.log(cityMap[cityName]);
  }
}

function drawCircle(color,size,getInfo){
  for(var city in cityMap){
    data = parseInt(getInfo(cityMap[city]));
    if(data !== 0){
      var cityCircle = new google.maps.Circle({
        strokeColor: color,
        strokeOpacity: 0.5,
        strokeWeight: 1,
        fillColor: color,
        fillOpacity: 0.35,
        map: map,
        center: cityMap[city].center,
        radius: Math.sqrt(data) * size
      });
    }
  }
}


function drawRect(color,size,getInfo){
  for(var city in cityMap){
    data = parseInt(getInfo(cityMap[city]));
    if(data !== 0){
      console.log(parseInt(cityMap[city].center["lat"]) + data * size);
      var cityRectangle = new google.maps.Rectangle({
        strokeColor: color,
        strokeOpacity: 0.5,
        strokeWeight: 1,
        fillColor: color,
        fillOpacity: 0.35,
        map: map,
        bounds:{
            north: cityMap[city].center["lat"] + data * size,
            south: cityMap[city].center["lat"],
            east: cityMap[city].center["lng"] + size/16,
            west: cityMap[city].center["lng"] - size/16,
        }
      });
    }
  }
}

function getPeople(city){
  console.log("people");
  return city.people;
}
function getBeer(city){
  console.log("beer");
  return city.beer;
}
function getCoffee(city){
  console.log("coffee");
  return city.coffee;
}
