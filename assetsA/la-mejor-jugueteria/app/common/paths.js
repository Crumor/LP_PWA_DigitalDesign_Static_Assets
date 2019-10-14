(function() {
    angular.module('paths', []).constant('myConfig', {
        pathServices: "https://shoppapp.liverpool.com.mx/appclienteservices/services/v3/plp?category-id=catst13886215",
        pathServiceSearch:"https://shoppapp.liverpool.com.mx/appclienteservices/services/v3/typeahead?",
        pathServicePlp:"https://shoppapp.liverpool.com.mx/appclienteservices/services/v3/plp?",
        pathServicePdp:"https://shoppapp.liverpool.com.mx/appclienteservices/services/v3/pdp?productId=",
        pathServiceSubCategoria: "https://shoppapp.liverpool.com.mx/appclienteservices/services/v3/plp?category-id=",
        pathHost: "https://www.liverpool.com.mx",
        pathJsonLocal: "data2017/",
        jsonCategorias: "data2017/categories/menu/categoriesLMJ.json",
        jsonHomeSlider: "data2017/home/sliders.json",
        jsonSliderCategorias: "data2017/banners/bannersCategorias.json",
        //formatJson:"d3106047a194921c01969dfdec083925=json",
        formatJson: "d3106047a194921c01969dfdec083925=json",
        pathServices2: "http://wqa.liverpool.com.mx/tienda/",
        formatJson2: "format=json",
        pathHome: "data2017/home/testHome.json",
        pathHomeJSON: "data2019/home/Home.json",
        jsonSliderMarcas: "data2017/marcas/marcas.json",
        pathPdp: "",
        pathTotalCarts: "https://us-central1-lamejorjugueteriaqa.cloudfunctions.net/gc/",
        pathSendCarts: "https://us-central1-lamejorjugueteriaqa.cloudfunctions.net/ec/",
        pathBlackList: ""
    });
})();
