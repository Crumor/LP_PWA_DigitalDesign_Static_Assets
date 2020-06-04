(function(){
//componente Input Search de busqueda
        angular.module("componentInputSearch",[]).
        directive("typeHead",typeHead).
        directive("footerWeb",footerWeb).
        directive("headerWeb",headerWeb);

        function typeHead( myconfig, $routeParams, $location, serviceContenido,serviceMenu, Menu ){

                return {

                        restrict:'E',
                        templateUrl: function( elem, attr ){

                                var template = {
                                        "web":"inputsearch.html",
                                        "web-category":"inputsearch-category.html",
                                        "wap":"inputsearch-wap.html",
                                        "wap-category":"inputsearch-category-wap.html"
                                };

                                return myconfig.urlDirectives+'inputSearch/'+template[attr.th];
                        },
                        link: function( $scope ){
                                $scope.resultadoContenidos = [];
                                $scope.resultadoPreguntas = [];
                                $scope.showDown = false;
                                $scope.buscar = function( $event, word ){
                                        $scope.resultadoContenidos = [];
                                        $scope.resultadoPreguntas = [];
                                        $scope.showDowncontent = false;
                                        $scope.showDownAsk = false;

                                        var keyCode = $event.keyCode || $event.which;
                                        if(word === undefined){
                                            return true;
                                        }
                                        if( word.length > 2){

                                                if( keyCode === 13 ){

                                                        $location.path("/resultados/"+word);

                                                }else{
                                                    serviceContenido.searchContenidos( word, function( data ){
                                                        var resultadoContenidos = serviceContenido.searchReduceAndFormated(data.data,word,"contenido");
                                                        serviceMenu.get(function(data){
                                                            angular.forEach(resultadoContenidos,function(vr){
                                                                    var mr = Menu.reset( vr.idMenu);
                                                                    vr.icon = mr.category.icon;
                                                                    vr.newLink = mr.category.link+"/"+vr.link;
                                                            });       
                                                        }); 
                                                        $scope.resultadoContenidos = resultadoContenidos;
                                                        $scope.showDownContent = resultadoContenidos.length > 0 ? true:false;
                                                    });

                                                    serviceContenido.searchPreguntas( word, function( data ){
                                                        $scope.resultadoPreguntas = serviceContenido.searchReduceAndFormated(data.data,word,"pregunta");
                                                        $scope.showDownAsk = data.data.length >  0 ?  true:false;
                                                    });
                                                }

                                        }
                                };/*end buscar*/
                                
                                $scope.botonBuscar = function( word ){
                                    if(word === undefined ){
                                        return true;
                                    }
                                    if( word.length>2 ){
                                            $scope.resultadoPreguntas = [];
                                            $scope.resultadoContenidos = [];
                                    }

                                };/*end buscar*/
                                $scope.linkWap=function(dir,idMenu,idPregunta){

                                        $scope.resultadoPreguntas = [];
                                        $scope.resultadoContenidos = [];
                                        $location.path(dir+idMenu+"/"+idPregunta);
                                };
                                $scope.link = function(dir, idMenu){
                                        $scope.resultadoPreguntas = [];
                                        $scope.resultadoContenidos = [];
                                        $location.path(dir+idMenu);
                                };
                                $scope.mostrarResultados = function( dir, word )
                                {
                                    if(word === undefined ){
                                        return true;
                                    }
                                    $scope.resultadoPreguntas = [];
                                    $scope.resultadoContenidos = [];
                                    $location.path(dir+word);
                                };
                                $scope.validateResult = function(){
                                    $scope.resultadoPreguntas = [];
                                    $scope.resultadoContenidos = [];
                                    $scope.inputBuscar = "";
                                };

                                $( ".ayuda-busqueda" ).on( "click", function() {
                                    
                                    $(".opacity").css("display", "block");
                                });
                                $( ".enterbuscar" ).on( "click", function(){
                                    $(".opacity").css("display", "none");
                                });
                                $( ".opacity" ).on( "click", function() {
                                    $(".opacity").css("display", "none");
                                });
                        }//end link

                };
        };/*end menu*/

        /*header*/
        function headerWeb(myconfig){
                 return {

                        restrict:'E',
                        templateUrl: function( elem, attr ){
                                return myconfig.urlDirectives+'inputSearch/header.html';
                        },
                        link: function( $scope ){}
                };
        }
     /*end header*/
     /*footer*/
         function footerWeb(myconfig){
                 return {

                        restrict:'E',
                        templateUrl: function( elem, attr ){
                                return myconfig.urlDirectives+'inputSearch/footer.html';
                        },
                        link: function( $scope ){

                                    $(document).ready(function() {
            $(".a-footer_linkOpen").click(function() {
              $('.footer-dropdown li').removeClass('active');
                $(this).parent().parent().find('li').addClass("active");
            });

            $(".sub-section.open-menu-footer").click(function() {
                $(".sub-section.open-menu-footer a span.icon-liv-right-06").toggleClass("rotate");
            })
        })
                        }
                };
        }
        /*end footer*/
})();



