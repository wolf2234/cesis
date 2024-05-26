const hamMenu = document.querySelector(".burger");
const offScreenMenu = document.querySelector(".menu");
const body = document.querySelector('.body');

hamMenu.addEventListener('click', () => {
    hamMenu.classList.toggle('active');
    offScreenMenu.classList.toggle('active');
    body.classList.toggle('lock');
});

$(document).ready(function() {
    $('.slider').slick({
        arrows: false,
        dots: true,
        adaptiveHeight: true,
        Infinity: true,
        autoplay: true,
        autoplaySpeed: 2000,
    });
});