(function() {
    angular.module('paths', []).constant('myConfig', {
        pathServices: "https://shoppapp.liverpool.com.mx/appclienteservices/services/v3/plp?category-id=catst13886215",
        pathServiceSearch:"https://shoppapp.liverpool.com.mx/appclienteservices/services/v3/typeahead?",
        pathServicePlp:"https://shoppapp.liverpool.com.mx/appclienteservices/services/v3/plp?",
        pathServicePdp:"https://shoppapp.liverpool.com.mx/appclienteservices/services/v3/pdp?productId=",
        pathServiceSubCategoria: "https://shoppapp.liverpool.com.mx/appclienteservices/services/v3/plp?category-id=",
        pathServiceSubCategoriaPLP: "https://shoppapp.liverpool.com.mx/appclienteservices/services/v3/plp?page-number=1&sort-option=&force-plp=true&hybridProduct=false&number-of-items-per-page=40&category-id=",
        pathHost: "https://www.liverpool.com.mx",
        pathJsonLocal: "data2017/",
        jsonCategorias: "data2019/categories/menu/categoriesLMJ.json",
        jsonHomeSlider: "data2017/home/sliders.json",
        jsonSliderCategorias: "data2019/banners/bannersCategorias.json",
        pathHome: "data2017/home/testHome.json",
        pathHomeJSON: "data2019/home/Home.json",
        jsonSliderMarcas: "data2017/marcas/marcas.json",
        pathPdp: "",
        pathSendCarts: "https://us-central1-lamejorjugueteriaqa.cloudfunctions.net/CreateCard/",
        pathBlackList: "data2019/home/blackList.json"
    });
})();
