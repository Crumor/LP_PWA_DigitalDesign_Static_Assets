$(document).ready(function() {
 
  $("#owl-banner, #owl-carousel").owlCarousel({
 
      autoplay:true,
	  autoplayTimeout:3000,
	  autoplayHoverPause:true,
	  loop:true,
 
      items : 1,
      itemsDesktop : [1100,3],
      itemsDesktopSmall : [960,3]
 
  });
 
});

