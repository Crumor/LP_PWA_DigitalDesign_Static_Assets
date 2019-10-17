(function(){
    angular.module('detalle',[]).controller("detalleJugueteController",detalleController)
    .directive('twitter', [compartirTwitter]);
    function compartirTwitter(){
        return {
            link: function(scope, element, attr) {
                setTimeout(function() {
                        twttr.widgets.createShareButton(
                            attr.url,
                            element[0],
                            function(el) {}, {
                                count: 'none',
                                text: attr.text
                            }
                        );
                });
            }
        }
    }
    function detalleController($scope,$routeParams,serviceProducto,$location,$timeout){
        $scope.vm = {};
        $scope.vm.success = false;
        $scope.vm.producto = [];
        $scope.imagenAux = "";
        $scope.loaded = true;
        $scope.indexActive = -1;
        console.log('params', $routeParams);
        if( $routeParams.hasOwnProperty("productId") ){
            serviceProducto.getProducto( $routeParams.productId,function(data){
                if( data.success ){
                    $scope.imagenAux = data.data.imageBg;
                    $scope.vm.success = data.success;
                    $scope.vm.producto = data.data;
                    $timeout(function(){
                        initGallery($scope);
                        $scope.loaded =false;
                    },1000);
                }
            },1);

        }else{
            console.log(" No existe identificador ");
        }
        $scope.cambioImagen = function(imagen) {
            $scope.imagenAux = imagen;
        };
        $scope.share = function(producto){
          FB.ui({
              method: 'share',
              mobile_iframe: true,
              href: 'http://lamejorjugueteria.liverpool.com.mx/#/detalle/'+producto.id,
          } , function(response){
          });
        };
        $scope.compartirGoogle=function( producto ){
            var href="https://plus.google.com/share?url=http%3A%2F%2Flamejorjugueteria.liverpool.com.mx%2F%23%2Fdetalle%2F"+producto.id+"&ref_src=twsrc%5Etfw&text="+producto.description;
            window.open(href,
  'http%3A%2F%2Flamejorjugueteria.liverpool.com.mx%2F%23%2Fdetalle%2F'+producto.id+'&ref_src=twsrc%5Etfw&text='+producto.description, 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
        }
        $scope.shareTwitter = function(producto){
          var src = 'https://twitter.com/intent/tweet?text=http://lamejorjugueteria.liverpool.com.mx/#/detalle/'+producto.id;
          window.open('https://twitter.com/intent/tweet?text=http%3A%2F%2Flamejorjugueteria.liverpool.com.mx%2F%23%2Fdetalle%2F'+producto.id)
        }
        $scope.goToSlider=function(index){
          $scope.indexActive = index;
          var owl = $('#slider').data('owlCarousel');
          owl.goTo(index+1);
        }
    };//end detalle controller
    var foo = function( event ) {
          if ( event ) {
          } else {
          }
    };
    function initGallery(scope){
              // reference for main items
              var slider = $('#slider');
              // reference for thumbnail items
              var thumbnailSlider = $('#thumbnailSlider');
              //transition time in ms
              var duration = 500;
              // carousel function for main slider
              slider.owlCarousel({
                autoPlay:false,
                pagination:false,
                navigation:false,
                items : 1,
                itemsDesktop : [1199,1],
                itemsDesktopSmall : [980,1],
                itemsTablet: [768,1],
                itemsTabletSmall: false,
                itemsMobile : [479,1],
                singleItem : true
              });//.on('changed.owl.carousel', function (e) {

              $("#thumbnailSlider > .owl-wrapper-outer > .owl-wrapper > .owl-item:first").trigger( "click");
              foo();
              // carousel function for thumbnail slider
              thumbnailSlider.owlCarousel({
               autoPlay:false,
               pagination:false,
               navigation:false,
               items : 9,
                itemsDesktop : [1199,9],
                itemsDesktopSmall : [980,9],
                itemsTablet: [768,4],
                itemsTabletSmall: false,
                itemsMobile : [479,3],
                singleItem : false
              }).on('click', '.owl-item', function () {
               // On click of thumbnail items to trigger same main item
               slider.trigger('owl.goTo', [$(this).index()+1, duration, true]);
                $(".owl-item").removeClass("active");
                $(this).addClass("active");
              }).on('changed.owl.carousel', function (e) {
               // On change of thumbnail item to trigger main item
               slider.trigger('owl.goTo', [e.item.index+1, duration, true]);
                $(".owl-item").removeClass("active");
              });
              //These two are navigation for main items
              $('.slider-right').click(function() {
               slider.trigger('owl.next');
               //slider.next()
              });
              $('.slider-left').click(function() {
               slider.trigger('owl.prev');
               //slider.prev()
              });
    }//end init galleria
})();
