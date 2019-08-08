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
                    label: "transformers"
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