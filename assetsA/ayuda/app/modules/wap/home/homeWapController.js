(function(){
        angular.module('moduleWapHome',[]).controller("homeWapController",home)
        function home( $rootScope, $scope, $location, serviceMenu, Menu, serviceContenido, serviceUpdateVisit, serviceStorage ){
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
            /*$scope.addVisit = function(idQuestion){
                if (serviceStorage.storageAvailable('localStorage')) {
                    var arrayVotation = localStorage.getItem('mostView');
                    var arrayData = [];
                    if(arrayVotation == null){
                        // first time to vote
                        serviceUpdateVisit.update(idQuestion,function(data){
                            if(typeof(data) === "boolean" && data){
                                arrayData.push(String(idQuestion));
                                localStorage.setItem('mostView',JSON.stringify(arrayData));  
                            }
                        })
                    }else{
                        // the variable that contains votes exists
                        serviceUpdateVisit.update(idQuestion,function(data){
                            if(typeof(data) === "boolean" && data){
                                var flg = false;
                                arrayData = JSON.parse(arrayVotation);
                                for (var i = 0; i < arrayData.length; i++) {
                                    if(arrayData[i] != idQuestion){
                                        flg = true;
                                    }else{
                                        flg = false;
                                        break;
                                    }
                                }
                                if(flg){
                                    arrayData.push(String(idQuestion));
                                    localStorage.setItem('mostView',JSON.stringify(arrayData));  
                                }
                            }
                        })          
                    }
                }
            };*/
        }
        
})();