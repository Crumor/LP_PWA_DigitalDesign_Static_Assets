$(document).foundation({
  orbit: {
    animation: 'slide',
    timer_speed: 6000,
    pause_on_hover: true,
    animation_speed: 500,
    navigation_arrows: true,
    bullets: false
  }
});

$(document).ready(function () {

    $('.button').hover(function () {
        $(this).toggleClass('hover');
    });

    $('.button').click(function () {
        $(this).toggleClass('active');
        $(this).siblings().removeClass('hover active');
    });
});