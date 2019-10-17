(function(){
	angular.module('carta',[]).controller( "cartaController", cartaController )
	.controller( "cartaControllerFelicidades", cartaControllerFelicidades );
	
	function cartaController($rootScope, $scope, serviceStorePedidos,$location ){
		
		$scope.carta = {email:"",mensaje:"",nombre:""};
		$scope.information = {
			success: true, 
			data: {
				color1:"#97F34E",
				color2:"none",
				color3:"#FC3491",
				fondo:"#f6cfe4",
				label:"Mi carta a santa"
			}, 
			code: 0
		};
		$scope.isActiveBtnEnviar = true;
		$scope.pedidos = function(){
		   return serviceStorePedidos.getPedidos();
		}
		$scope.eliminarPedido = function(index){
		   serviceStorePedidos.deletePedido(index);
		}
		$scope.enviarPedido = function(){
			$scope.isActiveBtnEnviar = false;
			if($scope.carta.mensaje === "")
				$scope.carta.mensaje="Este año he sido buen niñ@. Acabo la tarea antes de jugar. Respeto a mis mayores, ayudo en mi casa y sobre todo me como mis verduras. Te agradecería si me pudieras traer los juguetes que seleccione en La Mejor Juguetería";
			serviceStorePedidos.enviarPedido($scope.carta,function(response){
			 if( response.success )
				if( response.code === -2 ) {
					$("#modalEnvioMal").modal('show');
					$scope.isActiveBtnEnviar = true;
				}else 
					if( response.code ===-1 ) {
						$("#modalEnvioMalFalta").modal('show');
						$scope.isActiveBtnEnviar = true;
					}else if(response.code === 1 ){
						$rootScope.cartaExito = true;
						$location.path("/micarta/felicidades");
					}
			});
		}
		$scope.addFavoritos=function(p){
			$(".fa.fa-heart-o").click(function() {
			$(this).removeClass("fa-heart-o")
			$(this).addClass("fa-heart")
			})
		};
		$scope.microfono=function(id){ 
		 
			if (window.hasOwnProperty('webkitSpeechRecognition')) {

					var recognition = new webkitSpeechRecognition();

					recognition.continuous = false;
					recognition.interimResults = false;

					recognition.lang = "es-MX";
					recognition.start();

					recognition.onresult = function(e) {
						document.getElementById(id).value = e.results[0][0].transcript;
						recognition.stop();
						//document.getElementById('labnol').submit();
						$('#mic').css('background',"url('assets/images/micro/inactivo.png')");
						$('#mic2').css('background',"url('assets/images/micro/inactivo.png')");
						$('#mic3').css('background',"url('assets/images/micro/inactivo.png')");
					};

					recognition.onerror = function(e) {
						recognition.stop();

					}
				}
		};
			$('#mic').click( function() { 
				$(this).css('background',"url('assets/images/micro/animated.gif')");
			})
			$('#mic2').click( function() { 
				$(this).css('background',"url('assets/images/micro/animated.gif')");
			})
			$('#mic3').click( function() { 
				$(this).css('background',"url('assets/images/micro/animated.gif')");
			})
			$("input#transcript1").click(function () {
				document.getElementById('audioNombre').play();
			});
			$("input#transcript2").click(function () {
				document.getElementById('audioMail').play();
			});
			$("textarea#transcript3").click(function () {
				document.getElementById('audioSanta').play();
			});

	}
	function cartaControllerFelicidades( $rootScope,$scope, serviceStorePedidos,$location ){
		var  pedidos = serviceStorePedidos.getPedidos();
		if(pedidos.length <= 0){
			$location.path("/")
		}else{
		   	$rootScope.cartaExito = false;
			serviceStorePedidos.deleteAllPedidos();
			 	$scope.regresar=function(){
			 		$location.path("/");
			 	}
		 }
	}

})();