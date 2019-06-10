(function(){
    angular.module("componentMenuLeft",[])
    .directive("menuLeft",menuLeft);
    function menuLeft( myconfig, $routeParams, $location, serviceMenu ){

            return {

            restrict:'E',
            templateUrl: myconfig.urlDirectives+'menuLeft/menuleft.html',
            scope:{ 
                category:'=',
                menu:'='
            },
            link: function ( $scope, element ) {

                $scope.openLevel1 = function(event,obj){

                    var _rootElement   = $( element );
                    var elemento       = $( event.currentTarget );
                    // debugger
                    _rootElement.find(".submenu").slideUp();
                    _rootElement.find( "[class*='icon-ayuda-flecha-arriba']" ).removeClass( "active" );

                    if( !elemento.next().is( ":visible" ) ){
                        elemento.next().slideDown();
                        elemento.find( "[class*='icon-ayuda-flecha-arriba']" ).addClass( "active" );
                    }

                };
                $scope.openLevel2 = function(event,obj1,obj2){
                    var elemento    = $( event.currentTarget );
                    var submenu     = $( element ).find( ".submenu .submenu" );
                    //var idExpetionAnswers = ["otros-temas","q-seguridad-del-sitio","q-acerca-de-nosotros","q-terminos-y-condiciones","soporte-tecnico","mesa-de-regalos","pagos-precios-y-promociones","pedidos-y-devoluciones","credito","preguntas-mas-buscadas"];
                    var idExpetionAnswers = ["100012","100011","100010","10001","10002","10003","10004","10005","10006","10007","10008","10009","100013"];
                    // var defaultUrl = $location.path().includes('faq') ? "/faq/"+obj1.link+"/" : "/seccion/"+obj1.link+"/";
                    var defaultUrl = "/sec/"+obj1.link+"/";
                    if( elemento.next().length ){//verificamos si tiene un submenu
                        if( !elemento.next().is( ":visible" ) ){
                            submenu.slideUp("slow");
                            elemento.next().slideDown( "slow" );
                            elemento.find( "[class*='icon-ayuda-flecha-arriba']" ).addClass( "active" );
                        }
                    }else{
                        submenu.slideUp("slow");
                        idExpetionAnswers.forEach(function(val){
                                if(val === obj2.idMenu)
                                    defaultUrl ="/faq/";


                                

                        })

                        $location.url( defaultUrl+obj2.link+"/" );

                    }

                };
                $scope.openLevel3 = function(event,obj1,obj2,obj3){

                        $location.path( "/sec/"+obj1.link+"/"+obj2.link+"/"+obj3.link );
                        
                };
            }/*en controller*/
        }
    };/*end menu*/    
})();