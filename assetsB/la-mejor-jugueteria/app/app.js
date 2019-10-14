(function(){
    angular.module('APP_JUGUETERIA',["ngRoute","ngSanitize","factorys","services"
                                     ,"paths","componentMenuCategorias","componentInputBuscar","ngSanitize",

                                    "categorias","detalle","carta","busquedas","componentOwlCarucel","componentDialogs","home","angulartics", "angulartics.google.analytics","angulartics.facebook.pixel"])
    .config(["$routeProvider","$locationProvider","$analyticsProvider","$httpProvider",configuracion])
    .run(['$rootScope', '$location', '$http', '$route',"serviceModel","serviceBlackList","serviceStorePedidos","$timeout",run]);

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
