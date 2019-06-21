$(document).ready(function(){

    function getMobileOperatingSystem() {
      	var userAgent = navigator.userAgent || navigator.vendor || window.opera;
      
      	if( userAgent.match( /iPad/i ) || userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) )
      	{
            $.smartbanner({
      		appStoreLanguage: 'es',
      		price: 'Gratis',
      		inGooglePlay:"en Google Play",
      		inAppStore:"en AppStore",
      		url: "",
      		force:"ios",
      		button:"VER",
      		title:'La Mejor Juguetería Liverpool',
      		appendToSelector:"header"
      		}) 
      	return 'iOS';
      
      	}
      	else if( userAgent.match( /Android/i ) )
      	{
      	$.smartbanner({
      		appStoreLanguage: 'es',
      		price: 'Gratis',
      		inGooglePlay:"en Google Play",
      		inAppStore:"en AppStore",
      		url: "",
      		force:"android",
      		button:"VER",
      		title:'La Mejor Juguetería Liverpool',
      		appendToSelector:"header"
      		}) 
      	return 'Android';
      	}
      	else
      	{
      		var x = localStorage.DesktopApp;
      		if(x === undefined){
      			localStorage.DesktopApp = true;
      			$(window).load(function(){
      				$('#downloadApp').modal('show');
      			});
      		}
      	}
      }

function carousel(ejemplo,slides){
    //script de home.html
      getMobileOperatingSystem()
}); 
