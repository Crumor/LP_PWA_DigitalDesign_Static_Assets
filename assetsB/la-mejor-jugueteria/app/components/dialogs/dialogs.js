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
                $scope.cartas = $rootScope.totalPedidos < 10 ? "0" + $rootScope.totalPedidos : $rootScope.totalPedidos;
                var win = $(window);
                $rootScope.$watch('totalPedidos', function(newValue, oldValue) {
                    $scope.cartas = $rootScope.totalPedidos < 10 ? "0" + $rootScope.totalPedidos : $rootScope.totalPedidos;
                });
                var isShow = false;

                var toplimit = 600;
                var locat = $location.path();
                locat = $location.path();

                if (locat.indexOf("detal") > -1) {
                    toplimit = 0;
                    $(elem).show();
                }
                $rootScope.$on('$locationChangeSuccess', function(event, next, current) {
                    locat = $location.path();

                    if (locat.indexOf("detal") > -1) {
                        toplimit = 0;
                        $(elem).show();
                    }
                });
                locat = $location.path();

                if (locat.indexOf("detal") > -1) {
                    toplimit = 0;
                    $(elem).show();
                }
                win.scroll(function() {
                    var _top = win.scrollTop()


                    if (_top > toplimit) {
                        isShow = true;
                        if ($(elem).attr("class") === 'icon_carta') {
                            $(elem).show();
                        }

                    } else {

                        if ($(elem).attr("class") === 'icon_carta') {
                            $(elem).hide();
                        }
                    }
                });


            }
        }
    }
})();