(function(){

        //Directiva para usar la funcion de colapsar y expandir 
        angular.module('ng-slide-down', [])
        .directive('ngSlideDown', [
            '$timeout',
            function ($timeout) {
                var getTemplate, link;
                getTemplate = function (tElement, tAttrs) {
                    if (tAttrs.lazyRender !== void 0) {
                        return '<div ng-if=\'lazyRender\' ng-transclude></div>';
                    } else {
                        return '<div ng-transclude></div>';
                    }
                };
                link = function (scope, element, attrs, ctrl, transclude) {
                    var closePromise, duration, elementScope, emitOnClose, getHeight, hide, lazyRender, onClose, show;
                    duration = attrs.duration || 1;
                    elementScope = element.scope();
                    emitOnClose = attrs.emitOnClose;
                    onClose = attrs.onClose;
                    lazyRender = attrs.lazyRender !== void 0;
                    if (lazyRender) {
                        scope.lazyRender = scope.expanded;
                    }
                    closePromise = null;
                    element.css({
                        overflow: 'hidden',
                        transitionProperty: 'height',
                        transitionDuration: '' + duration + 's',
                        transitionTimingFunction: 'ease-in-out'
                    });
                    getHeight = function (passedScope) {
                        var c, children, height, _i, _len;
                        height = 0;
                        children = element.children();
                        for (_i = 0, _len = children.length; _i < _len; _i++) {
                            c = children[_i];
                            height += c.clientHeight;
                        }
                        return '' + height + 'px';
                    };
                    show = function () {
                        if (closePromise) {
                            $timeout.cancel(closePromise);
                        }
                        if (lazyRender) {
                            scope.lazyRender = true;
                        }
                        return element.css('height', getHeight());
                    };
                    hide = function () {
                        element.css('height', '0px');
                        if (emitOnClose || onClose || lazyRender) {
                            return closePromise = $timeout(function () {
                                if (emitOnClose) {
                                    scope.$emit(emitOnClose, {});
                                }
                                if (onClose) {
                                    elementScope.$eval(onClose);
                                }
                                if (lazyRender) {
                                    return scope.lazyRender = false;
                                }
                            }, duration * 1000);
                        }
                    };
                    scope.$watch('expanded', function (value, oldValue) {
                        if (value) {
                            return $timeout(show);
                        } else {
                            return $timeout(hide);
                        }
                    });
                    return scope.$watch(getHeight, function (value, oldValue) {
                        if (scope.expanded && value !== oldValue) {
                            return $timeout(show);
                        }
                    });
                };
                return {
                    restrict: 'A',
                    scope: { expanded: '=ngSlideDown' },
                    transclude: true,
                    link: link,
                    template: function (tElement, tAttrs) {
                        return getTemplate(tElement, tAttrs);
                    }
                };
            }
        ]);    

        angular.module('moduleWapCategory',['ng-slide-down'])
        .controller("controllerWapCategory",category)
        .controller("controllerWapContent",content)
        .controller("controllerWapContentAnswer",contentAnswer)
        .controller("controllerWapResult",contentResult);
        function category( $rootScope, $scope, $location, $routeParams, serviceMenu,Menu,InfoContenido,$animate ){

            var beforeCategory ={};
            var nivel = 0;
            $scope.category ={};
            $scope.subnivel = [];
            $scope.linkCategory = $routeParams.link;
            $scope.linkCategory2 = $routeParams.hasOwnProperty("link2") ? $routeParams.link2 : "";
            console.log("category");
            serviceMenu.get( function( data ){
                console.log(data);
                var response = [];
                if($scope.linkCategory2!="")
                    response    = Menu.resetLink( $scope.linkCategory2 );
                else    
                    response    = Menu.resetLink( $scope.linkCategory );
                $scope.category = response.actualCategory;
                $scope.subnivel = response.actualCategory.subnivel;
                beforeCategory = response.beforeCategory;
                nivel =  response.nivel;
           
            });
            $scope.goTo = function(n){
                
                //var idExpetionAnswers = ["otros-temas","seguridad-del-sitio","acerca-de-nosotros","terminos-y-condiciones","soporte-tecnico","mesa-de-regalos","pagos-precios-y-promociones","pedidos-y-devoluciones","credito","preguntas-mas-buscadas"];
                var idExpetionAnswers = ["200010","20001","20002","20003","20004","20005","20006","20007","20008","20009","200012","200011","200013"];
                var defaultUrl = "/sec/"+$scope.linkCategory+"/"+n.link;
                var defaultUrlContent = "/cont/"+$scope.linkCategory+"/"+n.link+"/";
                if( $scope.linkCategory2!="" ){
                    defaultUrlContent = "/cont/"+$scope.linkCategory+"/"+$scope.linkCategory2+"/"+n.link;
                }
                if( n.subnivel.length>0 ){
                 
                    idExpetionAnswers.forEach( function( d ){
                            if(n.idMenu === d){
                                defaultUrl ="/faq/"
                            };
                    });
                    $location.path( defaultUrl+"/");
                }else{
                      
                    idExpetionAnswers.forEach( function( d ){
                            if(n.idMenu === d){
                                defaultUrlContent ="/faq/"+n.link+"/";
                            };
                    });          
                    $location.path( defaultUrlContent);
                }
            };
            $scope.back = function(){
                window.history.back();
                /*if( nivel === 0 )
                    $location.path("/");
                else
                    $location.path("/category/"+beforeCategory.idMenu);*/
             };

        };
        function content( $rootScope, $scope, $location, $routeParams, serviceMenu,Menu,serviceContenido,InfoContenido ){
console.log("contenido");
            var beforeCategory = {};
            var nivel = 0;
            $scope.contenido ="";
            $scope.linkCategory     = $routeParams.link2;
            $scope.linkCategory = $routeParams.hasOwnProperty("link3") ? $routeParams.link3 : $routeParams.link2;


            serviceContenido.getContenido( $scope.linkCategory, function( data ){
                console.log(data);
                if(data.data != null)
                    InfoContenido.set( data.data.contenido );
                    $scope.contenido = InfoContenido.get();
                    $("html, body").animate({ scrollTop: 0 }, 600);

            });
            serviceMenu.get( function( data ){

                var response    = Menu.resetLink(  $scope.linkCategory );

                beforeCategory =  response.beforeCategory;
                nivel =  response.nivel;

            });
            $scope.back = function(){
                window.history.back();
                    /*if(nivel === 0)
                        $location.path("/");
                    else
                        $location.path("/category/"+beforeCategory.idMenu);*/

             };

        };
        function contentAnswer( $rootScope, $scope, $location, $routeParams, serviceMenu,Menu,serviceContenido,InfoContenido){

            var beforeCategory = {};
            var nivel = 0;
            var linkCategory = $routeParams.hasOwnProperty("link") ? $routeParams.link : 0;
      var idPregunta = $routeParams.hasOwnProperty("idAnswer") ? $routeParams.idAnswer : 0;
            $scope.contenido = "";
            serviceContenido.getPreguntas( linkCategory, function( data ){
                var existId = false;
                if(data.data != null){

                        $scope.contenido = data.data;

                        if( idPregunta !=0){
                            angular.forEach($scope.contenido,function( val, key){
                                if( val.idPregunta === idPregunta){
                                        existId = true;

                                }
                            });

                        };
                        if( existId ){
                            setTimeout(function() {
                                $("html, body").scrollTop( document.getElementById("pq"+idPregunta).offsetTop );
                            }, 10);
                        }
                }

            });

            serviceMenu.get( function( data ){
                var response    = Menu.resetLink(  linkCategory );
                $scope.menu     = response.data;
                $scope.category = response.category;
                $scope.actualCategory =  response.actualCategory;
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
            $scope.back = function(){
                window.history.back();
                    /*if(nivel === 0)
                        $location.path("/");
                    else
                        $location.path("/category/"+beforeCategory.idMenu);*/

             };


        };

        function contentResult( $rootScope, $scope, $location, $routeParams, serviceMenu,Menu,serviceContenido,InfoContenido ){

            var word = $routeParams.search;
            var totalResult = 0;

            $scope.totalResult = 0;
            $scope.resultContenidos = [];
            $scope.resultPreguntas =[];
            $scope.wordSearch = word;

            serviceContenido.searchContenidos( word, function( data ){

                var resultadoContenidos = data.data;
                $scope.totalResult +=resultadoContenidos.length;
                    serviceMenu.get(function(data){
                        angular.forEach(resultadoContenidos,function(vr){
                                var mr = Menu.reset( vr.idMenu);
                                vr.icon = mr.category.icon;
                                vr.newLink = mr.category.link+"/"+vr.link;
                        });       
                    }); 
                $scope.resultContenidos = resultadoContenidos;
                
            });

            serviceContenido.searchPreguntas( word, function( data ){

                var resultadoPreguntas = data.data;
                $scope.totalResult +=resultadoPreguntas.length;

                serviceMenu.get(function(data){

                    angular.forEach(resultadoPreguntas,function(vr){
                        var mr = Menu.reset( vr.idMenu);
                        
                    });
                                                                                
                });

                $scope.resultPreguntas = resultadoPreguntas;
            });
        }
})();