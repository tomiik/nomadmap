Buttons = {
  clearSelected :function(){
    $("#population").removeClass("selected");
    $("#living").removeClass("selected");
    $("#coffee").removeClass("selected");
    $("#non_alcoholic").removeClass("selected");
    $("#beer").removeClass("selected");
    $("#hotel").removeClass("selected");
    $("#airbnb").removeClass("selected");
    $("#internet_speed").removeClass("selected");
    $("#safety").removeClass("selected");
    $("#racism").removeClass("selected");
  },
  selector_clicked :function(that){
    id = $(that).attr("id");
    console.log(id);
    Buttons.clearSelected();
    $("#" + id).addClass("selected");
    //initMap();
    Util.loading("drawing...");
    Draw.clear(circle_list);
    Draw.clear(rect_list);
    Draw.onMap(id);
    Util.loaded();

  }
}
