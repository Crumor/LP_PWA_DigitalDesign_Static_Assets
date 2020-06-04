(function(){
  angular.module("componentPreguntasFrecuentes",[]).
  directive("preguntasFrecuentes",preguntasFrecuentes);
  function preguntasFrecuentes(myconfig, $routeParams, $location, serviceMenu,serviceContenido){
    return {
      restrict:'E',
      templateUrl:function(elem, attr){
          var templete = {"web":'preguntasf.html',"wap":'preguntasfwap.html'};
          return myconfig.urlDirectives+'preguntasf/'+templete[attr.th];
      }, 
      scope:{
        open:'=',
      },
      link: function ( $scope, element ) {
        $scope.topPreguntas = [];
        serviceContenido.getPreguntasTop(function(data){
          $scope.topPreguntas =  data.data;
        });
      }
    };
  }
})();