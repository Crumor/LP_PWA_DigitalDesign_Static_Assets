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

                serviceContenido.getContenido( $scope.linkCategory, function( data ){
                        if(data.data != null)
                                InfoContenido.set( data.data.contenido );
                                $scope.contenido = InfoContenido.get();
                                if(data.data!=null){
                                    
                                    idMenu = data.data.idMenu;

                                }
                                    serviceMenu.get( function( datamenu ){
                                        var response    = Menu.reset( idMenu );
                                        $scope.menu     = response.data;
                                        $scope.category = response.category;
                                    }); 
                });
                $scope.active = function(path){

                        if(vista === path)
                                return true;
                        else
                                return false;
                }

        };
        function answerController($scope,$routeParams,serviceContenido,serviceMenu, InfoContenido,Menu,serviceStorage,serviceUpdateVisit){
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
                                            visit(val.$id,function(da){
                                                val.active = true;
                                            });
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
                            "preguntas-mas-buscadas":"10001",
                            "credito":"10002",
                            "pedidos-y-devoluciones":"10003",
                            "pagos-precios-y-promociones":"10004",
                            "mesa-de-regalos":"10005",
                            "soporte-tecnico":"10006",
                            "terminos-y-condiciones":"10007",
                            "acerca-de-nosotros":"10008",
                            "seguridad-del-sitio":"10009",
                            "productos-descargables":"100011",
                            "sorteos":"100012",
                            "otros-temas":"100010",
                            "click-and-collect":"100013"
                        };
                        var idMenu=0;
                        if( x.hasOwnProperty($scope.linkCategory)){
                            idMenu = x[$scope.linkCategory]
                        }
                        serviceMenu.get( function( data ){
                            var response    = Menu.reset(idMenu);
                            $scope.menu     = response.data;
                            $scope.category = response.category;
                            $scope.actualCategory =  response.actualCategory;
                        });
                });
                
                $scope.openQuestion = function( event, obj ){   
                    visit(obj.$id,function(){});
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
               function visit(idQuestion,fn){
                    if (serviceStorage.storageAvailable('localStorage')) {
                        var arrayVotation = localStorage.getItem('mostView');
                        var arrayData = [];
                        if(arrayVotation == null){
                            // first time to vote
                            serviceUpdateVisit.update(idQuestion,function(data){
                                if(typeof(data) === "boolean" && data){
                                    arrayData.push(String(idQuestion));
                                    localStorage.setItem('mostView',JSON.stringify(arrayData));  
                                    
                                }
                            })
                            fn(true);
                        }else{
                            // the variable that contains votes exists
                            serviceUpdateVisit.update(idQuestion,function(data){
                                if(typeof(data) === "boolean" && data){
                                    var flg = false;
                                    arrayData = JSON.parse(arrayVotation);
                                    for (var i = 0; i < arrayData.length; i++) {
                                        if(arrayData[i] != idQuestion){
                                            flg = true;
                                        }else{
                                            flg = false;
                                            break;
                                        }
                                    }
                                    if(flg){
                                        arrayData.push(String(idQuestion));
                                        localStorage.setItem('mostView',JSON.stringify(arrayData));  
                                    }

                                }
                                fn(flg);
                            });          
                        }
                    }
               }//en visit
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