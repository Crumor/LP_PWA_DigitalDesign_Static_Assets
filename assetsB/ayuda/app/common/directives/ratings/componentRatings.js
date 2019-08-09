(function(){
  angular.module("componentRatings",[])
  .directive("ratings",ratings);
  function ratings(myconfig, $routeParams, $location, serviceMenu, serviceStorage){
    return {
              restrict:'AE',
              templateUrl: function( elem, attr ){
                  var template = {
                      "web":"ratings.html",
                      "wap":"ratingsWap.html"    
                  };
                  return myconfig.urlDirectives+'ratings/'+template[attr.th];
              },
              link: function ( $scope, element ) {
                JSON.parse("{}");
                var stgAvailable = false; 
                localStorage.setItem('survey',[]);
                if (serviceStorage.storageAvailable('localStorage')) {
                  stgAvailable = true; 

                  var data = String($location.url()).split('/');
                  if(localStorage.getItem('survey')!=""){
					  localStorage.setItem('survey',data);
                    var dataSurvey = setVote(true,"",data);
                    
                   if(serviceStorage.isEmptyJSON(dataSurvey)){
                      $scope.vote = true;
                    }else{
                      $scope.vote = false;
                    }
                  }
                }
                else {
                  // Too bad, no localStorage for us
                }
                $scope.addSurvey = function(val){
                  if (stgAvailable) {
                    var data = String($location.url()).split('/');
                    if(localStorage.getItem('survey') === ""){
                      var jsonData = {};
                      jsonData = [];
                      jsonData.push(setVote(false,val,data));
                      
                      localStorage.setItem('survey',JSON.stringify(jsonData));
                      $scope.vote = true;
                    }else{
                      var dataSurvey = setVote(true,val,data);
                      var arraySurvey = localStorage.getItem('survey');
                      var objSurvey = JSON.parse(arraySurvey);
                      if(!serviceStorage.isEmptyJSON(dataSurvey)){ 
                        objSurvey.push(dataSurvey);
                        localStorage.setItem('survey',JSON.stringify(objSurvey));
                        $scope.vote = true;
                      }
                    }
                  }
                  else {
                    // Too bad, no localStorage for us
                  } 
                };
              }
            };
  };
  function setVote(flag,val,data){
    var mapSurvey = {};
    if(!flag){
      mapSurvey[data[data.length-1]] = val;
    }else{
      var objSurvey = JSON.parse(localStorage.getItem("survey"));
      var fl = false;
      for (var i = 0, len = objSurvey.length; i < len; i++) {
        for (var key in objSurvey[i]) {
          if(key == data[data.length-1]){
            fl = false;
            break;
          }else{
            fl = true;
          }
        };
        if(!fl){
          break;
        }
      }
      if(fl){
        mapSurvey[data[data.length-1]] = val;
      }
    }
    return mapSurvey;
  };
})();