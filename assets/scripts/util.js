Util = {
  loading :function(str){
    $("#loader-shadow").text(str);
    $("#loader-shadow").removeClass("loaded");
    $("#loader-anime").removeClass("loaded");
  },
  loaded :function(){
    $("#loader-shadow").addClass("loaded");
    $("#loader-anime").addClass("loaded");
  }
}
