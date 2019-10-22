(function(){
    angular.module('factorys',[]).factory('JsonCategorias',categorias)
    .factory('home',home)
    .factory('storePedidos',storePedidos)
    .factory('blackList',blackList);
    function storePedidos(){
        var pedidos = [];
        return {
            setPedido:function(producto){
                pedidos.push(producto);
            },
            getPedido:function(index){
                return pedidos[index];
            },
            getPedidos:function(){
                return pedidos;
            },
            setPedidos:function(productos){
                pedidos = [];
                pedidos = productos;
            },
            deletePedido:function(index){
                pedidos.splice(index,1);
            },
            getTotal:function(){
                return pedidos.length;
            }
        };
    };
    function home(){
        var home = [];
        var sliderHome=[];
        var marcasPopulares=[];
        return {
            setSliderHome:function(p){
              sliderHome = p;
            },
            getSliderHome:function(){
                return sliderHome;
            },
            getHome:function(){
              return home;
            },
            getTop10:function(){
               if( home.length > 0 ){
                  return home[ 0 ];
               }else{
                  return [];
               }
            },
            setHome:function(arr){
                home = arr;
            },
            getMarcasPopulares:function(){
                return marcasPopulares;
            },
            setMarcasPopulares:function(val){
              marcasPopulares =  val;
            }
       };
    };
    function categorias(){
       var categorias =[];
       var bannersCategorias=[];
       return {
           setCategorias:function( val ){
              categorias =  val;
           },
           getCategorias:function(){
              return categorias;
           },
           getTotal:function(){
              return categorias.length;
           },
           setBannersCategorias:function(datos){
              bannersCategorias = datos;
           },
           getBannersCategorias:function(){
               return bannersCategorias;
           }
        }
    };
    function blackList(){
      var list = [];
      return{
        get:function(){
          return list;
        },
        set:function(l){
          list = l;
        }
      }
    }
})();
