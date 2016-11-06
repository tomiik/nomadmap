function draw(str){
  var func = "";
  var multiple = 1000;
  console.log(str);
  if(str === "population"){
    func = getPopulation;
    var multiple = 1000;
  }
  else if(str === "living"){
    func = getLiving;
    var multiple = 0.001;
  }
  else if(str === "coffee"){
    func = getCoffee;
  }
  else if(str === "non_alcoholic"){
    var multiple = 100;
    func = getNonAlcoholic;
  }
  else if(str === "beer"){
    func = getBeer;
  }
  else if(str === "hotel"){
    func = getHotel;
    var multiple = 10;
  }
  else if(str === "airbnb"){
    func = getAirbnb;
    var multiple = 10;
  }
  else if(str === "internet_speed"){
    func = getInternet;
    var multiple = 10;
  }
  else if(str === "safety"){
    func = getSafety;
    var multiple = 1000;
  }
  else if(str === "racism"){
    func = getRacism;
    var multiple = 1000;
  }
  drawCircle("#ff0000",10 * multiple,func);
  drawRect("#0000ff",0.0001 * multiple ,func);
}
function drawCircle(color,size,getInfo){
  for(var city in cityMap){
    data = parseInt(getInfo(cityMap[city]));
    data *= data;
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
      circle_list.push(cityCircle);
    }
  }
}


function drawRect(color,size,getInfo){
  for(var city in cityMap){
    data = parseInt(getInfo(cityMap[city]));
    data *= data;
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
            east: cityMap[city].center["lng"] + 0.02,
            west: cityMap[city].center["lng"] - 0.02,
        }
      });
      rect_list.push(cityRectangle);
    }
  }
}

function clear(list){
  list.forEach(function(obj, idx) {
   obj.setMap(null);
 });
}
