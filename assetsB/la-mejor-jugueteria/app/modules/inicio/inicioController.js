(function() {
    angular.module('home', []).controller("inicioController", inicioController)

    function inicioController($scope, serviceProducto, $location, $http, myConfig) {
        $scope.banners = [];
        $scope.top10 = [];
        $scope.totalCartas = "000000";
        serviceProducto.getTop10(function(data) {
            $scope.top10 = data.toys || [];
        });
        $scope.irDetalleTop = function(id) {
            $location.path("/detalletopdiez/" + id);
        }
        $scope.irSeccion = function(path) {
            $location.path(path);
        }
        $scope.irCarta = function() {
            $location.path("/micarta");
        };
        $scope.openInstrucciones = function() {
            $("#modalInstrucciones").modal('show');
        }
        initFooterAnimations();
      //  animationSnow();
    }

    function initFooterAnimations() {
        $("#footerArmables").AnimationSvg({ 'spriteWidth': 700, 'spriteHeight': 100, steps: 7, 'areaWidth': 90 });
        $("#footerNinas").AnimationSvg({ 'spriteWidth': 800, 'spriteHeight': 100, steps: 8, 'areaWidth': 90 });
        $("#footerVehiculos").AnimationSvg({'spriteWidth':800,'spriteHeight':200,steps:4,'areaWidth':70})
        $("#footerNinos").AnimationSvg({ 'spriteWidth': 960, 'spriteHeight': 100, steps: 8, 'areaWidth': 90 });
        $("#footerBebes").AnimationSvg({ 'spriteWidth': 700, 'spriteHeight': 100, steps: 7, 'areaWidth': 90 });
        $("#footerVideoJuegos").AnimationSvg({ 'spriteWidth': 800, 'spriteHeight': 100, steps: 8, 'areaWidth': 90 });
    };

    function animationSnow() {
        var nsnow = 4;
        var count = 0;
        var _swith = 0;
        var inter = setInterval(mySnow, 1600);
        var increment1 = 0;
        var increment2 = 0;

        function mySnow() {
            increment1 = getRandomInt(240, 310);
            increment2 = getRandomInt(380, 430);
            for (var i = 0; i < nsnow; i++) {
                $("#container_principal").append("<div class='snow" + getRandomInt(1, 3) + "' style='left:" + getRandomInt(0, nsnow) * (_swith === 0 ? increment1 : increment2) + "px'>*</div>");

            }
            _swith = (_swith === 0) ? 1 : 0;

            count++;
            if (count >= 4) {
                limpia();

            }
        }

        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
        }


        function limpia() {
            clearInterval(inter);
        }
    }


})();
