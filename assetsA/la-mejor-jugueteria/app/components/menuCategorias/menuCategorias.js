(function() {
    angular.module('componentMenuCategorias', []).directive('menuCategorias', linkData)
        .directive("etiquetaCategoria", linkData2)
        .directive("optionAnimate", optionAnimate)
        .directive('menuCategoriasMobil', linkData4)
        .directive("bannerCategoria", linkData5);

    function linkData($rootScope, $location, serviceProducto, $routeParams) { /*menu categoria*/
        return {
            restrict: 'AE',
            templateUrl: 'app/components/menuCategorias/menuCategorias.html',
            scope: {
                isWeb: "="
            },
            link: function(scope, elem, attrs) {
                var offset = $(elem).parent().offset();
                var win = $(window),
                    lastStateScroll = 0,
                    up = 0;;
                scope.rutaActual = $location.path();
                scope.menuCategorias = [];
                $rootScope.$on('$locationChangeSuccess', function(event, next, current) {
                    scope.rutaActual = $location.path();
                });
                win.scroll(scrollAction);

                function showWhenScrollUp(win, limit) {
                    var stateScroll = win.scrollTop();

                    if (lastStateScroll < stateScroll) { /*si es menor significa que el scroll ba hacia abajo*/
                        elem.css("position", "relative"); /*si el scroll va hacia abajo regresamos el elemento a su posicion inicial*/
                        elem.show();
                        up = 0;
                    } else {
                        showWhenScrollUpDown(win, limit); // cuando el scroll va hacia arriba ejectamos la funcion
                    }
                    lastStateScroll = stateScroll;
                };

                function showWhenScrollUpDown(win, limit) { //funcion que detecta cuando el scroll va hacia abajo cambia la posicion a fixed si paso el limite del scroll establecido
                    if (win.scrollTop() > limit) {
                        if (up === 10) {
                            elem.css("position", "fixed");
                            elem.hide();
                            elem.fadeIn();
                        }
                        up += 1;
                    } else {
                        up = 0;
                        elem.show();
                        elem.css("position", "relative");
                    }
                };

                function scrollAction() {
                    offset = $(elem).parent().offset();
                    showWhenScrollUp(win, offset.top);
                }; //end scrollAction
                function initMenu() {
                    $("#armables").AnimationSvg({ 'spriteWidth': 700, 'spriteHeight': 100, steps: 7, 'areaWidth': 65 });
                    $("#bebes").AnimationSvg({ 'spriteWidth': 700, 'spriteHeight': 100, steps: 7, 'areaWidth': 65 });
                    $("#coleccionables").AnimationSvg({ 'spriteWidth': 800, 'spriteHeight': 100, steps: 8, 'areaWidth': 65 });
                    $("#disfraces").AnimationSvg({ 'spriteWidth': 800, 'spriteHeight': 100, steps: 8, 'areaWidth': 65 });
                    $("#drones").AnimationSvg({ 'spriteWidth': 800, 'spriteHeight': 100, steps: 8, 'areaWidth': 65 });
                    $("#exteriores").AnimationSvg({ 'spriteWidth': 800, 'spriteHeight': 100, steps: 8, 'areaWidth': 65 });
                    $("#juegosdemesa").AnimationSvg({ 'spriteWidth': 800, 'spriteHeight': 100, steps: 8, 'areaWidth': 65 });
                    $("#ninas").AnimationSvg({ 'spriteWidth': 800, 'spriteHeight': 100, steps: 8, 'areaWidth': 65 });
                    $("#ninos").AnimationSvg({ 'spriteWidth': 960, 'spriteHeight': 100, steps: 8, 'areaWidth': 65 });
                    $("#peluches").AnimationSvg({ 'spriteWidth': 800, 'spriteHeight': 100, steps: 8, 'areaWidth': 65 });
                    $("#vehiculos").AnimationSvg({ 'spriteWidth': 800, 'spriteHeight': 100, steps: 8, 'areaWidth': 65 });
                    $("#videojuegos").AnimationSvg({ 'spriteWidth': 800, 'spriteHeight': 100, steps: 8, 'areaWidth': 65 });
                }
                serviceProducto.getCategorias(function(data) {
                    scope.menuCategorias = data.data;
                });
                scope.irA = function(direccion) {
                    $location.path("/categoria/" + direccion);
                };
                scope.tutoClick = function() {};
                initMenu();
            }
        };
    };

    function linkData2(serviceProducto) { /*banner categoria*/
        return {
            restrict: 'E',
            templateUrl: 'app/components/menuCategorias/etiquetaCategoria.html',
            replace: true,
            scope: {
                categoria: "=",
                pictureWeb: "@",
                index: "@",
                label: "@",
                fondo: "@",
                width: "=",
                height: "=",
                information: "="
            },
            link: function($scope, elem, attrs) {
                $scope.data = {};
                $scope.$watch('categoria', function(old, news) {
                    if (old != "" && old != undefined) {
                        serviceProducto.getBannerSliderCategoria("categoria", $scope.categoria, function(data) {
                            resizeEtiqueta(data);
                        });
                    };
                });
                $scope.$watch('information', function(old, news) {
                    if (old != undefined)
                        resizeEtiqueta(old);
                });

                function resizeEtiqueta(data, _width) {
                    windowsWidth = $(window).width();
                    var _data = data.data;
                    var label = $scope.label === undefined || $scope.label === "" ? _data.label : $scope.label;
                    $(".etiqueta > .texto").html(label);
                    var width = $(".etiqueta > .texto").outerWidth();
                    var height = 25 + $(".etiqueta > .texto").outerHeight();
                    if (windowsWidth <= 481) {
                        $(".etiqueta > .texto").css("font-size", "2em");
                        width = $(".etiqueta > .texto").outerWidth();

                        if (width >= 380 || width >= 280) { /*in case of text is biger that device*/
                            $(".etiqueta > .texto").css("top", "20px");
                            width = 240;
                            $(".etiqueta > .texto").css("width", width + "px");
                            height = 25 + $(".etiqueta > .texto").outerHeight();
                        } else {
                            height += 15;
                        }
                    }
                    if (windowsWidth <= 1024) {
                        $(".etiqueta > .texto").css("font-size", "2.2em");
                        width = $(".etiqueta > .texto").outerWidth();

                        if (width >= 770) { /*in case of text is biger that device*/
                            $(".etiqueta > .texto").css("top", "20px");
                            width = 710;
                            $(".etiqueta > .texto").css("width", width + "px");
                            height = $(".etiqueta > .texto").outerHeight();
                        }
                    }
                    width = 50 + width;
                    $scope.bannerWidth = width;
                    $scope.label = label;
                    $scope.fondo = $scope.fondo === undefined || $scope.fondo === "" ? _data.fondo : $scope.fondo;
                    $("#svgetiqueta").attr("width", (width + 30));
                    $("#svgpoligon1").attr({ "stroke": _data.color1, "points": "4,2 28," + (height + 15) + " " + (width - 15) + "," + (height + 5) + " " + (width + 10) + ",16" });
                    $("#svgpoligon2").attr({ "fill": _data.color2, "points": "4,3 28,108 189,97 212,17" });
                    $("#svgpoligon3").attr({ "fill": _data.color3, "points": width + ",94 " + width + ",21.5 12,9 16," + (height + 8) + " " + width + "," + height });
                };
                $(window).resize(function() {
                    $scope.dimension = $(window).width();
                    $scope.$apply();
                });
            }
        };
    };

    function optionAnimate(serviceProducto) { /*banner categoria*/
        return {
            restrict: 'E',
            templateUrl: 'app/components/menuCategorias/optionAnimate.html',
            replace: true,
            scope: {
                categoria: "=",
                pathImgSvg: "@"
            },
            link: function($scope, elem, attrs) {
                $("#" + elem.attr("id")).AnimationSvg({ 'spriteWidth': 800, 'spriteHeight': 100, steps: 8, 'areaWidth': 65 });
            }
        };
    };

    function linkData4($rootScope, $location, serviceProducto, $routeParams) { /*menu categoria*/
        return {
            restrict: 'AE',
            templateUrl: 'app/components/menuCategorias/menuCategoriasMobil.html',
            scope: {
                isWeb: "="
            },
            link: function(scope, elem, attrs) {

                var win = $(window),
                    lastStateScroll = 0;

                scope.rutaActual = $location.path();
                scope.menuCategorias = [];

                $rootScope.$on('$locationChangeStart', function(event, next, current) {
                    scope.rutaActual = $location.path();
                });


                serviceProducto.getCategorias(function(data) {
                    scope.menuCategorias = data.data;
                });
                scope.getBackground = function(urlImage) {
                    return scope.image = { "background-image": "url('" + urlImage + "')" };
                }

                scope.irA = function(direccion) {
                    $location.path("/categoria/" + direccion);
                    $('#menu-categorias-mobile-content').fadeOut(0);
                };
                scope.tutoClick = function() {
                    $('#menu-categorias-mobile-content').fadeOut(0);
                };
            }
        };
    };

    function linkData5(serviceProducto) { /*banner categoria*/
        return {
            restrict: 'E',
            templateUrl: 'app/components/menuCategorias/bannerCategoria.html',
            replace: true,
            scope: {
                categoria: "=",
                pictureWeb: "@",
                index: "@",
                fondo: "@",
                patron: "@"
            },
            link: function($scope, elem, attrs) {
                $scope.$watch('fondo', function(old, news) {
                    $scope.styles = { "background-image": "url('" + $scope.patron + "')", "background-color": $scope.fondo };
                });

            }
        };
    };
})();