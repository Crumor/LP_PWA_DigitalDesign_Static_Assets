(function(){

        //Directiva para usar la funcion de colapsar y expandir
        angular.module('moduleCategory',[])
        .controller("categoryController",categorys)
        .controller("answersController",answerController)
        .controller("resultsController",resultsController);
        function categorys($scope,$routeParams,serviceContenido,serviceMenu, InfoContenido,Menu){

                var path            = "app/modules/web/category/content/"
                var idMenu = 0;
                $scope.linkCategory = $routeParams.link;
                $scope.category     ={};
                $scope.menu         = [];
                $scope.contenido    = InfoContenido.get();
                var idPregunta = $routeParams.hasOwnProperty("idfaq") ? $routeParams.idfaq : 0;

                serviceContenido.getContenido( $scope.linkCategory, function( data ){
                  console.log('aquo compa',data.data);

                        if(data.data != null)
                                InfoContenido.set( data.data.contenido );
                                $scope.contenido = InfoContenido.get();
                                if(data.data!=null){

                                    idMenu = data.data.idMenu;
                                }
                                    serviceMenu.get( function(datamenu ){
                                        var response    = Menu.reset( idMenu );
                                        $scope.menu     = response.data;
                                        $scope.category = response.category;
                                        $scope.actualCategory =  response.actualCategory;
                                        $scope.contenidoTitulo = $scope.contenido;
                                    //    console.log(datamenu);
              

                                      //  console.log((!data.data) ? data : '');
                                        $scope.tituloSubMenu = (data.data.titulo == null) ? '' : data.data.titulo;
                                    });
                });
                $scope.active = function(path){

                        if(vista === path)
                                return true;
                        else
                                return false;
                }

        };
        function answerController($scope,$routeParams,serviceContenido,serviceMenu, InfoContenido,Menu){
                $scope.dires="app/common/directives/inpuSearch/header.html";
                var path            = "app/modules/web/category/content/"

                $scope.linkCategory    = $routeParams.link;
                $scope.category     ={};
                $scope.menu         = [];
                $scope.idMenu =0;
                $scope.contenido    = {};
                var idPregunta = $routeParams.hasOwnProperty("idfaq") ? $routeParams.idfaq : 0;

                serviceContenido.getPreguntas( $scope.linkCategory, function( data ){
                        var existId = false;
                        if(data.data != null){
                                var _contenido = data.data;
                                if( idPregunta !=0){
                                    _contenido.forEach(function( val, key){
                                        val.active = false;
                                        if( val.idPregunta === idPregunta){
                                            existId = true;
                                            val.active = true;
                                     
                                        }
                                    });
                                };

                                $scope.contenido = _contenido;
                                if( existId ){
                                    setTimeout(function() {
                                        $("html, body").scrollTop( document.getElementById("pq"+idPregunta).offsetTop );
                                        $scope.contenido = _contenido;
                                    }, 10);
                                };
                        }
                        var x={
                            "preguntas-mas-buscadas":"20001",
                            "credito":"20002",
                            "pedidos-y-devoluciones":"20003",
                            "pagos-precios-y-promociones":"20004",
                            "mesa-de-regalos":"20005",
                            "soporte-tecnico":"20006",
                            "terminos-y-condiciones":"20007",
                            "acerca-de-nosotros":"20008",
                            "seguridad-del-sitio":"20009",
                            "productos-descargables":"200011",
                            "sorteos":"200012",
                            "otros-temas":"200010",
                            "click-and-collect":"200013"
                        };
                        var idMenu=0;
                        if( x.hasOwnProperty($scope.linkCategory)){
                            idMenu = x[$scope.linkCategory];
                        }
      
                        serviceMenu.get( function( data ){
                            var response    = Menu.reset(idMenu);
                            $scope.menu     = response.data;
                            $scope.category = response.category;
                            $scope.actualCategory =  response.actualCategory;
                        });
                });

                $scope.openQuestion = function( event, obj ){
                 
                    var elemento       = $( event.currentTarget );
                    var _rootElement   = $('.level1');
                    var elementoNext = elemento.next();
                    if( !elementoNext.is( ":visible" ) ){
                        elemento.addClass("active");
                        elementoNext.slideDown();
                        elemento.find( "[class*='icon-ayuda-flecha-arriba']" ).addClass( "activar_icono" );
                    }else{
                        elemento.removeClass("active");
                        elementoNext.slideUp();
                        elemento.find( "[class*='icon-ayuda-flecha-arriba']" ).removeClass( "activar_icono" );
                    }
                }
                $scope.active = function(path){

                        if(vista === path)
                                return true;
                        else
                                return false;

                }

            };
        function resultsController($scope,$routeParams,serviceContenido,serviceMenu, InfoContenido,Menu,$location){
                var word = $routeParams.search;
                var totalResultado = 0;

                $scope.totalResults = 0;
                $scope.wordSearch = word;
                $scope.resultContenidos = [];
                $scope.resultPreguntas = [];
                $scope.menu         = [];
                $scope.category     ={};

                serviceMenu.get( function( data ){

                        var response    = Menu.reset(  $scope.idAnswer );

                        $scope.menu     = response.data;
                        $scope.category = response.category;
                        $scope.actualCategory =  response.actualCategory;
                });
                serviceContenido.searchContenidos( word, function( data ){

                    var resultadoContenidos = data.data;
                    totalResultado +=resultadoContenidos.length;
                    $scope.resultContenidos = resultadoContenidos;
                    $scope.totalResults = totalResultado;
                    serviceMenu.get(function(data){
                        angular.forEach(resultadoContenidos,function(vr){
                                var mr = Menu.reset( vr.idMenu);
                                vr.icon = mr.category.icon;
                                vr.newLink = mr.category.link+"/"+vr.link;
                        });
                    });

                });
                serviceContenido.searchPreguntas( word, function( data ){
                    var resultadoPreguntas = [];

                    resultadoPreguntas = data.data;
                    totalResultado +=resultadoPreguntas.length;
                    $scope.resultPreguntas = resultadoPreguntas;
                    $scope.totalResults = totalResultado;

                });
                $scope.link = function(url,id){
                    $location.path(url+id);
                }
        };
})();
