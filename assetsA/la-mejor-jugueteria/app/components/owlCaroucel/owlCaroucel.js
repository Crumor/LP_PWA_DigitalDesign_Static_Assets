(function(){
       angular.module('componentOwlCarucel',[]).directive('owlCaroucel',linkData)
       .directive('owlCaroucelHome',linkData2)
       .directive("owlCaroucelMarcas",linkData3);
        function linkData($http,serviceProducto,$timeout,$location){
         return {
             restrict:'AE',
             transclude:true,
             replace:true,
             templateUrl: 'app/components/owlCaroucel/owlCaroucel.html',
             scope:{
                idElement:'@',
                itemClass:"@",
                jsonPath:"@",
                elements:"=",
                items:"@",
                typeOwl:"@",//1 = service default, 2 element binding
                styleOwl:"@",
                classControls:"@",
                classOwl:"@"
             },
             link: function (scope, elem, attrs) {
                 scope.itemsD = [];
                 scope.irDetalle =function(id){
                    $location.path("/detalle/"+id);
                 }
                var render = function(){
                    var items = [];
                    var content = "";
                    var owl = $("#"+scope.idElement);
                    if( scope.typeOwl === "4" ){
                            items = scope.elements || [];
                                scope.itemsD = items;
                                    scope.$watchCollection("itemsD",function(){
                                        owl.owlCarousel({
                                            items : scope.items === undefined ? 4: scope.items,
                                            lazyLoad : true,
                                            navigation : false,
                                            pagination:true,
                                            responsive: true,
                                            singleItem:false,

                                            itemsMobile: [479,2.5],
                                            itemsTablet: [768,4],
                                            itemsDesktop:[1199,5],
                                            itemsDesktopSmall : [1024,4],
                                            baseClass : "owl-carousel owl-border-top"
                                        }); 
                                    });
                            }else if(scope.typeOwl === "5" ){
                                serviceProducto.getTop10( function( data ){
                                    items = data.toys || [];
                                    scope.itemsD = items;
                                    scope.$watchCollection("itemsD",function(){
                                        owl.owlCarousel({
                                            items : scope.items === undefined ? 5: scope.items,
                                            lazyLoad : true,
                                            navigation : false,
                                            pagination: true,
                                            responsive: true,
                                            singleItem:false,
                                            itemsMobile: [479,2.5],
                                            itemsTablet: [768,4],
                                            itemsDesktop:[1199,5],
                                            itemsDesktopSmall : [1024,5],
                                            baseClass : "owl-carousel owl-border-top"
                                        }); 
                                    });
                                });
                            };
                            $("."+scope.classControls+" .next").click(function(){
                                owl.trigger('owl.next');
                            });
                            $("."+scope.classControls+" .back").click(function(){
                                owl.trigger('owl.prev');
                            });
                            $("."+scope.classControls+" .next_clp").click(function(){
                                owl.trigger('owl.next');
                            });
                            $("."+scope.classControls+" .back_clp").click(function(){
                                owl.trigger('owl.prev');
                            });
                }
                $timeout(render,0);
             }//--------end links 
        };
    };
    function linkData2($http,serviceProducto,$timeout,$location){
        var infoDirectiva ={
                    restrict:'AE',
                    transclude:true,
                    replace:true,
                    templateUrl: 'app/components/owlCaroucel/owlCaroucelHomeMobo.html',
                    scope:{
                        idElement:'@',
                        itemClass:"@",
                        jsonPath:"@",
                        elements:"=",
                        items:"@",
                        typeOwl:"@",//1 = service default, 2 element binding
                        styleOwl:"@",
                        classControls:"@",
                        classOwl:"@"
                    },
                    link: function (scope, elem, attrs) {
                        var render = function(){
                            var items = [];
                            var content = "";
                            var owl = $("#"+scope.idElement);
                            serviceProducto.getSliderHome( function( data ){                
                                items = data.data || [];
                                scope.itemsD = items;    
                                scope.$watchCollection("itemsD",function(){
                                    owl.owlCarousel({
                                        autoPlay : 3000,
                                        slideSpeed : 300,
                                        paginationSpeed : 400,
                                        singleItem:true,
                                        itemsMobile: [ 479, 2.5 ],
                                        itemsTablet: [ 768, 3.5 ],
                                        itemsDesktopSmall : [ 980, 4 ],
                                        itemsDesktop:[ 1199, 4 ],      
                                        autoHeight:false,
                                        autoPlay:true
                                    }); 
                                });   
                            });
                            $("."+scope.classControls+" .next").click(function(){
                                    owl.trigger('owl.next');
                            });
                            $("."+scope.classControls+" .back").click(function(){
                                    owl.trigger('owl.prev');
                            });
                        };//--------end links 
                        scope.irHome = function(link){
                          if( link.indexOf("http://assets")>=0 )
                              location.href=link;
                            else
                              $location.path(link);
                        }
                        $timeout(render,0);
                    }
        };
        if( navigator.userAgent.match(/Android/i) 
           || navigator.userAgent.match(/webOS/i) 
           || navigator.userAgent.match(/iPhone/i)  
           || navigator.userAgent.match(/iPod/i) 
           || navigator.userAgent.match(/BlackBerry/i) 
           || navigator.userAgent.match(/Windows Phone/i)){
               infoDirectiva.templateUrl = 'app/components/owlCaroucel/owlCaroucelHomeMobo.html';
        }else{
              infoDirectiva.templateUrl =  'app/components/owlCaroucel/owlCaroucelHome.html';
        }
        return infoDirectiva;
        //ux
                             
};
    function linkData3($timeout,serviceProducto){
        return {
            restrict:'AE',
            templateUrl:'app/components/owlCaroucel/owlCaroucelMarcas.html',
            scope:{
                idElement:'@',
                itemClass:"@",
                jsonPath:"@",
                elements:"=",
                items:"@",
                typeOwl:"@",//1 = service default, 2 element binding
                styleOwl:"@",
                classControls:"@",
                classOwl:"@"
            },
            link:function(scope, elem, attrs){
                    scope.itemsD2 = [];
                
                    var render = function(){
                        var items = []; 
                        var content = "";
                        var owl = $("#"+scope.idElement);
                        items = scope.elements || [];
                        serviceProducto.getMarcasPopulares(function(data){
                            scope.items === undefined ? 6: scope.items
                            if( data.success ){
                                scope.itemsD2 = data.data || [];
                                scope.$watchCollection("itemsD2",function(){
                                    owl.owlCarousel({
                                        items : scope.items === undefined ? 6: scope.items,
                                        lazyLoad : true,
                                        navigation : false,
                                        navigationText: [
                                                '<img src="assets/images/caroucel/flecha.svg"/>',
                                                '<img src="assets/images/caroucel/flecha.svg"/>'
                                                ],
                                        pagination: false,
                                        responsive: true,
                                        singleItem:false,
                                        itemsMobile: [320,2.5],
                                        itemsTablet: [768,3.5],
                                        itemsDesktop:[1199,6],
                                        itemsDesktopSmall : [980,
                                        6],
                                        baseClass : "owl-carousel owl-marcas-carousel"
                                    }); 
                                });   
                            }
                        }); 
                            $("."+scope.classControls+" .next").click(function(){
                                owl.trigger('owl.next');
                            });
                            $("."+scope.classControls+" .back").click(function(){
                                owl.trigger('owl.prev');
                            });

                    };
                    $timeout(render,0);
            }
        }
    }
})(); 


