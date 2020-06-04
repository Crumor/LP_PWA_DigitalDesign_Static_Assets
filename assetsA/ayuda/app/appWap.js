(function(){
		angular.module('APP_AYUDA_WAP',["ngRoute","ngSanitize","firebase","ngAnimate","moduleWapHome","moduleWapCategory","services","componentInputSearch","componentPreguntasFrecuentes",'angulartics','angulartics.google.analytics','jsonReader'])
		.constant('myconfig',{
			"url":"../app/modules/wap/",
			"path":"../",
			"urlDirectives":"../app/common/directives/",
			"path":"../",
			/*"database":"https://ayuda-b41be.firebaseio.com/"*/
			"database":"https://fir-example-a0104.firebaseio.com/Ayudas/liverpool-fix-250520/"
		})
		.config(configuracion)
		.run(run)
		.filter('unsafe', ['$sce', function ($sce) {

				return function (input) {

					return $sce.trustAsHtml(input);

			}

		}])
		.filter('unsafe_respuesta', ['$sce', function ($sce) {

				return function (input) {

					//valida si es html y retorna el input modificado
						if ( isHTML(input) ){
								return $sce.trustAsHtml(input);
							}else{
								return "<p>"+input+"</p>";
							}          
				}

		}])      
		.filter('responseSearch',function(){

			return function(input){
				var quitTags = input.replace(/<(?:.|\n)*?>/gm, '');
				return quitTags.slice(0,80);
			}

		});

		function isHTML(str) {
				var a = document.createElement('div');
				a.innerHTML = str;
				for (var c = a.childNodes, i = c.length; i--; ) {
						if (c[i].nodeType == 1) return true; 
				}
				return false;
		}

		function run( $rootScope, $location, $http,myconfig,$animate ){
			$rootScope.$on("$locationChangeStart", function(event, next, current) { 
					 $("html, body").animate({ scrollTop: 0 }, 100);
			});
			$rootScope.classPageNext = "";
			$animate.on('leave', angular.element('.page'),
						function callback(element, phase) {
						// cool we detected an enter animation within the container
						
						}
				);
			var device = navigator.userAgent;
			var isMovil = false;
			var data = sessionStorage.getItem('first');
			if (device.match(/Iphone/i)|| device.match(/Ipod/i)|| device.match(/Android/i)|| device.match(/J2ME/i)|| device.match(/BlackBerry/i)|| device.match(/iPhone|iPad|iPod/i)|| device.match(/Opera Mini/i)|| device.match(/IEMobile/i)|| device.match(/Mobile/i)|| device.match(/Windows Phone/i)|| device.match(/windows mobile/i)|| device.match(/windows ce/i)|| device.match(/webOS/i)|| device.match(/palm/i)|| device.match(/bada/i)|| device.match(/series60/i)|| device.match(/nokia/i)|| device.match(/symbian/i)|| device.match(/HTC/i)){ 

			}else{
				location.href="../index.html"
			}
		};

		function configuracion ( $routeProvider, $locationProvider,$analyticsProvider, myconfig ) {
	        $analyticsProvider.firstPageview(true); /* Records pages that don't use $state or $route */
	        $analyticsProvider.withAutoBase(true);  /* Records full path */
			$routeProvider.
				when("/",{
					controller:"homeWapController",
					templateUrl:myconfig.url+"home/home.html"

				})
				.when("/sec/:link/",{

					controller:"controllerWapCategory",
					templateUrl:myconfig.url+"category/category.html"
				})
				.when("/sec/:link/:link2",{

					controller:"controllerWapCategory",
					templateUrl:myconfig.url+"category/category.html"
				})
        .when("/cont/:link/:link2",{

          controller:"controllerWapContent",
          templateUrl:myconfig.url+"category/content.html"
        })
        .when("/cont/:link/:link2",{

          controller:"controllerWapContent",
          templateUrl:myconfig.url+"category/content.html"
        })
        .when("/cont/:link/:link2/:link3",{

          controller:"controllerWapContent",
          templateUrl:myconfig.url+"category/content.html"
        })
				.when("/faq/:link",{

					controller:"controllerWapContentAnswer",
					templateUrl:myconfig.url+"category/contentAnswer.html"
				})
        .when("/faq/:link/:idAnswer",{

          controller:"controllerWapContentAnswer",
          templateUrl:myconfig.url+"category/contentAnswer.html"
        })
        				.when("/resultados/:search",{
					controller:"controllerWapResult",
					templateUrl:myconfig.url+"results/results.html"
				})
				/*.when("/category/:idMenu",{

					controller:"controllerWapCategory",
					templateUrl:myconfig.url+"category/category.html"
				})
				.when("/answer/:idMenu",{

					controller:"controllerWapCategory",
					templateUrl:myconfig.url+"category/category.html"
				})
				.when("/answer/content/:idMenu",{
					controller:"controllerWapContentAnswer",
					templateUrl:myconfig.url+"category/contentAnswer.html"
				})
				.when("/answer/content/:idMenu/:idPregunta",{
					controller:"controllerWapContentAnswer",
					templateUrl:myconfig.url+"category/contentAnswer.html"
				})
				.when("/category/content/:idContent",{
					controller:"controllerWapContent",
					templateUrl:myconfig.url+"category/content.html"
				})
				.when("/results/:search",{
					controller:"controllerWapResult",
					templateUrl:myconfig.url+"results/results.html"
				})*/
			//.otherwise({ redirectTo: '/' });
			$locationProvider.hashPrefix('');
			
		}
})();