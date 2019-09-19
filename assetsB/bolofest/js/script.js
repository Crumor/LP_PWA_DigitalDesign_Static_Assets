
	//Main custom script file
	jQuery(document).ready(function($){
		
		'use strict';
		
		$("a#inline").fancybox();
		//$("a#inline").fancybox().trigger('click');

		//$( "#inline" ).effect( "shake" );

		// fixed sticky navbar
		try {
			$('#fixed-main-menu').sticky({
				topSpacing: 0,
				className: 'sticky'
			});
			$('#fixed-main-menu').onePageNav({
					scrollSpeed: 0,
					scrollOffset: 0
				});
			$('.new-header').sticky({
				topSpacing: 0,
				className: 'sticky'
			});
			$('.new-header').onePageNav({
					scrollSpeed: 0,
					scrollOffset: 0
				});
		} catch (err) {

		}
		
		//Smooth Scroll
		try {
			$('.navbar-nav li a').smoothScroll();
			$('.go-button a').smoothScroll();
			$('logo-size').smoothScroll();
            $('.descubre-ruta').smoothScroll();
		} catch (err) {

		}
		
		//Auto Close Responsive Navbar on Click
		function close_toggle() {
			if ($(window).width() <= 767) {
			  $('.navbar-collapse li').on('click', function(){
				  $('.navbar-collapse').collapse('hide');
			  });
			}
			else {
				$('.navbar .navbar-default a').off('click');
			}
		}
		close_toggle();

		$(window).resize(close_toggle);
		
		//Active Menu Item on Page Scroll
		var sections = $('section')
		  , nav = $('header')
		  , nav_height = nav.outerHeight();
		 
		$(window).on('scroll', function () {
		  var cur_pos = $(this).scrollTop();
		 
		  sections.each(function() {
			var top = $(this).offset().top - nav_height,
				bottom = top + $(this).outerHeight();
				
			if (cur_pos >= top && cur_pos <= bottom) {
			  nav.find('a').removeClass('current');
			  sections.removeClass('current');
		 
			  $(this).addClass('current');
			  nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('current');
			}
		  });
		});
		
		//Header small
		$(window).scroll(function() {
			if ($(this).scrollTop() > 5){ 
				//$('#main-menu').addClass("navbar-small");
			}
			else{
				//$('#main-menu').removeClass("navbar-small");
			}
		});
		
		//Counter up
		/*$('.counter').counterUp({
			delay: 8,
			time: 1000
		});*/
		
		//owl carousal
		$('#owl-client').owlCarousel({
			autoPlay: true,
			navigation : false,
			pagination: false,
			item: 7
		});
		
		// slides
		$('#products').slides({
			autoPlay: true,
			preload: true,
			preloadImage: 'images/loading.gif',
			effect: 'slide, fade',
			crossfade: true,
			slideSpeed: 500,
			fadeSpeed: 500,
			generateNextPrev: true,
			generatePagination: false
		});
		
		// form validation
		$('#form').parsley();
		
		//Google map
		/*$("#map").gmap3({
			marker:{    
				address:"Estela de Luz, Paseo de la Reforma, Ciudad de México"
				},
			map:{
				options:{
				zoom: 17,
				scrollwheel:false,
				draggable: true 
				}
			}
		});*/

		initialize();

		
		//contact form
		$('#contactform').submit(function(){
			var action = $(this).attr('action');
			$("#message").slideUp(250,function() {
				$('#message').hide();
				$('#submit')
					.after('<img src="images/contact-form-loader.gif" class="loader" />')
					.attr('disabled','disabled');
				$.post(action, {
						name: $('#name').val(),
						email: $('#email').val(),
						website: $('#website').val(),
						capcha: $('#capcha').val(),
						comments: $('#comments').val(),
					},
					function(data){
						document.getElementById('message').innerHTML = data;
						$('#message').slideDown(250);
						$('#contactform img.loader').fadeOut('slow',function(){$(this).remove()});
						$('#submit').removeAttr('disabled');
						if(data.match('success') != null) $('#contactform').slideUp(850, 'easeInOutExpo');
					}
				);
			});
			return false;
		});
		
		// go to top
		$(window).scroll(function() {
			if($(this).scrollTop() != 0) {
				$('#toTop, #backtotop').fadeIn();	
			} else {
				$('#toTop, #backtotop').fadeOut();
			}
		});
		
		$('#toTop').click(function() {
			$('body,html').animate({scrollTop:0},800);
		});
		
	});
	
	//window load function
	$(window).load(function(){
		//Cache reference to window and animation items






		// init Isotope
		var $container = $('.isotope-container').isotope({
			itemSelector: '.item',
			layoutMode: 'masonry',
			masonry: {
				gutter: 20
			},
			transitionDuration: '0.5s',
			// only opacity for reveal/hide transition
			hiddenStyle: {
			  opacity: 0
			},
			visibleStyle: {
			  opacity: 1
			}
		});
		
		// filter functions
		var filterFns = {
			// show if number is greater than 50
			numberGreaterThan50: function() {
			  var number = $(this).find('.number').text();
			  return parseInt( number, 10 ) > 50;
			},
			// show if name ends with -ium
			ium: function() {
			  var name = $(this).find('.name').text();
			  return name.match( /ium$/ );
			}
		};
		
		// bind filter button click
		$('#filters').on( 'click', 'button', function() {
			var filterValue = $( this ).attr('data-filter');
			// use filterFn if matches value
			filterValue = filterFns[ filterValue ] || filterValue;
			$container.isotope({ filter: filterValue });
		});

		// change is-checked class on buttons
		$('.button-group').each( function( i, buttonGroup ) {
			var $buttonGroup = $( buttonGroup );
			$buttonGroup.on( 'click', 'button', function() {
			  $buttonGroup.find('.is-checked').removeClass('is-checked');
			  $( this ).addClass('is-checked');
			});
		});


		
	});


/*var $animation_elements = $('.huella');
var $window = $(window);

function check_if_in_view() {
  var window_height = $window.height();
  var window_top_position = $window.scrollTop();
  var window_bottom_position = (window_top_position + window_height);

  
$.each($animation_elements, function() {
    var $element = $(this);
    var element_height = $element.outerHeight();
    var element_top_position = $element.offset().top;
    var element_bottom_position = (element_top_position + element_height);
 
    //check to see if this current container is within viewport
    if ((element_bottom_position >= window_top_position) &&
        (element_top_position <= window_bottom_position)) {
       $element.animate({width: "60%"}, 400, function() {
            // Animation complete.
        });
    } else {
      $element.animate({width: "60%"}, 400, function() {
            // Animation complete.
        });
    }
  });
}

$window.on('scroll resize', check_if_in_view);
$window.trigger('scroll');*/
var $animation_elements = $('.huella');
var $window = $(window);
$($window).scroll(function() {
    //var element_height = $('.huella').outerHeight();
    //var element_bottom_position = (element_pos + element_height);
    /*var element_pos = $('.huella').offset().top;
    var element_uno = $('.mini1').offset().top;
    var element_dos = $('.mini2').offset().top;
    var element_tres = $('.mini3').offset().top;
    var element_cuatro = $('.mini4').offset().top;
    var element_cinco = $('.mini5').offset().top;
    var element_map = $('.ruta').offset().top;
    var element_txtanim = $('.texto-anim1').offset().top;*/
    
    var scr= $($window).scrollTop()
    //console.log(element_pos + " vs " + scr);
    //if ($(this).width() < 992) {

      /*  if (Number($($window).scrollTop()) >= Number(element_pos-700)) {
        	console.log("Ya fue");
        	$('.huella').animate({width: "60%"}, 400, function() {
            // Animation complete.
            });
           
        }
        if (Number($($window).scrollTop()) >= Number(element_uno-700)) {
        	console.log("Ya fue");
        	$('.mini1').animate({width: "60%"}, 400, function() {
            // Animation complete.
            });
           
        }
        if (Number($($window).scrollTop()) >= Number(element_dos-700)) {
        	console.log("Ya fue");
        	$('.mini2').animate({width: "60%"}, 400, function() {
            // Animation complete.
            });
           
        }
        if (Number($($window).scrollTop()) >= Number(element_tres-700)) {
        	console.log("Ya fue");
        	$('.mini3').animate({width: "60%"}, 400, function() {
            // Animation complete.
            });
           
        }
        if (Number($($window).scrollTop()) >= Number(element_cuatro-700)) {
        	console.log("Ya fue");
        	$('.mini4').animate({width: "60%"}, 400, function() {
            // Animation complete.
            });
           
        }
        if (Number($($window).scrollTop()) >= Number(element_cinco-700)) {
        	console.log("Ya fue");
        	$('.mini5').animate({width: "60%"}, 400, function() {
            // Animation complete.
            });
           
        }
        if (Number($($window).scrollTop()) >= Number(element_map-700)) {
        	console.log("Ya fue");
        	$('.ruta').animate({width: "100%"}, 600, 'swing', function() {
            // Animation complete.
            });
           
        }
        if (Number($($window).scrollTop()) >= Number(element_txtanim-700)) {
        	console.log("Ya fue");
        	$('.texto-anim1').animate({opacity: "1"}, 1200, function() {
            // Animation complete.
            });
           
        }*/
    //}
});

function initialize() {    
     var myOptions = {    
     center: new google.maps.LatLng(19.4276478,-99.1683483),   
     zoom: 15,
     zoomControl: false,
     scaleControl: false,      
     mapTypeId: google.maps.MapTypeId.ROADMAP         };    
     var map = new google.maps.Map(document.getElementById("map"),myOptions); 
     bolo1 = new google.maps.Marker({
      position: new google.maps.LatLng(19.4230831,-99.1757684),  
      map: map,         
      title: 'Inicio',
      scrollwheel:false,
	  draggable: false});  
	  bolo4 = new google.maps.Marker({
      position: new google.maps.LatLng(19.433057, -99.154748),  
      map: map,         
      title: 'Fin',
      scrollwheel:false,
	  draggable: false});   
      var ruta = [  new google.maps.LatLng(19.4230831,-99.1757684),         new google.maps.LatLng(19.426797, -99.167681),         new google.maps.LatLng(19.433057, -99.154748)     ]; 
    var lineas = new google.maps.Polyline({        
    path: ruta,
    map: map, 
    strokeColor: '#ef0565', 
    strokeWeight: 4,  
    strokeOpacity: 0.6, 
    clickable: false     });       }


/*(function ($) {
    $.fn.shake = function (options) {
        // defaults
        var settings = {
            'shakes': 2,
            'distance': 5,
            'duration': 600
        };
        // merge options
        if (options) {
            $.extend(settings, options);
        }
        // make it so
        var pos;
        return this.each(function () {
            $this = $(this);
            // position if necessary
            pos = $this.css('position');
            if (!pos || pos === 'static') {
                $this.css('position', 'relative');
            }
            // shake it
            for (var x = 1; x <= settings.shakes; x++) {
                $this.animate({ left: settings.distance * -1 }, (settings.duration / settings.shakes) / 4)
                    .animate({ left: settings.distance }, (settings.duration / settings.shakes) / 2)
                    .animate({ left: 0 }, (settings.duration / settings.shakes) / 4);
            }
        $("#inline").shake();
        });
    };
}(jQuery));
$(document).ready(function() {

        $("#inline").shake();
});*/


/*$(document).ready(function() {
		var controller = $.superscrollorama({
			triggerAtCenter: false,
			playoutAnimations: true
		});
		controller.addTween('.huella', 
	    TweenMax.from($('.huella'), .5, {css:{opacity:0}}));
	});*/