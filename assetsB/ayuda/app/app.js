(function() {
    angular.module('APP_AYUDA_WEB', ["ngRoute", "ngSanitize", "firebase", "moduleHome", "moduleCategory", "services", "componentInputSearch", "componentMenuLeft", "componentPreguntasFrecuentes", 'angulartics', 'angulartics.google.analytics','jsonReader'])
        .constant('myconfig', {
            "url": "app/modules/web/",
            "urlDirectives": "app/common/directives/",
            "path": "./"

        })
        .config(configuracion)
        .run(run);




    function run($rootScope, $location, $http, myconfig) {

        $rootScope.$on("$locationChangeSuccess", function(event, next, current) {
            $("html, body").animate({ scrollTop: 0 }, 100);
        });


        var device = navigator.userAgent;
        var isMovil = false;
        var data = sessionStorage.getItem('first');
        if (device.match(/Iphone/i) || device.match(/Ipod/i) || device.match(/Android/i) || device.match(/J2ME/i) || device.match(/BlackBerry/i) || device.match(/iPhone|iPad|iPod/i) || device.match(/Opera Mini/i) || device.match(/IEMobile/i) || device.match(/Mobile/i) || device.match(/Windows Phone/i) || device.match(/windows mobile/i) || device.match(/windows ce/i) || device.match(/webOS/i) || device.match(/palm/i) || device.match(/bada/i) || device.match(/series60/i) || device.match(/nokia/i) || device.match(/symbian/i) || device.match(/HTC/i)) {
            location.href = "./m/index.html"

        }

    };

    function configuracion($routeProvider, $locationProvider, $analyticsProvider, myconfig) {
     
        $analyticsProvider.firstPageview(true); /* Records pages that don't use $state or $route */
        $analyticsProvider.withAutoBase(true); /* Records full path */
        $locationProvider.hashPrefix('');
        $routeProvider.
        when("/", {

                controller: "homeController",
                templateUrl: myconfig.url + "home/home.html"
            })
            .when("/sec/:categorys/:link", {

                controller: "categoryController",
                templateUrl: myconfig.url + "category/category.html"

            })
            .when("/sec/:categorys/:subcategorys/:link", {

                controller: "categoryController",
                templateUrl: myconfig.url + "category/category.html"

            })
            .when("/faq/:link", {

                controller: "answersController",
                templateUrl: myconfig.url + "category/answer.html"

            })
            .when("/faq/:link/:idfaq", {

                controller: "answersController",
                templateUrl: myconfig.url + "category/answer.html"

            })
            .when("/resultados/:search", {
                controller: "resultsController",
                templateUrl: myconfig.url + "results/results.html"
            })
            .otherwise({ redirectTo: '/' });
    }
})();
