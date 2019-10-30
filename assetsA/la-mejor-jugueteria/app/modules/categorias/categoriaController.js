(function(){
    angular.module('categorias',[]).controller( "categoriasController", categoriaController ).
    controller( "subCategoriaController", subCategoriaController );
    function categoriaController( $scope, serviceProducto, $routeParams,$location,$timeout ){
        $scope.categorias = [];
        $scope.idCategoria = "";

        // $scope
        $scope.loaded = true;
        $scope.banner = null;
        if( $routeParams.hasOwnProperty("categoria")){
            serviceProducto.getCategoria( $routeParams.categoria, function( data ){
                if( data.success ){
                    $scope.banner = data.data.principal;
                    $scope.idCategoria = $routeParams.categoria;
                    $timeout(function(){
                        $scope.categorias = data.data.subcategorias;
                        $scope.loaded = false;
                    },500);
                }else{
                    $location.path("/");
                }
            });
        }else{
            console.log("No existe identificador ");
        }
    }
    function subCategoriaController( $scope, serviceProducto, $routeParams,$timeout,$location,$http ){
        $scope.categorias = [];
        $scope.label = "";
        $scope.idCategoria = "";
        $scope.fondo = "";
        $scope.loaded = true;
        $scope.firstItemType = "image";
        $scope.idCategoria = "";
        var pageActual = 1;
        var totalPages = 1;
        var win = $( window );
        var categorias= [];
        var _data = [];
        $scope.banner = {};
        if( $routeParams.hasOwnProperty("categoria") && $routeParams.hasOwnProperty("subcategoria")){
            if("catst1896485" === $routeParams.subcategoria || "catst1833807" === $routeParams.subcategoria || "catst1833811" === $routeParams.subcategoria || "catst1833808" === $routeParams.subcategoria){
                serviceProducto.getSubSubCategoria($routeParams.subcategoria, pageActual, responseSubSubCategoria);
                if("catst1896485" === $routeParams.subcategoria || "catst1833807" === $routeParams.subcategoria || "catst1833811" === $routeParams.subcategoria || "catst1833808" === $routeParams.subcategoria){
                  serviceProducto.getSubCategoria( $routeParams.categoria,$routeParams.subcategoria,pageActual, function( data ){
                      _data= data;
                          $scope.banner = _data.data.principal;
                  });
                }
                $scope.banner = $routeParams.categoria;
                $scope.idCategoria = $routeParams.subcategoria;
              return;
            }
            serviceProducto.getSubCategoria( $routeParams.categoria,$routeParams.subcategoria,pageActual, function( data ){
                _data= data;
                if( _data.success ){
                    $scope.label = _data.data.principal.label;
                  //  $scope.banner = _data.data.principal;
                    $scope.fondo =  _data.data.principal.hasOwnProperty("colorfondo") ? _data.data.principal.colorfondo: "" ;
                    $scope.idCategoria = $routeParams.categoria;
                    serviceProducto.getSubSubCategoria( _data.data.principal.categoryid, pageActual, responseSubSubCategoria);
                }
            });
        }
        $scope.irDetalle=function(id){
            $location.path("/detalle/"+id);
        }
        win.scroll(function() {
            if ( ( $(document).height() - win.height() == win.scrollTop() ) && $scope.loaded ===false) {
                pageActual ++;
                if( pageActual <= totalPages ){
                    $scope.loaded = true;
                    serviceProducto.getSubSubCategoria( _data.data.principal.navigationState, pageActual, responseSubSubCategoria );
                }else{
                    console.log("");
                }
		   }
	    });
        function responseSubSubCategoria(data){

                categorias = categorias.concat( data.data );
                $scope.subcategorias = categorias;
                totalPages = data.totalPages;
                $scope.loaded  = false;

        };

    }/*end funcion subCategoriaController*/
})();
