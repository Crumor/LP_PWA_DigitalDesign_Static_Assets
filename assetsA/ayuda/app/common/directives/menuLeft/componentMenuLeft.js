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
                $scope.openLevel2 = function(event,obj1,obj2, index){
  
                  var _rootElement   = $( element );
                    var elemento    = $( event.currentTarget );
                    var submenu     = $( element ).find( ".submenu .submenu" );
                    submenu.slideUp();
                    _rootElement.find( "[class*='icon-ayuda-flecha-arriba']" ).removeClass( "active" );
                    var idExpetionAnswers = ["200012","200011","200010","20001","20002","20003","20004","20005","20006","20007","20008","20009","200013"];
                    var defaultUrl = "/sec/"+obj1.link+"/";
                    if(obj2.subnivel.length>0){//verificamos si tiene un submenu
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
