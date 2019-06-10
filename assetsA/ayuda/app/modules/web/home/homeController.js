(function() {
    angular.module('moduleHome', ["jsonReader"])
        .controller("homeController", home);

    function home($scope, serviceContenido, serviceMenu, Reader) {
        $scope.menu = [];
        $scope.topPreguntas = [];

        serviceMenu.get(function(data) {

            $scope.menu = data.data || [];
            angular.forEach($scope.menu, function(val, key) {
                angular.forEach(val.subnivel, function(val2, key2) {

                    if (val2.hasOwnProperty("subnivel")) {

                        val2.newLink = val2.link + "/" + (val2.subnivel[0] != undefined ? val2.subnivel[0].link : "");
                    } else {
                        val2.newLink = val2.link;
                    }
                });
            });
        });

        serviceContenido.getPreguntasTop(function(data) {
            $scope.topPreguntas = data.data;

        });
        //console.log(serviceContenido.get("kjasdasd1dkjasjskj","s"));
    }
})();