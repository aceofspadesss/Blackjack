let cap = 12,
    delay = 1000,
    selector = ".star-wrapper",
    grow = ".grower",
    shrink = ".shrinker",
    alt = true,
    alt2 = true,
    star = '<svg class="star" version="1.1" viewBox="0 0 987.8 950"><polygon points="493.9,0 646.5,309.2 987.8,358.8 740.8,599.5 799.1,939.4 493.9,779 188.6,939.4 246.9,599.5 0,358.8 341.3,309.2"/></svg>';

//Get the timers going
setInterval(function(){ 
  makeStarGrow(grow); 
  makeStarShrink(shrink); 
}, delay);

//Removes completed animations to reduce some lag..
setTimeout(function() {
   setInterval(function() {
     $(selector).children("svg:first-child").remove();
   }, delay);
}, delay * cap);

//Make it grow!
function makeStarGrow(s) {
  let tmp = $.parseHTML(star);
  if(alt) $(tmp).addClass("black");
  else $(tmp).addClass("white");
  
  $(tmp).addClass("grow");    
  $(s).append(tmp);

  alt = !alt;
}

//Make it shrink!
function makeStarShrink(s) {
  let tmp = $.parseHTML(star);
  if(alt) $(tmp).addClass("black");
  else $(tmp).addClass("white");
  
  $(tmp).addClass("shrink");    
  $(s).append(tmp);

  alt2 = !alt2;
}

//Scattering and randomizing effect
for(let i = 0; i < 50; i++) {
  let ran = Math.floor(Math.random() * 10) + 1;
  let isSmall = Math.floor(Math.random() * 10) + 1;
  let scale = "";
  let tmp = $.parseHTML("<div class='star-wrapper'></div>");
  if(ran >= 8) {  $(tmp).addClass("shrinker"); }
  else {  $(tmp).addClass("grower"); }
  
  if(isSmall >= 9) { scale = "scale(.7)"; }
  
  $(tmp).css({
    "transform": "rotate(" + Math.floor(Math.random() * 200) + "deg) " + scale,
    "left": ((Math.floor(Math.random() * 800))) - 125  + "px",
    "top": ((Math.floor(Math.random() * 400))) - 125 + "px",
  });
  $(".star-container").append($(tmp));
}
