function clearButtons(){
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
}

$(".selector").click(function(){
  id = $(this).attr("id");
  console.log(id);
  clearButtons();
  $("#" + id).addClass("selected");
  //initMap();

  clear(circle_list);
  clear(rect_list);
  draw(id);
})
