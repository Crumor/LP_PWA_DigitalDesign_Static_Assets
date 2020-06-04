(function(){
        angular.module('moduleWapHome',[]).controller("homeWapController",home)
        function home( $rootScope, $scope, $location, serviceMenu, Menu, serviceContenido ){
            $scope.menu         = [];
            $scope.topPreguntas = [];
            serviceContenido.getPreguntasTop( function( data ){
                $scope.topPreguntas =  data.data;

            });
            serviceMenu.get( function( data ){
                var response    = Menu.reset( $scope.category );
                $scope.menu     = response.data;
            });
            $scope.openLevel2 = function(n){
                var idExpetionAnswers = ["200010","20001","20002","20003","20004","20005","20006","20007","20008","20009"];
                var defaultUrl = "/sec/"+n.link+"/";
                $rootScope.classPageNext = "page-next";
                if( n.subnivel ){
                    idExpetionAnswers.forEach( function( d ){
                            if(n.idMenu === d){

                                defaultUrl ="/faq/";
                            };
                    });
                    
                    $location.path( defaultUrl );  
                } 
            };

        }
        
})();