$(document).foundation({
  orbit: {
    animation: 'slide',
    timer_speed: 6000,
    pause_on_hover: true,
    animation_speed: 500,
    navigation_arrows: true,
    bullets: false
  }
});

setTimeout(function() {
    $("#hideMe").fadeOut("slow");
}, 18000); // <-- time in milliseconds

setTimeout(function() {
    $("#showMe").fadeIn("slow");
}, 19000); // <-- time in milliseconds
