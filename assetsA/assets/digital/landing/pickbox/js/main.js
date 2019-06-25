

$(".pregunta-pickbox").click(function (e){
    $(".pregunta-pickbox").removeClass("pickbox-activo");
    $(this).addClass("pickbox-activo");
});

$(document).click(function (e){
    var element = $("div.pickbox-activo");

    if (!element.is(e.target) && element.has(e.target).length === 0)
        element.removeClass("pickbox-activo");
});






