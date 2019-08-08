


$('.general-disfraz').mouseenter(function(){
    $('.ninos-disfraz').css("padding-top", "20px");
    $('.texto-disfraz').css("top", "-40px").css("font-size", "60px");
});



$('.general-disfraz').mouseleave(function(){
    $('.ninos-disfraz').css("padding-top", "30px");
    $('.texto-disfraz').css("top", "0px").css("font-size", "38px");
});


$('.general-decoracion').mouseenter(function(){
    $('.perro-decoracion').css("width", "53%");
});


$('.general-decoracion').mouseleave(function(){
    $('.perro-decoracion').css("width", "50%");
});