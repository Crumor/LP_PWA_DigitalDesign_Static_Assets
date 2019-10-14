(function(){
       angular.module('componentInputBuscar',[]).directive('inputBuscar',linkData);
        function linkData($location,$timeout,typeHead){
         return {
             restrict:'AE',
             templateUrl: 'app/components/inputBuscar/inputBuscar.html',
             controller: function ($scope,typeHead,$log,$location) {
                 var word = "";
                 var iv = this;
                 var irResultados = function(txt){
                     if(txt !="")
                        $location.path("/busquedatype/1/"+txt);
                 };
                 $scope.inputBuscar ="";
                 iv.typeahead = typeHead;
                 $scope.resultados =[];
                 $scope.buscar =function (event,w){
                     if(event.keyCode !==40 && event.keyCode !==38){
                        $scope.resultados = [];
                        word = w;
                        iv.typeahead.setMostrar(false);
                        iv.typeahead.buscar(word,function(){
                            if(word!==""){
                                $scope.resultados = iv.typeahead.getResultado() || [];
                                iv.typeahead.setMostrar(true)
                            }

                        });
                     }
                 };
                 $scope.mostrar = function(){

                    return iv.typeahead.getMostrar();
                 };
                 $scope.blur = function(){
                     $timeout(function(){
                        iv.typeahead.setMostrar(false);
                     },250);
                 };
                 $scope.$on('$locationChangeStart', function(event) {
                    $scope.inputBuscar = "";
                 });
                 $scope.irAresultadoKey =function(event){
                     /*al presionar enter*/
                    if( event.keyCode === 13){
                       irResultados($scope.inputBuscar);
                    }
                 }
                 /*al presionar buscar*/
                 $scope.irAresultado=function(){
                  // console.log($scope.inpuBuscar);
                    irResultados($scope.inputBuscar);

                 }
                 /*al presionar cualquier resultado*/
                 $scope.irAresultadoOpcion = function(busqueda){
                        irResultados(busqueda);
                 }
                 $scope.cerrarMenu = function(){
                    $scope.resultados = [];
                    iv.typeahead.setMostrar(false);
                    $scope.inputBuscar = "";
                 }

             }
        };
    };

})();
