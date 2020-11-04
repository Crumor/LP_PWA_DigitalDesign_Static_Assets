(function(){
    angular.module('APP_JUGUETERIA',["ngRoute","ngSanitize","factorys","services"
                                     ,"paths","componentMenuCategorias","componentInputBuscar","ngSanitize",

                                    "categorias","detalle","carta","busquedas","componentOwlCarucel","componentDialogs","home","angulartics", "angulartics.google.analytics","angulartics.facebook.pixel"])
    .config(["$routeProvider","$locationProvider","$analyticsProvider","$httpProvider",configuracion])
    .run(['$rootScope', '$location', '$http', '$route',"serviceModel","serviceBlackList","serviceStorePedidos","$timeout",run])

    function run( $rootScope, $location, $http, $route, serviceModel,serviceBlackList,serviceStorePedidos,$timeout ){
        /**modal principal agregar carta**/
        $rootScope.globalProducto = serviceModel.producto();
        $rootScope.totalPedidos = serviceStorePedidos.getTotalPedidos();
        $rootScope.cartaExito = false;
        $rootScope.actualPath = "/"
        serviceBlackList.init(function(data){});
        /*modalPrincipal agregar Carta*/
        $rootScope.$on('$locationChangeSuccess', function (event, next, current)
        {
            $("html, body").animate({ scrollTop: 0 }, 600);
            var path = $location.path();
            $rootScope.actualPath =  path;
            if(path === "/micarta/exito" && $rootScope.cartaExito){
                if(typeof mouseflow!= "undefined"){
                    _mfq.push(["newPageView", path]);
                    mouseflow.newPageView();
                }
            }else if(path === "/micarta/exito" && !$rootScope.cartaExito){
                $location.path("/micarta");
            }
            if(path != "/micarta/exito"){
                if(typeof mouseflow!= "undefined"){
                    _mfq.push(["newPageView", path]);
                    mouseflow.newPageView();
                }
            }
            /*if(mouseflow!=undefined) {

                _mfq.push(["newPageView", path]);
                mouseflow.newPageView();
            }*/
        });
    };

    function configuracion ($routeProvider,$locationProvider,$analyticsProvider,$httpProvider) {

      $analyticsProvider.virtualPageviews(true);
     $routeProvider.
        when("/",{
          controller:"inicioController",
      templateUrl:"app/modules/inicio/inicio.html"
        })
     .when("/busquedatype/:page",{
      redirectTo: "/busquedatype/1/:page"
     })
     .when("/busquedatype/:page/:valor",{
      controller:"busquedaResultadoController",
      templateUrl:"app/modules/busquedas/busquedaType.html"
     })
       .when("/categoria/:categoria", {
         controller:'categoriasController',
         templateUrl:"app/modules/categorias/categoria.html"

     })
       .when("/detalle/:productId",{
         controller:"detalleJugueteController",
         templateUrl:"app/modules/detalles/detalleJuguete.html",

     })
       .when("/detalletopdiez/:productId",{
         controller:"detalleJugueteController",
         templateUrl:"app/modules/detalles/detalleJuguete.html",

     })
       .when("/subcategoria/:identificador", {
      templateUrl:"app/modules/categorias/subcategoria.html",
       })
     .when("/subcategoria/:categoria/:subcategoria/", {
           controller:"subCategoriaController",
       templateUrl:"app/modules/categorias/subcategoria.html",
     })
       .when("/mejoresmarcas/:valor",{
      controller:"mejoresMarcasController",
      templateUrl:"app/modules/busquedas/mejoresMarcas.html"
       })
       .when("/favoritos/:valor",{
      controller:"mejoresMarcasController",
      templateUrl:"app/modules/busquedas/favoritos.html"
       })
        .when("/micarta", {
            controller:"cartaController",
        templateUrl:"app/modules/carta/carta.html",
      })

        .when("/micarta/felicidades", {
          controller:"cartaControllerFelicidades",
      templateUrl:"app/modules/carta/felicidades.html",
      })
       .otherwise({ redirectTo: '/' });
       $locationProvider.hashPrefix('');
}
})();

(function() {
    angular.module('busquedas', []).controller("busquedaResultadoController", busquedaResultadoController)
        .controller("mejoresMarcasController", busquedaResultadoController);

    function busquedaResultadoController($scope, serviceProducto, $routeParams, $timeout) {
        $scope.total = 0;
        $scope.totalAux = -1;
        $scope.word = $routeParams.valor;
        $scope.resultadosBusqueda = [];
        $scope.loaded = true;
        $scope.firstItemType = "";
        $scope.isVideoOf = "";
        $scope.seeMore = false;
        var pageActual = 1;
        var totalPages = 1;
        var win = $(window);
        var resultadoBusqueda = [];
        var videosMarcas = ["xbox one", "huawei", "prinsel", "disney collection", "hot wheels"];
        $scope.resultadosBusqueda = [];
        serviceProducto.getResultadosBusqueda(pageActual, $routeParams.valor, response);
        $scope.getPleca = getPleca($routeParams.valor);
        angular.forEach(videosMarcas, function(val, key) {
            if ($routeParams.valor === val) {
                $scope.firstItemType = "video";
                $scope.isVideoOf = key;
            }
        });

        function response(data) {
            $scope.loaded = true;
            $scope.seeMore = false;
            if (data.success) {
                $timeout(function() {
                    $scope.total = data.totalR;
                    $scope.totalAux = data.totalR;
                    totalPages = data.totalPages;
                    if (pageActual < totalPages) {
                        $scope.seeMore = true;
                    }
                    resultadoBusqueda = resultadoBusqueda.concat(data.data);
                    resultadoBusqueda = serviceProducto.reduceString(resultadoBusqueda, 80);
                    $scope.resultadosBusqueda = resultadoBusqueda;
                    $scope.loaded = false;

                }, 500);
            };
        };
        $scope.nextPage = function() {
            pageActual++;
            if (pageActual <= totalPages) {
                serviceProducto.getResultadosBusqueda(pageActual, $routeParams.valor, response);
            }
        }

        function getPleca(name) {
            var information = [{
                    color1: "#94F0F3",
                    color2: "none",
                    color3: "#FFA200",
                    fondo: "#f6cfe4",
                    label: "Lego"
                },
                {
                    color1: "#97F34E",
                    color2: "none",
                    color3: "#FC3491",
                    fondo: "#f6cfe4",
                    label: "barbie"
                },
                {
                    "color1": "#0DC6AB",
                    "color2": "none",
                    "color3": "#FF475C",
                    fondo: "#f6cfe4",
                    label: "xbox one"
                },
                {
                    "color1": "#0DC6AB",
                    "color2": "none",
                    "color3": "#FF475C",
                    fondo: "#f6cfe4",
                    label: "nintendo"
                },
                                {
                    "color1": "#0DC6AB",
                    "color2": "none",
                    "color3": "#FF475C",
                    fondo: "#f6cfe4",
                    label: "distroller"
                },
                
                {
                    color1: "#97F34E",
                    color2: "none",
                    color3: "#FC3491",
                    fondo: "#f6cfe4",
                    label: "huawei"
                },
                {
                    "color1": "#FDD44B",
                    "color2": "none",
                    "color3": "#FF5E70",
                    fondo: "#f6cfe4",
                    label: "prinsel"
                },
                {
                    color1: "#97F34E",
                    color2: "none",
                    color3: "#FC3491",
                    fondo: "#f6cfe4",
                    label: "disney collection"
                },
                {
                    "color1": "#FDD44B",
                    "color2": "none",
                    "color3": "#FF5E70",
                    fondo: "#f6cfe4",
                    label: "Hot wheels"
                },
                {
                    color1: "#97F34E",
                    color2: "none",
                    color3: "#FC3491",
                    fondo: "#f6cfe4",
                    label: "play doh"
                },
                {
                    "color1": "#B9C3CB",
                    "color2": "none",
                    "color3": "#33CAF7",
                    fondo: "#f6cfe4",
                    label: "marvel"
                },
                {
                    color1: "#97F34E",
                    color2: "none",
                    color3: "#FC3491",
                    fondo: "#f6cfe4",
                    label: "little pony"
                },
                {
                    "color1": "#ACC1D2",
                    "color2": "none",
                    "color3": "#FF877C",
                    fondo: "#f6cfe4",
                    label: "paw patrol"
                },
                {
                    color1: "#97F34E",
                    color2: "none",
                    color3: "#FC3491",
                    fondo: "#f6cfe4",
                    label: "fisher price"
                },
                {
                    "color1": "#92E8DF",
                    "color2": "none",
                    "color3": "#FF4C60",
                    fondo: "#f6cfe4",
                    label: "nerf"
                },
                {
                    "color1": "#B9C3CB",
                    "color2": "none",
                    "color3": "#33CAF7",
                    fondo: "#f6cfe4",
                    label: "starwars"
                },
                {
                    color1: "#97F34E",
                    color2: "none",
                    color3: "#FC3491",
                    fondo: "#f6cfe4",
                    label: "playskool"
                },
                {
                    "color1": "#94F0F3",
                    "color2": "none",
                    "color3": "#FFA200",
                    fondo: "#f6cfe4",
                    label: "lego"
                },
                {
                    color1: "#97F34E",
                    color2: "none",
                    color3: "#FC3491",
                    fondo: "#f6cfe4",
                    label: "enchantimals"
                },
                {
                    "color1": "#0DC6AB",
                    "color2": "none",
                    "color3": "#FF475C",
                    fondo: "#f6cfe4",
                    label: "xbox"
                },
                {
                    color1: "#97F34E",
                    color2: "none",
                    color3: "#FC3491",
                    fondo: "#f6cfe4",
                    label: "justice league"
                },
                {
                    "color1": "#FDD44B",
                    "color2": "none",
                    "color3": "#FF5E70",
                    fondo: "#f6cfe4",
                    label: "hot wheels"
                },
                {
                    "color1": "#FDD44B",
                    "color2": "none",
                    "color3": "#FF5E70",
                    fondo: "#f6cfe4",
                    label: "montables"
                },
                {
                    color1: "#97F34E",
                    color2: "none",
                    color3: "#FC3491",
                    fondo: "#f6cfe4",
                    label: "peppa pig"
                },
                {
                    "color1": "#0DC6AB",
                    "color2": "none",
                    "color3": "#FF475C",
                    fondo: "#f6cfe4",
                    label: "playstation"
                },
                {
                    color1: "#97F34E",
                    color2: "none",
                    color3: "#FC3491",
                    fondo: "#f6cfe4",
                    label: "mega blocks"
                },
                {
                    color1: "#97F34E",
                    color2: "none",
                    color3: "#FC3491",
                    fondo: "#f6cfe4",
                    label: "playmobil"
                },
                {
                    "color1": "#94F0F3",
                    "color2": "none",
                    "color3": "#FFA200",
                    fondo: "#f6cfe4",
                    label: "mega construx"
                },
                {
                    color1: "#97F34E",
                    color2: "none",
                    color3: "#FC3491",
                    fondo: "#f6cfe4",
                    label: "shopkins"
                },
                {
                    "color1": "#E8B25B",
                    "color2": "none",
                    "color3": "#9ABDCA",
                    fondo: "#f6cfe4",
                    label: "Transformers"
                },
                {
                    color1: "#97F34E",
                    color2: "none",
                    color3: "#FC3491",
                    fondo: "#f6cfe4",
                    label: "hatchimals"
                },
                {
                    color1: "#97F34E",
                    color2: "none",
                    color3: "#FC3491",
                    fondo: "#f6cfe4",
                    label: "galaxy tab"
                },
                {
                    "color1": "#FDD44B",
                    "color2": "none",
                    "color3": "#FF5E70",
                    fondo: "#f6cfe4",
                    label: "feber"
                }, {
                    color1: "#97F34E",
                    color2: "none",
                    color3: "#FC3491",
                    fondo: "#f6cfe4",
                    label: "hasbro"
                }, {
                    color1: "#FDD44B",
                    color2: "none",
                    color3: "#FF5E70",
                    fondo: "#9af7ff",
                    label: "jurassic world"
                }   , {
                    color1: "#97F34E",
                    color2: "none",
                    color3: "#FC3491",
                    fondo: "#f6cfe4",
                    label: "frozen II"
                }
            ];
            var index = -1;
            var label = {
                color1: "#97F34E",
                color3: "#FC3491",
                fondo: "#f6cfe4",
                label: ""
            };
            angular.forEach(information, function(val, key) {
                var _label = val.label;
                _label = _label.toLowerCase();
                var _name = name.toLowerCase();
                if (_label === _name) {
                    index = key;
                    label = val;
                }
            });
            pleca = {
                success: true,
                data: label,
                code: 0
            }
            return pleca;


        };
    };
})();

(function(){
	angular.module('carta',[]).controller( "cartaController", cartaController )
	.controller( "cartaControllerFelicidades", cartaControllerFelicidades );

	function cartaController($rootScope, $scope, serviceStorePedidos,$location ){

		$scope.carta = {email:"",mensaje:"",nombre:""};
		$scope.information = {
			success: true,
			data: {
				color1:"#97F34E",
				color2:"none",
				color3:"#FC3491",
				fondo:"#f6cfe4",
				label:"Mi carta a Santa"
			},
			code: 0
		};
		$scope.isActiveBtnEnviar = true;
		$scope.pedidos = function(){
		   return serviceStorePedidos.getPedidos();
		}
		$scope.eliminarPedido = function(index){
		   serviceStorePedidos.deletePedido(index);
		}
		$scope.enviarPedido = function(){
			$scope.isActiveBtnEnviar = false;
			if($scope.carta.mensaje === "")
				$scope.carta.mensaje="Este año he sido buen niñ@. Acabo la tarea antes de jugar. Respeto a mis mayores, ayudo en mi casa y sobre todo me como mis verduras. Te agradecería si me pudieras traer los juguetes que seleccione en La Mejor Juguetería";
			serviceStorePedidos.enviarPedido($scope.carta,function(response){
			 if( response.success )
				if( response.code === -2 ) {
					$("#modalEnvioMal").modal('show');
					$scope.isActiveBtnEnviar = true;
				}else
					if( response.code ===-1 ) {
						$("#modalEnvioMalFalta").modal('show');
						$scope.isActiveBtnEnviar = true;
					}else if(response.code === 1 ){
						$rootScope.cartaExito = true;
						$location.path("/micarta/felicidades");
					}
			});
		}
		$scope.addFavoritos=function(p){
			$(".fa.fa-heart-o").click(function() {
			$(this).removeClass("fa-heart-o")
			$(this).addClass("fa-heart")
			})
		};
		$scope.microfono=function(id){

			if (window.hasOwnProperty('webkitSpeechRecognition')) {

					var recognition = new webkitSpeechRecognition();

					recognition.continuous = false;
					recognition.interimResults = false;

					recognition.lang = "es-MX";
					recognition.start();

					recognition.onresult = function(e) {
						document.getElementById(id).value = e.results[0][0].transcript;
						recognition.stop();
						//document.getElementById('labnol').submit();
						$('#mic').css('background',"url('assets/images/micro/inactivo.png')");
						$('#mic2').css('background',"url('assets/images/micro/inactivo.png')");
						$('#mic3').css('background',"url('assets/images/micro/inactivo.png')");
					};

					recognition.onerror = function(e) {
						recognition.stop();

					}
				}
		};
			$('#mic').click( function() {
				$(this).css('background',"url('assets/images/micro/animated.gif')");
			})
			$('#mic2').click( function() {
				$(this).css('background',"url('assets/images/micro/animated.gif')");
			})
			$('#mic3').click( function() {
				$(this).css('background',"url('assets/images/micro/animated.gif')");
			})
			$("input#transcript1").click(function () {
				document.getElementById('audioNombre').play();
			});
			$("input#transcript2").click(function () {
				document.getElementById('audioMail').play();
			});
			$("textarea#transcript3").click(function () {
				document.getElementById('audioSanta').play();
			});

	}
	function cartaControllerFelicidades( $rootScope,$scope, serviceStorePedidos,$location ){
		var  pedidos = serviceStorePedidos.getPedidos();
		if(pedidos.length <= 0){
			$location.path("/indexqa.html")
		}else{
		   	$rootScope.cartaExito = false;
			serviceStorePedidos.deleteAllPedidos();
			 	$scope.regresar=function(){
			 		$location.path("/indexqa.html");
			 	}
		 }
	}

})();

(function(){
    angular.module('categorias',[]).controller( "categoriasController", categoriaController ).
    controller( "subCategoriaController", subCategoriaController );
    function categoriaController( $scope, serviceProducto, $routeParams,$location,$timeout ){
        $scope.categorias = [];
        $scope.idCategoria = "";

        // $scope
        $scope.loaded = true;
        $scope.banner = null;
        if( $routeParams.hasOwnProperty("categoria")){
            serviceProducto.getCategoria( $routeParams.categoria, function( data ){
               console.log(data);
                if( data.success ){
                    $scope.banner = data.data.principal;
                    $scope.idCategoria = $routeParams.categoria;
                    $timeout(function(){
                        $scope.categorias = data.data.subcategorias;
        
                        $scope.loaded = false;
                    },500);
                }else{
                    $location.path("/");
                }
            });
        }else{
            console.log("No existe identificador ");
        }
    }
    function subCategoriaController( $scope, serviceProducto, $routeParams,$timeout,$location,$http ){
  
        $scope.categorias = [];
        $scope.label = "";
        $scope.idCategoria = "";
        $scope.fondo = "";
        $scope.loaded = true;
        $scope.firstItemType = "image";
        $scope.idCategoria = "";
        var pageActual = 1;
        var totalPages = 1;
        var win = $( window );
        var categorias= [];
        var _data = [];
        $scope.banner = {};
        if( $routeParams.hasOwnProperty("categoria") && $routeParams.hasOwnProperty("subcategoria")){
            if("catst1896485" === $routeParams.subcategoria || "catst1833807" === $routeParams.subcategoria || "catst1833811" === $routeParams.subcategoria || "catst1896485" === $routeParams.subcategoria){
                serviceProducto.getSubSubCategoria($routeParams.subcategoria, pageActual, responseSubSubCategoria);
                if("catst1896485" === $routeParams.subcategoria || "catst1833807" === $routeParams.subcategoria || "catst1833811" === $routeParams.subcategoria  || "catst1896485" === $routeParams.subcategoria){
                  serviceProducto.getSubCategoria( $routeParams.categoria,$routeParams.subcategoria,pageActual, function( data ){
                      _data= data;
                          $scope.banner = _data.data.principal;
                  });
                }
                $scope.banner = $routeParams.categoria;
                $scope.idCategoria = $routeParams.subcategoria;
              return;
            }
            serviceProducto.getSubCategoria( $routeParams.categoria,$routeParams.subcategoria,pageActual, function( data ){
                _data= data;
                if( _data.success ){
                    $scope.label = _data.data.principal.label;
                  //  $scope.banner = _data.data.principal;
                    $scope.fondo =  _data.data.principal.hasOwnProperty("colorfondo") ? _data.data.principal.colorfondo: "" ;
                    $scope.idCategoria = $routeParams.categoria;
                    serviceProducto.getSubSubCategoria( _data.data.principal.categoryid, pageActual, responseSubSubCategoria);
                }
            });
        }
        $scope.irDetalle=function(id){
            $location.path("/detalle/"+id);
        }
        win.scroll(function() {
            if ( ( $(document).height() - win.height() == win.scrollTop() ) && $scope.loaded ===false) {
                pageActual ++;
                if( pageActual <= totalPages ){
                    $scope.loaded = true;
                    serviceProducto.getSubSubCategoria( _data.data.principal.navigationState, pageActual, responseSubSubCategoria );
                }else{
                    console.log("");
                }
		   }
	    });
        function responseSubSubCategoria(data){

                categorias = categorias.concat( data.data );
                $scope.subcategorias = categorias;
                totalPages = data.totalPages;
                $scope.loaded  = false;

        };

    }/*end funcion subCategoriaController*/
})();

(function(){
    angular.module('detalle',[]).controller("detalleJugueteController",detalleController)
    .directive('twitter', [compartirTwitter]);
    function compartirTwitter(){
        return {
            link: function(scope, element, attr) {
                setTimeout(function() {
                        twttr.widgets.createShareButton(
                            attr.url,
                            element[0],
                            function(el) {}, {
                                count: 'none',
                                text: attr.text
                            }
                        );
                });
            }
        }
    }
    function detalleController($scope,$routeParams,serviceProducto,$location,$timeout){
        $scope.vm = {};
        $scope.vm.success = false;
        $scope.vm.producto = [];
        $scope.imagenAux = "";
        $scope.loaded = true;
        $scope.indexActive = -1;
        if( $routeParams.hasOwnProperty("productId") ){
            serviceProducto.getProducto( $routeParams.productId,function(data){
                if( data.success ){
                    $scope.imagenAux = data.data.imageBg;
                    $scope.vm.success = data.success;
                    $scope.vm.producto = data.data;
           
                    $timeout(function(){
                        initGallery($scope);
                        $scope.loaded =false;
                    },1000);
                }
            },1);

        }else{
            console.log(" No existe identificador ");
        }
        $scope.cambioImagen = function(imagen) {
            $scope.imagenAux = imagen;
        };
        $scope.share = function(producto){
          FB.ui({
              method: 'share',
              mobile_iframe: true,
              href: 'http://lamejorjugueteria.liverpool.com.mx/#/detalle/'+producto.id,
          } , function(response){
          });
        };
        $scope.compartirGoogle=function( producto ){
            var href="https://plus.google.com/share?url=http%3A%2F%2Flamejorjugueteria.liverpool.com.mx%2F%23%2Fdetalle%2F"+producto.id+"&ref_src=twsrc%5Etfw&text="+producto.description;
            window.open(href,
  'http%3A%2F%2Flamejorjugueteria.liverpool.com.mx%2F%23%2Fdetalle%2F'+producto.id+'&ref_src=twsrc%5Etfw&text='+producto.description, 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
        }
        $scope.shareTwitter = function(producto){
          var src = 'https://twitter.com/intent/tweet?text=http://lamejorjugueteria.liverpool.com.mx/#/detalle/'+producto.id;
          window.open('https://twitter.com/intent/tweet?text=http%3A%2F%2Flamejorjugueteria.liverpool.com.mx%2F%23%2Fdetalle%2F'+producto.id)
        }
        $scope.goToSlider=function(index){
          $scope.indexActive = index;
          var owl = $('#slider').data('owlCarousel');
          owl.goTo(index+1);
        }
    };//end detalle controller
    var foo = function( event ) {
          if ( event ) {
          } else {
          }
    };
    function initGallery(scope){
              // reference for main items
              var slider = $('#slider');
              // reference for thumbnail items
              var thumbnailSlider = $('#thumbnailSlider');
              //transition time in ms
              var duration = 500;
              // carousel function for main slider
              slider.owlCarousel({
                autoPlay:false,
                pagination:false,
                navigation:false,
                items : 1,
                itemsDesktop : [1199,1],
                itemsDesktopSmall : [980,1],
                itemsTablet: [768,1],
                itemsTabletSmall: false,
                itemsMobile : [479,1],
                singleItem : true
              });//.on('changed.owl.carousel', function (e) {

              $("#thumbnailSlider > .owl-wrapper-outer > .owl-wrapper > .owl-item:first").trigger( "click");
              foo();
              // carousel function for thumbnail slider
              thumbnailSlider.owlCarousel({
               autoPlay:false,
               pagination:false,
               navigation:false,
               items : 9,
                itemsDesktop : [1199,9],
                itemsDesktopSmall : [980,9],
                itemsTablet: [768,4],
                itemsTabletSmall: false,
                itemsMobile : [479,3],
                singleItem : false
              }).on('click', '.owl-item', function () {
               // On click of thumbnail items to trigger same main item
               slider.trigger('owl.goTo', [$(this).index()+1, duration, true]);
                $(".owl-item").removeClass("active");
                $(this).addClass("active");
              }).on('changed.owl.carousel', function (e) {
               // On change of thumbnail item to trigger main item
               slider.trigger('owl.goTo', [e.item.index+1, duration, true]);
                $(".owl-item").removeClass("active");
              });
              //These two are navigation for main items
              $('.slider-right').click(function() {
               slider.trigger('owl.next');
               //slider.next()
              });
              $('.slider-left').click(function() {
               slider.trigger('owl.prev');
               //slider.prev()
              });
    }//end init galleria
})();

(function() {
    angular.module('home', []).controller("inicioController", inicioController)

    function inicioController($scope, serviceProducto, $location, $http, myConfig) {
        $scope.banners = [];
        $scope.top10 = [];
        $scope.totalCartas = "000000";
        serviceProducto.getTop10(function(data) {
            $scope.top10 = data.toys || [];
        });
        $scope.irDetalleTop = function(id) {
            $location.path("/detalletopdiez/" + id);
        }
        $scope.irSeccion = function(path) {
            $location.path(path);
        }
        $scope.irCarta = function() {
            $location.path("/micarta");
        };
        $scope.openInstrucciones = function() {
            $("#modalInstrucciones").modal('show');
        }
        initFooterAnimations();
      //  animationSnow();
    }

    function initFooterAnimations() {
        $("#footerArmables").AnimationSvg({ 'spriteWidth': 700, 'spriteHeight': 100, steps: 7, 'areaWidth': 90 });
        $("#footerNinas").AnimationSvg({ 'spriteWidth': 800, 'spriteHeight': 100, steps: 8, 'areaWidth': 90 });
        $("#footerVehiculos").AnimationSvg({'spriteWidth':800,'spriteHeight':200,steps:4,'areaWidth':70})
        $("#footerNinos").AnimationSvg({ 'spriteWidth': 960, 'spriteHeight': 100, steps: 8, 'areaWidth': 90 });
        $("#footerBebes").AnimationSvg({ 'spriteWidth': 700, 'spriteHeight': 100, steps: 7, 'areaWidth': 90 });
        $("#footerVideoJuegos").AnimationSvg({ 'spriteWidth': 800, 'spriteHeight': 100, steps: 8, 'areaWidth': 90 });
    };

    function animationSnow() {
        var nsnow = 4;
        var count = 0;
        var _swith = 0;
        var inter = setInterval(mySnow, 1600);
        var increment1 = 0;
        var increment2 = 0;

        function mySnow() {
            increment1 = getRandomInt(240, 310);
            increment2 = getRandomInt(380, 430);
            for (var i = 0; i < nsnow; i++) {
                $("#container_principal").append("<div class='snow" + getRandomInt(1, 3) + "' style='left:" + getRandomInt(0, nsnow) * (_swith === 0 ? increment1 : increment2) + "px'>*</div>");

            }
            _swith = (_swith === 0) ? 1 : 0;

            count++;
            if (count >= 4) {
                limpia();

            }
        }

        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
        }


        function limpia() {
            clearInterval(inter);
        }
    }


})();

(function(){
    angular.module('factorys',[]).factory('JsonCategorias',categorias)
    .factory('home',home)
    .factory('storePedidos',storePedidos)
    .factory('blackList',blackList);
    function storePedidos(){
        var pedidos = [];
        return {
            setPedido:function(producto){
                pedidos.push(producto);
            },
            getPedido:function(index){
                return pedidos[index];
            },
            getPedidos:function(){
                return pedidos;
            },
            setPedidos:function(productos){
                pedidos = [];
                pedidos = productos;
            },
            deletePedido:function(index){
                pedidos.splice(index,1);
            },
            getTotal:function(){
                return pedidos.length;
            }
        };
    };
    function home(){
        var home = [];
        var sliderHome=[];
        var marcasPopulares=[];
        return {
            setSliderHome:function(p){
              sliderHome = p;
            },
            getSliderHome:function(){
                return sliderHome;
            },
            getHome:function(){
              return home;
            },
            getTop10:function(){
               if( home.length > 0 ){
                  return home[ 0 ];
               }else{
                  return [];
               }
            },
            setHome:function(arr){
                home = arr;
            },
            getMarcasPopulares:function(){
                return marcasPopulares;
            },
            setMarcasPopulares:function(val){
              marcasPopulares =  val;
            }
       };
    };
    function categorias(){
       var categorias =[];
       var bannersCategorias=[];
       return {
           setCategorias:function( val ){
              categorias =  val;
           },
           getCategorias:function(){
              return categorias;
           },
           getTotal:function(){
              return categorias.length;
           },
           setBannersCategorias:function(datos){
              bannersCategorias = datos;
           },
           getBannersCategorias:function(){
               return bannersCategorias;
           }
        }
    };
    function blackList(){
      var list = [];
      return{
        get:function(){
          return list;
        },
        set:function(l){
          list = l;
        }
      }
    }
})();

(function() {
    angular.module('paths', []).constant('myConfig', {
        pathHost: "https://www.liverpool.com.mx",
        pathJsonLocal: "data2019/",
        jsonCategorias: "data2019/categories/menu/categoriesLMJ.json",
        jsonHomeSlider: "data2019/home/sliders.json",
        jsonSliderCategorias: "data2019/banners/bannersCategorias.json",
        pathHome: "data2019/home/testHome.json",
        pathHomeJSON: "data2019/home/Home.json",
        jsonSliderMarcas: "data2019/marcas/marcas.json",
        pathPdp: "",
      //  pathSendCarts: "https://us-central1-lamejorjugueteriaqa.cloudfunctions.net/CreateCard/",
        pathSendCarts: "https://us-central1-lamejorjugueteriaqa.cloudfunctions.net/eccard/",
        pathBlackList: "data2019/home/blackList.json"
    });
})();

/*servicios que controlan todo el funcionamiento del la aplicacion y conexiones ajax*/
(function() {
    angular.module('services', ['factorys'])
        .service('typeHead', buscadorComplete)
        .service('serviceProducto', producto)
        .service('serviceStorePedidos', serviceStorePedidos)
        .service('serviceModel', serviceModel)
        .service('serviceBlackList', serviceBlackList);
    /*servicio encargado del modelado de datos*/
    function serviceModel() {
        return {
            producto: function() {
                return {
                    id: "0",
                    idOriginal: "0",
                    description: "",
                    imageBg: "",
                    imageSm: "",
                    longDescription: "",
                    images: [],
                    isFavorite: 0
                };
            }
        }
    }
    /*servicio para optener y filtrar palabras no deseadas*/
    function serviceBlackList($http, blackList, myConfig) {
        var init = function(fn) {
            var list = blackList.get();
            if (list.length <= 0) {
          $http.get(myConfig.pathBlackList).then(function(data) {
                    blackList.set(data.data.wordsBlackList);
                    fn(data.data.wordsBlackList)
                }, function(fail) {
                    console.log("fail to load blacklist");
                });
            } else {
                fn(blackList.get());
            }
        }
        return {
            init: function(fn) {
                init(fn);
            },
            find: function(word) {
                var isfind = false;
                var splitWord = word.split(" ");
                angular.forEach(blackList.get(), function(val, key) {
                    var matches = val.data.label.match(new RegExp(word, "gi"));
                    if (matches != null) {
                        isfind = true;
                    }
                    if (splitWord.length > 1) {
                        splitWord.forEach(function(val2) {
                            var matches2 = val2.match(new RegExp(val, "gi"));
                            if (matches2 != null) {
                                isfind = true;
                            }
                        });
                    }
                });
                return isfind;
            }
        }
    }
    /*servicio de autocomplete de buscador componenete inpuBuscar*/
    function buscadorComplete($http, $log, myConfig, serviceBlackList) {
        var mostrar = false;
        var resultado = [];
        var objResultado = function() {
            var obj = { descripcion: "", totales: "", descripcionClean: "", linkDescription: "", contentPath: "/shop", image: "" };
            return obj;
        };
        var filterCoincidence = function(search, response) {
            var change = response;
            var matches = change.match(new RegExp(search, "gi"));
            var newVal = change;
            if (matches != null) {
                var uniqueMatches = matches.unique() || []; /*funcion unique, personalizada en index.html para quuitar elementos similares*/
                uniqueMatches.forEach(function(val) {
                    newVal = change.replace(val, "<span class='coincidencia'>" + val + "</span>");
                });
            }
            return newVal;
        };
        return {
            //busqueda general del type head
            buscar: function(word, fn) {
                resultado = [];
                mostrar = false;
                if (word !== "" && word.length > 2) {
                    serviceBlackList.init(function(data) {
                        if (!serviceBlackList.find(word)) {
                      /*  $http({url: "https://us-central1-lamejorjugueteriaqa.cloudfunctions.net/dataLMJ2019/typeahead/"+word})*/
                        var url = myConfig.pathServiceSearch+word;
                          $http.get(url).then(function(data) {
                                        var contents = data.data;
                                            if (word !== "") {
                                                var responseValues = contents.results;
                                                if (responseValues.length > 0) {
                                                    const result = contents.results.filter(item => item.showView === 'PDP');
                                                    (result.length > 0) ? mostrar = true : mostrar = false;
                                                        resultado = [];
                                                        result.forEach(function(val) {
                                                            var obj = objResultado();

                                                            var tempLabel = val.label;
                                                            obj.id = val.productId;
                                                            obj.sku = val.label;
                                                            obj.image = val.image;
                                                            obj.descripcionClean = tempLabel;
                                                            obj.descripcion = filterCoincidence(word, tempLabel);
                                                            obj.totales = val.count;
                                                            resultado.push(obj);
                                                        });
                                                        if (fn)
                                                        fn();
                                                    }
                                              }
                                    }, function(fail) {

                                    });
                        } else {
                            resultado = [];
                            mostrar = false;
                        }
                    });
                } else {
                    mostrar = false;
                }
            },
            setMostrar: function(value) {
                mostrar = value;
            },
            getMostrar: function() {
                return mostrar;
            },
            getResultado: function() {
                return resultado;
            }
        }
    };

    function producto($http, myConfig, JsonCategorias, home, serviceModel, serviceBlackList) {
        function proccessPlp(info, data, fn) {
            // var contents = data.data.contents[0].mainContent[3].contents[0];
            // var respuesta = contents.records || [];
            // var totalPages = Math.ceil(contents.totalNumRecs / contents.recsPerPage);
            // var totalR = contents.totalNumRecs;
            resultado = data.map(function(val) {
                var producto = serviceModel.producto();
                producto.id = val.productId;
                producto.idOriginal = val.skuRepositoryId;
                producto.description = val.productDisplayName;
                producto.longDescription = val.hasOwnProperty("productDescription") ? val["productDescription"] != null ? val["productDescription"][0] : "" : "";
                producto.imageBg = val.xlImage;
                producto.imageSm = val.smImage;
                return producto;
            });
            info.totalPages = info.totalPages;
            info.success = true;
            info.code = 1;
            info.data = resultado;
            info.totalR = info.totalR;
            if (fn) {
                fn(info);
            };
        };

        function filtroDescripcion(obj) {
            var descripcion = {
                defaults: "product.longDescription",
                second: "product.dynamicAttribute"
            };
            var atributos = "";
            if (obj.hasOwnProperty(descripcion.defaults)) {
                atributos = obj[descripcion.defaults][0]
                return atributos;
            } else if (obj.hasOwnProperty(descripcion.second)) {
                var atributo = obj[descripcion.second] || [];
                if (atributo.length > 0) {
                    atributo.forEach(function(val) {
                        var aux = val;
                        aux = aux.split("|");

                        if (aux.length === 3) {
                            atributos += "<p>" + aux[1] + ": " + aux[2] + "</p>";
                        } else {
                            atributos += "<p>" + aux[1] + "</p>";
                        }
                    });
                    return atributos;
                };

            } else {
                return atributos;
            }
        }

        function getCategoria(categoryId, fn) {
            var categorias = JsonCategorias.getCategorias() || [];

            if (categorias.length === 0) {
                $http.get(myConfig.jsonCategorias).then(function(data) {

                    categorias = data.data.categories.category;
                   
                    JsonCategorias.setCategorias(categorias);
                    getSubCategoria(categorias, categoryId, fn);
                }, function(data) {
                    console.log("error al cargar " + myConfig.jsonCategorias);
                });
            } else {
                categorias = JsonCategorias.getCategorias();
                getSubCategoria(categorias, categoryId, fn);
            }
        };
        //funcion para optener la subcategoria
        function getSubCategoria(categorias, categoryId, fn) { /*funcion para optener el path >JSON de una categoria selccionada*/
            var pathSubcategoria = "";
            var validationCat = true;
            var info = { success: false, data: [] };
            categorias.forEach(function(val) {
                if (val.categoryid === categoryId) {
                    pathSubcategoria = val.subCategories;
                }
            })
            if (pathSubcategoria !== "") {
                $http.get(pathSubcategoria).then(
                    function(data) {
                        var principal = data.data["principal-banner"];
                        var respuesta = (data.data.categories) ? data.data.categories["category-main"] || [] : '';
                        var newObj = [];
                        if(respuesta != '' && principal.analytics != 'radio-control' && principal.analytics != 'coleccionables'){
                          respuesta.forEach(function(val) {
                              var tmpObj = { index: "", label: "", categoryid: "", pathJson: "", navigationState: "", categoria: "", toys: [], info: {} };
                              tmpObj.index = categoryId;
                              tmpObj.categoryid = val.info.categoryid;
                              tmpObj.label = val.info.label;
                              tmpObj.info = val.info;
                              var toys = val.toys;
                              tmpObj.toys = toys.map(function(val) {
                                  var producto = serviceModel.producto();
                                  producto.id = val.id;
                                  producto.idOriginal = val.id;
                                  producto.description = val.description;
                                  producto.imageBg = val.image;
                                  producto.imageSm = val.image;
                                  producto.longDescription = val.longDescription;
                                  return producto;
                              });

                              tmpObj.navigationState = val.info.navigationState;

                              newObj.push(tmpObj);
                          });
                        }
                          info.success = true;
                          info.data = { principal: principal, subcategorias: newObj };
                        if (fn) {
                            fn(info);
                        }
                    },
                    function(data) {
                        if (fn) {
                            fn(info);
                        }
                    }
                );
            } else {
                if (fn) {
                    fn(info);
                }
            }
        };
        return {
            /*optiene el top 10 de productos para mostrarlos en el slider principal del home*/
            getTop10: function(fn) {
                var h = home.getHome();
                if (h.length <= 0) {
                    $http.get(myConfig.pathHomeJSON).then(
                        function(data) {
                            var dataAux = data.data.categories["category-main"] || [];
                            var dataTemp = [];
                            dataAux.forEach(function(valTemp) {
                                var toys = valTemp.toys || [];
                                valTemp.toys = toys.map(function(valToy) {
                                    var producto = serviceModel.producto();
                                    producto.id = valToy.id,
                                        producto.idOriginal = valToy.idOriginal,
                                        producto.description = valToy.description,
                                        producto.imageBg = valToy.image,
                                        producto.imageSm = valToy.image,
                                        producto.longDescription = valToy.longDescription;
                                    return producto;
                                });
                                dataTemp.push(valTemp);
                            })
                            home.setHome(dataTemp);
                            if (fn)
                                fn(home.getTop10());

                        },
                        function(fail) {
                            console.log("fallo carga " + myConfig.pathJsonLocal + "2015/home/testHome.json");
                            if (fn)
                                fn(home.getTop10());
                        });
                } else {
                    if (fn)
                        fn(home.getTop10());
                }
            },
            /*optiene un producto en especifico al mandarle el folio o id*/
            getProducto: function(productId, fn, path) {
                var r = { success: false, data: [] };
              //  var url = myConfig.pathServicePdp+productId;
                var url = "https://us-central1-lamejorjugueteriaqa.cloudfunctions.net/dataLMJ2019/pdp/"+productId;
                $http.get(url).then(function(data) {
                    if (data.data.hasOwnProperty('productInfo')) {
                        var respuesta = data.data.productInfo;
                        var producto = serviceModel.producto();
                        producto.id = respuesta.productId;
                        producto.idOriginal = respuesta.defaultSkuId;
                        producto.imageBg = respuesta.images.lg;
                        producto.imageSm = respuesta.images.sm;
                        producto.longDescription =  respuesta.longDescription;
                      //  producto.longDescription = filtroDescripcion(respuesta);
                        producto.description = respuesta.displayName;
                        if (respuesta.hasOwnProperty("images.galleryImages")) {
                            producto.images = respuesta.galleryImages;
                        }
                        r.success = true;
                        r.data = producto;
                    }
                    if (fn) {
                        fn(r);
                    }
                }, function(data) {
                    console.log('No tiene inventario');
                    if (fn) {
                        fn(r);
                    }
                });
            },
            getCategorias: function(fn) {
                var categorias = JsonCategorias.getCategorias() || [];
                var info = { success: false, data: [], code: -1 };
                if (categorias.length === 0) {
                    $http.get(myConfig.jsonCategorias).then(function(data) {
                        categorias = data.data.categories.category || [];
                        JsonCategorias.setCategorias(categorias);
                        info.success = true;
                        info.data = categorias;
                        info.code = 0;
                        if (fn)
                            fn(info)

                    }, function(data) {
                        console.log("error al cargar " + myConfig.jsonCategorias);
                        info.success = false;
                        info.data = [];
                        info.code = 1;
                        if (fn)
                            fn(info)
                    });

                } else {
                    categorias = JsonCategorias.getCategorias();
                    info.success = true;
                    info.data = categorias;
                    info.code = 0;
                    if (fn)
                        fn(info)
                }
            },
            /*optiene las categoria ejem preescolar,nino,nina etc*/
            getCategoria: function(categoryId, fn) {
                getCategoria(categoryId, fn);
            },
            /*optiene las subcategorias cuando presionen VER TODO*/
            /*se implementa en el controlador subcategoria*/
            getSubCategoria: function(categoryId, categoryIdSub, page, fn) {
                var info = { success: false, code: -1, data: {}, totalPages: 1 };
                getCategoria(categoryId, function(data) {
                    if (data.data.hasOwnProperty("subcategorias")) {
                        var _subcategorias = data.data.subcategorias || [];
                        var principal = data.data.principal;
                        if(_subcategorias != ''){
                          _subcategorias.forEach(function(val) {
                              if (val.categoryid === categoryIdSub) {
                                  info.success = true;
                                  info.code = 1;
                                  info.data = { principal: val.info, subcategorias: [] };
                              }
                          });
                        }else if(_subcategorias.length >= 0 && principal){
                            info.success = true;
                            info.code = 1;
                            info.data = { principal: principal };
                        }
                    }
                    if (fn) {
                        fn(info);
                    }
                });
            },
            /*funcion para traer las subcategorias pero desde el servicio de liverpool para la seccion de subcateg*/
            getSubSubCategoria: function(navigationState, page, fn) {

                var info = { success: false, data: [], code: -1, totalPages: 1 };
                var findsimbol = navigationState.indexOf("?");
                var concat = "?";
                if (findsimbol >= 0) {
                    concat = "&";
                }
          var pathSubCategoria = "https://us-central1-lamejorjugueteriaqa.cloudfunctions.net/dataLMJ2019/plpCategory/"+ navigationState;
           var pathServiceSubCategoriaPLP = "https://us-central1-lamejorjugueteriaqa.cloudfunctions.net/dataLMJ2019/plpPagination/"+ navigationState;
                var newObj = [];
                if("cat940612" === navigationState || "cat1161024" === navigationState || "cat5030010" === navigationState){
                  $http.get(pathServiceSubCategoriaPLP).then(function(data) {
                      if (data.data.hasOwnProperty('plpResults')) {
                        var respuesta = data.data.plpResults.records;
                        
                        var totalPages = Math.ceil(data.data.plpResults.plpState.totalNumRecs / data.data.plpResults.plpState.recsPerPage);
                        newObj = respuesta.map(function(val) {
                            var obj = serviceModel.producto();
                            obj.id = val.skuRepositoryId;
                            obj.idOriginal = val.skuRepositoryId;
                            obj.description = val.productDisplayName
                            obj.imageBg = val.xlImage;
                            obj.imageSm = val.smImage;
                            return obj;
                        });
                        info.success = true;
                        info.data = newObj;
                        info.code = 0;
                        info.totalPages = totalPages;
                      }
                      if (fn) {
                          fn(info);
                      }
                  }, function(data) {
                      if (fn) {
                          fn(info);
                      }
                      console.log("error al cargar " + pathSubCategoria);
                  });
                  return;
                }
                $http.get(pathSubCategoria).then(function(data) {
                    if (data.data.hasOwnProperty('plpResults')) {
                        var respuesta = data.data.plpResults.records;
                        var totalPages = Math.ceil(data.data.plpResults.plpState.totalNumRecs / data.data.plpResults.plpState.recsPerPage);
                        newObj = respuesta.map(function(val) {
                            var obj = serviceModel.producto();
                            obj.id = val.productId;
                            obj.idOriginal = val.skuRepositoryId;
                            obj.description = val.productDisplayName
                            obj.imageBg = val.xlImage;
                            obj.imageSm = val.smImage;
                            return obj;
                        });
                        info.success = true;
                        info.data = newObj;
                        info.code = 0;
                        info.totalPages = totalPages;
                    }
                    if (fn) {
                        fn(info);
                    }
                }, function(data) {
                    if (fn) {
                        fn(info);
                    }
                    console.log("error al cargar " + pathSubCategoria);
                });
            },
            getMarcasPopulares: function(fn) {
                var info = { success: false, code: -1, data: [] };
                var marcas = home.getMarcasPopulares();
                if (marcas.length === 0) {
                    $http.get(myConfig.jsonSliderMarcas).then(function(data) {
                        marcas = data.data.marcas;
                        home.setMarcasPopulares(marcas);
                        info.success = true;
                        info.code = 1;
                        info.data = marcas;
                        if (fn)
                            fn(info);

                    }, function(fail) {

                    });
                } else {
                    info.success = true;
                    info.code = 1;
                    info.data = marcas;
                    if (fn)
                        fn(info);
                }
            },
            getResultadosBusqueda: function(paginator, word, fn) {
                var info = { success: false, data: [], totalR: 0, code: -1, totalPages: 1 };
                var resultado = [];
                word = word.replace(" ", "-");
              //  var path = myConfig.pathServicePlp + "page-number=" + paginator + "&search-string=" + word + "&number-of-items-per-page=15"
              var path = "https://us-central1-lamejorjugueteriaqa.cloudfunctions.net/dataLMJ2019/plpSearch/"+paginator+"/"+word+"/"+50;
                if (word === 'lego') {
                    path = "https://us-central1-lamejorjugueteriaqa.cloudfunctions.net/dataLMJ2019/plpSearch/"+2+"/lego/"+50;
                }else if(word === 'fisher price' || word === 'fisher-price' || word === 'fisher'){
                    path = "https://us-central1-lamejorjugueteriaqa.cloudfunctions.net/dataLMJ2019/plpSearch/"+2+"/fisher%20price/"+50;
                }
                if (Number.isInteger(paginator)) {
                    if (parseInt(paginator) >= 1) {
                        serviceBlackList.init(function(data) {
                            if (!serviceBlackList.find(word)) {

                                $http.get(path).then(function(data) {
                                    var _data = data.data.plpResults.records;
                                    info.totalR = _data.length;
                                    proccessPlp(info, _data, fn)
                                    /*veriricar si el resultado es un BLP para modificar la ruta y volver hacer la petición
                                     if (_data.hasOwnProperty("endeca:redirect")) {
                                         var redirect = _data["endeca:redirect"];
                                         if (redirect.hasOwnProperty("link")) {
                                             path = myConfig.pathHost + redirect.link.url + "/page-" + paginator + "/?showPLP&" + myConfig.formatJson;
                                             $http.get(path).then(function(data) {
                                                proccessPlp(info, data, fn);
                                             }, function(fail) {
                                                 if (fn) {
                                                     fn(info);
                                                 };
                                             });
                                         }
                                     } else {
                                       //  proccessPlp(info, data, fn)
                                     } */

                                }, function(fail) {
                                    if (fn) {
                                        fn(info);
                                    };
                                });

                            } else {
                                info.success = true;
                                fn(info);
                            }
                        });
                    }; //end parseint
                }; //end number
            },
            reduceString: function(dataSet, lon) {
                var limit = lon - 1;
                angular.forEach(dataSet, function(element, index) {
                    element.description = element.description.length >= lon ? element.description.substr(0, limit).concat("... ") : element.description;
                });
                return dataSet;
            },
            getSliderHome: function(fn) {
                var banners = home.getSliderHome();
                var info = { success: false, data: [], code: -1 };
                if (banners.length <= 0) {
                    $http.get(myConfig.jsonHomeSlider).then(function(data) {
                        var tempBanners = data.data.categories["category-main"];
                        banners = tempBanners;
                        home.setSliderHome(banners);
                        info.success = true;
                        info.data = banners;
                        info.code = 0;
                        if (fn)
                            fn(info);
                    }, function(data) {
                        console.log(data);
                    });
                } else {
                    info.success = true;
                    info.data = banners;
                    info.code = 0;
                    if (fn)
                        fn(info);
                }
            },
            getBannerSliderCategoria: function(categoria, index, fn) {
                var banners = JsonCategorias.getBannersCategorias() || [];
                var info = { success: false, data: [], code: -1 };
                if (banners.length === 0) {
                    $http.get(myConfig.jsonSliderCategorias).then(function(data) {
                        var resultado = data.data;
                        JsonCategorias.setBannersCategorias(resultado);
                        info.success = true;
                        info.data = resultado[index];
                        info.code = 0;
                        if (fn) {
                            fn(info);
                        }
                    }, function(data) {});
                } else {
                    info.success = true;
                    info.data = banners[index];
                    info.code = 0;
                    if (fn) {
                        fn(info);
                    }
                }
            }
        }
    };
    /* almacenamiento en localstorage cuando presionene quiero este juguete */
    function serviceStorePedidos($rootScope, storePedidos, serviceModel, $http, myConfig) {
        if (!localStorage.hasOwnProperty('pedidos')) {
            localStorage.pedidos = "";
        } else {
            var productos = localStorage.pedidos !== "" ? JSON.parse(localStorage.pedidos) : [];
            storePedidos.setPedidos(productos);
        }

        function validarEmail(email) {
            var expr = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/igm;
            if (!expr.test(email))
                return false
            else
                return true
        }
        return {
            setPedido: function(pedido) {
                var pedidos = storePedidos.getPedidos() || [];
                var existe = false;
                var guardado = false;
                pedidos.forEach(function(val) {
                    if (val.idOriginal === pedido.idOriginal) {
                        existe = true;
                    }
                });
                if (!existe) {
                    var producto = serviceModel.producto();
                    producto.id = pedido.id;
                    producto.idOriginal = pedido.idOriginal;
                    producto.imageBg = pedido.imageBg;
                    producto.description = pedido.description;
                    producto.longDescription = pedido.longDescription;
                    producto.isFavorite = 0;
                    storePedidos.setPedido(producto);
                    guardado = true;
                    localStorage.pedidos = JSON.stringify(storePedidos.getPedidos());
                    $rootScope.totalPedidos = storePedidos.getTotal();
                }
                return guardado;
            },
            getPedido: function() {},
            getPedidos: function() {
                return storePedidos.getPedidos();
            },
            deletePedido: function(index) {
                storePedidos.deletePedido(index);
                localStorage.pedidos = JSON.stringify(storePedidos.getPedidos());
                $rootScope.totalPedidos = storePedidos.getTotal();
            },
            deleteAllPedidos: function() {
                localStorage.pedidos = "";
                storePedidos.setPedidos([]);
                $rootScope.totalPedidos = storePedidos.getTotal();
            },
            enviarPedido: function(data, fn) {
                var info = { success: true, code: 0, data: [] };
                var sendCarta = {
                    "carta": "",
                    "dirTutor": "",
                    "emailNino": "",
                    "emailTutor": "",
                    "idFrame": "9",
                    "listId": "",
                    "nombreNino": "",
                    "nombreTutor": "",
                    "telTutor": ""
                };
                var newPedidos = [];
                var pedidos = storePedidos.getPedidos() || [];
                if (storePedidos.getTotal() === 0) {
                    info.code = -2; // -2 =  no hay juguetes agregados
                    if (fn)
                        fn(info);
                } else
                if (!validarEmail(data.email) || data.nombre === "" || data.mensaje === "") {
                    info.code = -1; //-1 si hay juguetes pero hay campos invalidos
                    if (fn)
                        fn(info);
                } else {
                    sendCarta.carta = data.mensaje;
                    sendCarta.emailTutor = data.email;
                    sendCarta.nombreNino = data.nombre;
                    pedidos.forEach(function(val) {
                        var ids=val.idOriginal;
                        if(ids.length > 4){
                            newPedidos.push(val.idOriginal);
                        }
                    });
                    sendCarta.listId = newPedidos;
                    console.log(sendCarta);
                    $http({
                        method: "POST",
                        url: myConfig.pathSendCarts,
                        data: sendCarta
                    }).then(function(data) {
                        info.success = true;
                        info.code = 1;
                        info.data = data;
                        if (fn)
                            fn(info)
                    }, function(data) {
                        localStorage.pedidos = "";
                        storePedidos.setPedidos([]);
                        $rootScope.totalPedidos = storePedidos.getTotal();
                        window.location.replace("/");
                        info.code = -3;
                        info.data = data;
                        if (fn)
                            fn(info)
                    });
                }
            },
            getTotalPedidos: function() {
                return storePedidos.getTotal();
            }
        }
    }
})();

(function() {
    angular.module('componentDialogs', []).directive('dialogs', linkData)
        .directive('backHistory', linkData2)
        .directive('agregarPedidos', agregarPedido)
        .directive('lazyLoad', lazyLoad)
        .directive('iconCarta', iconCarta)


    function linkData($rootScope, serviceModel, $location) {
        return {
            restrict: 'AE',
            templateUrl: 'app/components/dialogs/dialogs.html',
            link: function($scope) {
                var srcvideo = "https://www.youtube.com/embed/ZsZUxDkseCU";
                $rootScope.irMicarta = function() {
                    $location.path("/micarta/");
                    $rootScope.globalProducto = serviceModel.producto();
                    $("#modalAgrego").modal('hide');
                    $("#modalAgregado").modal('hide');
                };
                $rootScope.cerrar = function() {
                    $rootScope.globalProducto = serviceModel.producto();
                    $("#modalAgrego").modal('hide');
                    $("#modalAgregado").modal('hide');
                };
                $rootScope.agregarMas = function() {

                    $rootScope.globalProducto = serviceModel.producto();
                    $("#modalAgrego").modal('hide');
                    $("#modalAgregado").modal('hide');

                };
                $rootScope.regresemosHome = function() {
                    $location.path("/");
                };
                $("#modalInstrucciones").on('hide.bs.modal', function() {
                    $("#videoinstrucciones").attr('src', '');
                });
                $("#modalInstrucciones").on('show.bs.modal', function() {
                    $("#videoinstrucciones").attr('src', srcvideo);
                });
                function initMenu(){
                    $("#carta").AnimationSvg({'spriteWidth':800,'spriteHeight':200,steps:7,'areaWidth':65});
                }
                initMenu();
            }
        };
    };

    function linkData2($window) {
        return {
            restrict: 'AE',
            template: '<div  class="back"><a href ng-click="regresar();"  class="btn-regresar-page"><span class="icon-regresar format-icon-regresar"> </span>Regresar </a></div>',
            link: function($scope) {
                $scope.regresar = function() {
                    $window.history.back();
                }
            }
        };
    };

    function agregarPedido($rootScope, serviceStorePedidos) {
        return {
            restrict: 'AE',
            template: '<button type="button" class="btn-agregar-pedido btn-rosa" analytics-on="click" analytics-event="Agregar-juguete" analytics-label="{{producto.id}}" ng-click="agregarPedido()">Quiero agregar este juguete</button>',
            scope: {
                producto: '=',
            },
            link: function($scope) {
                $scope.agregarPedido = function() {
                    var agregado = serviceStorePedidos.setPedido($scope.producto);
                    $rootScope.globalProducto = $scope.producto;
                    if (agregado) {
                        $('#modalAgrego').modal('show');
                            } else {
                        $('#modalAgregado').modal('show');
                    }
                };

            }

        };
    }

    function lazyLoad() {
        return {
            restrict: 'A',
            link: function(scope, element, attributes) {

                var win = $(window);
                var offset = $(element).offset();
                var onProccess = false;

                logic(onProccess);
                win.scroll(function() {
                    logic();
                });
                win.resize(function() {
                    onProccess = false;
                    offset = $(element).offset();
                    logic();
                });

                function logic() {
                    if (!onProccess) {
                        var win = $(window);
                        var offset = $(element).offset();
                        var offsetel = Math.ceil((offset.top) - win.scrollTop());
                        var height = win.height();
                        var offsetwin = Math.ceil(height - (height / 3.5));
                        if (offsetel >= 0 && offsetel <= offsetwin) {
                            onProccess = true;
                            if(attributes['lazySrc']!=undefined){
                                loadImage(attributes['lazySrc'], function(data) {
                                    if (data.success) {

                                        element.attr('src', data.data.src);
                                        element.removeAttr('lazy-src');
                                        element.siblings(".loader_generic").remove();
                                        if (attributes.hasOwnProperty("lazyClass")) {
                                            element.addClass(attributes["lazyClass"]);
                                        }

                                    }
                                });
                            }
                        }
                    } //end onProcess
                };

            }
        }

        function loadImage(src, fn) {

            var img = new Image();
            img.onerror = function() {
                fn({ success: false, data: null })
            };
            img.onload = function() {
                fn({ success: true, data: img })
            };
            img.src = src;
        }

        function removeLoader(element) {
            var elemento = element.find('.loader_generic');
            if (elemento.length > 0)
                elemento.remove();
        }

        function scrollAction() {

        }
    }

    function iconCarta($rootScope, serviceStorePedidos, $location) {
        return {
            restrict: 'AE',
            templateUrl: 'app/components/dialogs/iconcart.html',
            link: function($scope, elem, attrs) {

                $(elem).show();
              //  $scope.flagHideIcon = false;
                $scope.cartas = $rootScope.totalPedidos < 10 ? "0" + $rootScope.totalPedidos : $rootScope.totalPedidos;
                var win = $(window);
               var screenDeviceMobile = (win[0].screen.width < 992) ? true : false;
                $(elem).hide();
                $rootScope.$watch('totalPedidos', function(newValue, oldValue) {
                    $scope.cartas = $rootScope.totalPedidos < 10 ? "0" + $rootScope.totalPedidos : $rootScope.totalPedidos;
                });

                var isShow = false;

                if(screenDeviceMobile){
                  $(elem).show();
                }else{
                  var toplimit = 320;
                }

                var locat = $location.path();
                locat = $location.path();

                if (locat.indexOf("detal") > -1) {
                  //  toplimit = 0;
                    $(elem).show();
                }
                $rootScope.$on('$locationChangeSuccess', function(event, next, current) {
                    $(elem).show();
                    locat = $location.path();
                    if (locat.indexOf("detal") > -1) {
                      //  toplimit = 0;
                        $(elem).show();
                    }else if(locat.indexOf("micarta") > -1){
                       isShow = false;
                       $(elem).hide();
                    }
                });
                locat = $location.path();

                if (locat.indexOf("detal") > -1) {
                  //  toplimit = 0;
                    $(elem).show();
                }
                win.scroll(function() {
                  isShow = false;
                  var _top = win.scrollTop();
                    if (_top > toplimit && !screenDeviceMobile) {
                      isShow = true;
                      if ($(elem).attr("class") === 'icon_carta') {
                            $(elem).show();
                          }
                    }else if((_top < toplimit || _top == 0) && !screenDeviceMobile){
                      isShow = false;
                      $(elem).hide();
                    }else if(_top < toplimit  && screenDeviceMobile){
                      isShow = false;
                      $(elem).hide();
                    }
                });


            }
        }
    }
})();

(function(){
       angular.module('componentInputBuscar',[]).directive('inputBuscar',linkData);
        function linkData($location,$timeout,typeHead){
         return {
             restrict:'AE',
             templateUrl: 'app/components/inputBuscar/inputBuscar.html',
             controller: function ($scope,typeHead,$log,$location) {
                 var word = "";
                 var iv = this;
                 var irResultados = function(txt){
                     if(txt !="")
                        $location.path("/busquedatype/1/"+txt);
                 };
                 $scope.inputBuscar ="";
                 iv.typeahead = typeHead;
                 $scope.resultados =[];
                 $scope.buscar =function (event,w){
                     if(event.keyCode !==40 && event.keyCode !==38){
                        $scope.resultados = [];
                        word = w;
                        iv.typeahead.setMostrar(false);
                        iv.typeahead.buscar(word,function(){
                            if(word!==""){
                                $scope.resultados = iv.typeahead.getResultado() || [];
                                iv.typeahead.setMostrar(true)
                            }

                        });
                     }
                 };
                 $scope.mostrar = function(){

                    return iv.typeahead.getMostrar();
                 };
                 $scope.blur = function(){
                     $timeout(function(){
                        iv.typeahead.setMostrar(false);
                     },250);
                 };
                 $scope.$on('$locationChangeStart', function(event) {
                    $scope.inputBuscar = "";
                 });
                 $scope.irAresultadoKey =function(event){
                     /*al presionar enter*/
                    if( event.keyCode === 13){
                       irResultados($scope.inputBuscar);
                    }
                 }
                 /*al presionar buscar*/
                 $scope.irAresultado=function(){
                  // console.log($scope.inpuBuscar);
                    irResultados($scope.inputBuscar);

                 }
                 /*al presionar cualquier resultado*/
                 $scope.irAresultadoOpcion = function(busqueda){
                        irResultados(busqueda);
                 }
                 $scope.cerrarMenu = function(){
                    $scope.resultados = [];
                    iv.typeahead.setMostrar(false);
                    $scope.inputBuscar = "";
                 }

             }
        };
    };

})();

(function(){
       angular.module('componentMenuCategorias',[]).directive('menuCategorias',linkData)
       .directive("etiquetaCategoria",linkData2)
       .directive("optionAnimate",optionAnimate)
       .directive('menuCategoriasMobil',linkData4)
       .directive("bannerCategoria",linkData5);
        function linkData($rootScope,$location,serviceProducto,$routeParams){/*menu categoria*/
         return {
             restrict:'AE',
             templateUrl: 'app/components/menuCategorias/menuCategorias.html',
             scope:{
                isWeb:"="
             },
             link: function (scope, elem, attrs) {
                var offset = $(elem).parent().offset();
                var win = $( window ),lastStateScroll = 0,up =0;;
                scope.rutaActual = $location.path();
                scope.menuCategorias = [];
                $rootScope.$on('$locationChangeSuccess', function(event, next, current) {
                    scope.rutaActual = $location.path();
                });
                win.scroll( scrollAction );
                function showWhenScrollUp( win,limit ){
                    var stateScroll = win.scrollTop();

                    if( lastStateScroll < stateScroll ){/*si es menor significa que el scroll ba hacia abajo*/
                        elem.css("position","relative");/*si el scroll va hacia abajo regresamos el elemento a su posicion inicial*/
                        elem.show();
                        up=0;
                    }else{
                        showWhenScrollUpDown(win,limit);// cuando el scroll va hacia arriba ejectamos la funcion
                    }
                    lastStateScroll = stateScroll;
                };
                function showWhenScrollUpDown(win,limit){//funcion que detecta cuando el scroll va hacia abajo cambia la posicion a fixed si paso el limite del scroll establecido
                    if( win.scrollTop() >limit ){
                        if(up===10){
                            elem.css("position","fixed");
                            elem.hide();
                            elem.fadeIn();
                        }
                        up +=1;
                    }else{
                        up=0;
                        elem.show();
                        elem.css("position","relative");
                    }
                };
                function scrollAction(){
                    offset = $(elem).parent().offset();
                    showWhenScrollUp( win, offset.top );
                };//end scrollAction
                function initMenu(){
                    $("#armables").AnimationSvg({'spriteWidth':700,'spriteHeight':100,steps:7,'areaWidth':65});
                    $("#bebes").AnimationSvg({'spriteWidth':700,'spriteHeight':100,steps:7,'areaWidth':65});
                    $("#coleccionables").AnimationSvg({'spriteWidth':800,'spriteHeight':100,steps:8,'areaWidth':65});
                    $("#disfraces").AnimationSvg({'spriteWidth':800,'spriteHeight':100,steps:8,'areaWidth':65});
                    $("#drones").AnimationSvg({'spriteWidth':800,'spriteHeight':100,steps:8,'areaWidth':65});
                    $("#exteriores").AnimationSvg({'spriteWidth':800,'spriteHeight':100,steps:8,'areaWidth':65});
                    $("#juegosdemesa").AnimationSvg({'spriteWidth':800,'spriteHeight':100,steps:8,'areaWidth':65});
                    $("#ninas").AnimationSvg({'spriteWidth':800,'spriteHeight':100,steps:8,'areaWidth':65});
                    $("#ninos").AnimationSvg({'spriteWidth':960,'spriteHeight':100,steps:8,'areaWidth':65});
                    $("#peluches").AnimationSvg({'spriteWidth':800,'spriteHeight':100,steps:8,'areaWidth':65});
                    $("#vehiculos").AnimationSvg({'spriteWidth':800,'spriteHeight':200,steps:4,'areaWidth':65});
                    $("#videojuegos").AnimationSvg({'spriteWidth':800,'spriteHeight':100,steps:8,'areaWidth':65});
                    $("#micarta").AnimationSvg({'spriteWidth':680,'spriteHeight':99,steps:7,'areaWidth':150});
                    //$("#micartaMobile").AnimationSvg({'spriteWidth':670,'spriteHeight':98,steps:7,'areaWidth':150});
                }

                serviceProducto.getCategorias(function(data){
                    scope.menuCategorias =  data.data;
                });
                scope.irA = function(direccion){
                    $location.path("/categoria/"+direccion);
                };
                scope.tutoClick = function(){
                };
                initMenu();
             }
        };
    };
    function linkData2(serviceProducto){/*banner categoria*/
        return {
            restrict:'E',
            templateUrl:'app/components/menuCategorias/etiquetaCategoria.html',
            replace:true,
            scope:{
                categoria:"=",
              //  pictureWeb:"@",
                index:"@",
                label:"@",
                fondo:"@",
                width:"=",
                height:"=",
                information:"="
            },
            link:function( $scope, elem, attrs){
                $scope.data = {};
                $scope.$watch('categoria',function(old, news){
                    if(old != "" && old!=undefined){
                        serviceProducto.getBannerSliderCategoria( "categoria", $scope.categoria, function( data ){
                            resizeEtiqueta( data );
                        });
                    };
                });
                $scope.$watch('information',function(old,news){
                    if( old!=undefined )
                        resizeEtiqueta( old );
                });
                function resizeEtiqueta(data,_width){

                    windowsWidth = $( window ).width();
                    var _data = data.data;
                    var label =  ($scope.label === undefined || $scope.label === "") ? _data.label : _data.label;
                    $(".etiqueta > .texto").html(label);
                    var width = $(".etiqueta > .texto").outerWidth();
                    var height =25+$(".etiqueta > .texto").outerHeight();
                    if( windowsWidth <= 481 || windowsWidth < 350){
                        $(".etiqueta > .texto").css("font-size","1em");
                        width = $(".etiqueta > .texto").outerWidth();

                        if( width >=380 || width >= 280 ){/*in case of text is biger that device*/
                            $(".etiqueta > .texto").css("top","20px");
                            width = 240;
                            $(".etiqueta > .texto").css("width",width+"px");
                            height =25+$(".etiqueta > .texto").outerHeight();
                        }else{
                              if("Construcción y Armables" === data.data.label){
                                  height +=25;
                              }else {
                                height +=1;
                              }

                        }
                    }
                    if( windowsWidth <= 1024 ){
                        $(".etiqueta > .texto").css("font-size","2.2em");
                        width = $(".etiqueta > .texto").outerWidth();

                        if( width >=770){/*in case of text is biger that device*/
                            $(".etiqueta > .texto").css("top","20px");
                            width = 710;
                            $(".etiqueta > .texto").css("width",width+"px");
                            height =$(".etiqueta > .texto").outerHeight();
                        }
                    }
                    width = 50+width;
                    $scope.bannerWidth =  width;
                    $scope.label = label;
                    $scope.fondo = ($scope.fondo ===undefined || $scope.fondo === "") ?  $scope.fondo : '';

                    $("#svgetiqueta").attr("width",(width + 30));
                    if(_data != undefined){
                      $("#svgpoligon1").attr({"stroke":_data.color1,"points":"4,2 28,"+(height+15)+" "+(width-15)+","+(height+5)+" "+( width + 10 )+",16"});
                      $("#svgpoligon2").attr({"fill": _data.color2,"points":"4,3 28,108 189,97 212,17"});
                      $("#svgpoligon3").attr({"fill": _data.color3,"points":width+",94 "+width+",21.5 12,9 16,"+(height+8)+" "+width+","+height});
                    }
                };
                $( window ).resize(function() {
                    $scope.dimension = $( window ).width();
                    $scope.$apply();
                });
            }
        };
    };

    function optionAnimate(serviceProducto){/*banner categoria*/
        return {
            restrict:'E',
            templateUrl:'app/components/menuCategorias/optionAnimate.html',
            replace:true,
            scope:{
                categoria:"=",
                pathImgSvg:"@"
            },
            link:function( $scope, elem, attrs){
                $("#"+elem.attr("id")).AnimationSvg({'spriteWidth':800,'spriteHeight':100,steps:8,'areaWidth':65});
            }
        };
    };
        function linkData4($rootScope,$location,serviceProducto,$routeParams){/*menu categoria*/
         return {
             restrict:'AE',
             templateUrl: 'app/components/menuCategorias/menuCategoriasMobil.html',
             scope:{
                isWeb:"="
             },
             link: function (scope, elem, attrs) {

                var win = $( window ),lastStateScroll = 0;

                scope.rutaActual = $location.path();
                scope.menuCategorias = [];

                $rootScope.$on('$locationChangeStart', function(event, next, current) {
                    scope.rutaActual = $location.path();
                });


                serviceProducto.getCategorias(function(data){
                    scope.menuCategorias =  data.data;
                });
                scope.getBackground=function( urlImage ){
                    return scope.image={"background-image":"url('"+urlImage+"')"};
                }

                scope.closeMenu = function(){
                  $('#menu-categorias-mobile-content').fadeOut(0);
                }

                scope.irA = function(direccion){
                  if("exteriores" === direccion || "drones" === direccion || "coleccionables" === direccion){
                      switch (direccion) {
                        case "exteriores":
                          $location.path("/subcategoria/exteriores/catst1896485");
                          $('#menu-categorias-mobile-content').fadeOut(0);
                          break;
                          case "drones":
                            $location.path("/subcategoria/drones/catst1833807");
                            $('#menu-categorias-mobile-content').fadeOut(0);
                            break;
                            case "coleccionables":
                              $location.path("/subcategoria/coleccionables/catst1833811");
                              $('#menu-categorias-mobile-content').fadeOut(0);
                              break;
                 
                        default:

                      }

                  }else{
                    $location.path("/categoria/"+direccion);
                    $('#menu-categorias-mobile-content').fadeOut(0);
                  }

                };
                   scope.tutoClick = function(){
                        $('#menu-categorias-mobile-content').fadeOut(0);
                   };
             }
        };
    };
    function linkData5(serviceProducto){/*banner categoria*/
        return {
            restrict:'E',
            templateUrl:'app/components/menuCategorias/bannerCategoria.html',
            replace:true,
            scope:{
                categoria:"=",
                pictureWeb:"@",
                index:"@",
                fondo:"@",
                patron:"@"
            },
            link:function( $scope, elem, attrs){
                $scope.$watch('fondo',function(old, news){
                    $scope.styles = {"background-image":"url('"+$scope.patron+"')","background-color":$scope.fondo};
                });

            }
        };
    };
})();

(function(){
       angular.module('componentOwlCarucel',[]).directive('owlCaroucel',linkData)
       .directive('owlCaroucelHome',linkData2)
       .directive("owlCaroucelMarcas",linkData3);
        function linkData($http,serviceProducto,$timeout,$location){
         return {
             restrict:'AE',
             transclude:true,
             replace:true,
             templateUrl: 'app/components/owlCaroucel/owlCaroucel.html',
             scope:{
                idElement:'@',
                itemClass:"@",
                jsonPath:"@",
                elements:"=",
                items:"@",
                typeOwl:"@",//1 = service default, 2 element binding
                styleOwl:"@",
                classControls:"@",
                classOwl:"@"
             },
             link: function (scope, elem, attrs) {
                 scope.itemsD = [];
                 scope.irDetalle =function(id){
                    $location.path("/detalle/"+id);
                 }
                                                 scope.getLG= function(image){
                                    return image.replace('XL','LG');
                                }
                var render = function(){
                    var items = [];
                    var content = "";
                    var owl = $("#"+scope.idElement);
                    if( scope.typeOwl === "4" ){
                            items = scope.elements || [];
                                scope.itemsD = items;

                                    scope.$watchCollection("itemsD",function(){
                                        owl.owlCarousel({
                                            items : scope.items === undefined ? 4: scope.items,
                                            lazyLoad : true,
                                            navigation : false,
                                            pagination:true,
                                            responsive: true,
                                            singleItem:false,

                                            itemsMobile: [479,2.5],
                                            itemsTablet: [768,4],
                                            itemsDesktop:[1199,5],
                                            itemsDesktopSmall : [1024,4],
                                            baseClass : "owl-carousel owl-border-top"
                                        }); 
                                    });
                            }else if(scope.typeOwl === "5" ){
                                serviceProducto.getTop10( function( data ){
                                    items = data.toys || [];
                                    scope.itemsD = items;
                               
                                    scope.$watchCollection("itemsD",function(){
                                        owl.owlCarousel({
                                            items : scope.items === undefined ? 5: scope.items,
                                            lazyLoad : true,
                                            navigation : false,
                                            pagination: true,
                                            responsive: true,
                                            singleItem:false,
                                            itemsMobile: [479,2.5],
                                            itemsTablet: [768,4],
                                            itemsDesktop:[1199,5],
                                            itemsDesktopSmall : [1024,5],
                                            baseClass : "owl-carousel owl-border-top"
                                        }); 
                                    });
                                });
                            };
                            $("."+scope.classControls+" .next").click(function(){
                                owl.trigger('owl.next');
                            });
                            $("."+scope.classControls+" .back").click(function(){
                                owl.trigger('owl.prev');
                            });
                            $("."+scope.classControls+" .next_clp").click(function(){
                                owl.trigger('owl.next');
                            });
                            $("."+scope.classControls+" .back_clp").click(function(){
                                owl.trigger('owl.prev');
                            });
                }
                $timeout(render,0);
             }//--------end links 
        };
    };
    function linkData2($http,serviceProducto,$timeout,$location){
        var infoDirectiva ={
                    restrict:'AE',
                    transclude:true,
                    replace:true,
                    templateUrl: 'app/components/owlCaroucel/owlCaroucelHomeMobo.html',
                    scope:{
                        idElement:'@',
                        itemClass:"@",
                        jsonPath:"@",
                        elements:"=",
                        items:"@",
                        typeOwl:"@",//1 = service default, 2 element binding
                        styleOwl:"@",
                        classControls:"@",
                        classOwl:"@"
                    },
                    link: function (scope, elem, attrs) {
                        var render = function(){
                            var items = [];
                            var content = "";
                            var owl = $("#"+scope.idElement);
                            serviceProducto.getSliderHome( function( data ){                
                                items = data.data || [];
                                scope.itemsD = items;    
                                scope.$watchCollection("itemsD",function(){
                                    owl.owlCarousel({
                                        autoPlay : 3000,
                                        slideSpeed : 300,
                                        paginationSpeed : 400,
                                        singleItem:true,
                                        itemsMobile: [ 479, 2.5 ],
                                        itemsTablet: [ 768, 3.5 ],
                                        itemsDesktopSmall : [ 980, 4 ],
                                        itemsDesktop:[ 1199, 4 ],      
                                        autoHeight:false,
                                        autoPlay:true
                                    }); 
                                });   
                            });
                            $("."+scope.classControls+" .next").click(function(){
                                    owl.trigger('owl.next');
                            });
                            $("."+scope.classControls+" .back").click(function(){
                                    owl.trigger('owl.prev');
                            });
                        };//--------end links 
                        scope.irHome = function(link){
                          if( link.indexOf("http://assets")>=0 )
                              location.href=link;
                            else
                              $location.path(link);
                        }
                        $timeout(render,0);
                    }
        };
        if( navigator.userAgent.match(/Android/i) 
           || navigator.userAgent.match(/webOS/i) 
           || navigator.userAgent.match(/iPhone/i)  
           || navigator.userAgent.match(/iPod/i) 
           || navigator.userAgent.match(/BlackBerry/i) 
           || navigator.userAgent.match(/Windows Phone/i)){
               infoDirectiva.templateUrl = 'app/components/owlCaroucel/owlCaroucelHomeMobo.html';
        }else{
              infoDirectiva.templateUrl =  'app/components/owlCaroucel/owlCaroucelHome.html';
        }
        return infoDirectiva;
        //ux
                             
};
    function linkData3($timeout,serviceProducto){
        return {
            restrict:'AE',
            templateUrl:'app/components/owlCaroucel/owlCaroucelMarcas.html',
            scope:{
                idElement:'@',
                itemClass:"@",
                jsonPath:"@",
                elements:"=",
                items:"@",
                typeOwl:"@",//1 = service default, 2 element binding
                styleOwl:"@",
                classControls:"@",
                classOwl:"@"
            },
            link:function(scope, elem, attrs){
                    scope.itemsD2 = [];
                
                    var render = function(){
                        var items = []; 
                        var content = "";
                        var owl = $("#"+scope.idElement);
                        items = scope.elements || [];
                        serviceProducto.getMarcasPopulares(function(data){
                            scope.items === undefined ? 6: scope.items
                            if( data.success ){
                                scope.itemsD2 = data.data || [];
                                scope.$watchCollection("itemsD2",function(){
                                    owl.owlCarousel({
                                        items : scope.items === undefined ? 6: scope.items,
                                        lazyLoad : true,
                                        navigation : false,
                                        navigationText: [
                                                '<img src="assets/images/caroucel/flecha.svg"/>',
                                                '<img src="assets/images/caroucel/flecha.svg"/>'
                                                ],
                                        pagination: false,
                                        responsive: true,
                                        singleItem:false,
                                        itemsMobile: [320,2.5],
                                        itemsTablet: [768,3.5],
                                        itemsDesktop:[1199,6],
                                        itemsDesktopSmall : [980,
                                        6],
                                        baseClass : "owl-carousel owl-marcas-carousel"
                                    }); 
                                });   
                            }
                        }); 
                            $("."+scope.classControls+" .next").click(function(){
                                owl.trigger('owl.next');
                            });
                            $("."+scope.classControls+" .back").click(function(){
                                owl.trigger('owl.prev');
                            });

                    };
                    $timeout(render,0);
            }
        }
    }
})(); 


