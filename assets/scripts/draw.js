Draw = {
  onMap :function(str){
    var func = "";
    var multiple = 1000;
    //console.log(str);
    if(str === "population"){
      func = Getter.population;
      var multiple = 1000;
    }
    else if(str === "living"){
      func = Getter.living;
      var multiple = 0.1;
    }
    else if(str === "coffee"){
      func = Getter.coffee;
    }
    else if(str === "non_alcoholic"){
      var multiple = 100;
      func = Getter.nonAlcoholic;
    }
    else if(str === "beer"){
      func = Getter.beer;
    }
    else if(str === "hotel"){
      func = Getter.hotel;
      var multiple = 100;
    }
    else if(str === "airbnb"){
      func = Getter.airbnb;
      var multiple = 100;
    }
    else if(str === "internet_speed"){
      func = Getter.internet;
      var multiple = 100;
    }
    else if(str === "safety"){
      func = Getter.safety;
      var multiple = 1000;
    }
    else if(str === "racism"){
      func = Getter.racism;
      var multiple = 1000;
    }
    this.circle("#ff0000",10 * multiple,func);
    this.rect("#0000ff",0.001 * multiple ,func);
  },
  circle :function(color,size,getInfo){
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
  },
  rect :function(color,size,getInfo){
    for(var city in cityMap){
      data = parseInt(getInfo(cityMap[city]));
      //data *= data;
      if(data !== 0){
        //console.log(parseInt(cityMap[city].center["lat"]) + data * size);
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
              east: cityMap[city].center["lng"] + 0.04,
              west: cityMap[city].center["lng"] - 0.04,
          }
        });
        rect_list.push(cityRectangle);
      }
    }
  },
  clear :function(list){
    list.forEach(function(obj, idx) {
     obj.setMap(null);
   });
  }
}
