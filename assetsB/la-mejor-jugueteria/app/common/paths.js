(function() {
    angular.module('paths', []).constant('myConfig', {
        pathServices: "https://www.liverpool.com.mx/tienda/",
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
        jsonSliderMarcas: "data2017/marcas/marcas.json",
        pathPdp: "",
        pathTotalCarts: "https://us-central1-lamejorjugueteriaqa.cloudfunctions.net/gc/",
        pathSendCarts: "https://us-central1-lamejorjugueteriaqa.cloudfunctions.net/ec/",
        pathBlackList: ""
    });
})();