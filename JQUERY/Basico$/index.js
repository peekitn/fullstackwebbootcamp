
///$("h1").addClass("big-title margin-50");
///$("button").text("Bye");
///$("h1").text("Bye");
///$("button").text("<em>Hey<em>");
///$("h1").click(function(){
///    $("h1").css("color", "purple");
///})
///for (var i = 0; i < 5; i++) {
   /// document.querySelectorAll("button")[i].addEventListener("click", function(){
  ///      document.querySelector("h1").style.color = "purple";
  ///  })
///}
$("button").click(function(){
    $("h1").css("color", "purple");
});

$("input").keypress(function(event){
    console.log(event.key);
});
$(document).keypress(function(event){
    $("h1").text(event.key);
})
$("h1").on("mouseover", function(){
    $("h1").css("color", "purple");
})
//$("button").on("click", function(){
   // $("h1").toggle();
//});
//$("button").on("click", function(){
 //   $("h1").fadeOut();
//})
//$("button").on("click", function(){
  //  $("h1").slideUp();
//})
//$("button").on("click", function(){
    //$("h1").fadeToggle();
//})
//$("button").on("click", function(){
   // $("h1").animate({margin: "20%"});
//});
$("button").on("click", function(){
    $("h1").slideUp().slideDown().animate({opacity: 0.5});
});