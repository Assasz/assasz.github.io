$(document).ready(function () {
    $('.intro').bgVideo({
        fadeOnPause: true,
        showPausePlay: true
    });

    $('.intro').mouseover(function () {
        this.play();
        $('.page-header h1').hide();
    });

    $('.intro').mouseleave(function () {
        this.load();
        $('.page-header h1').show();
    });

    $('.intro').on('ended', function () {
        this.load();
        this.play();
    });

    $('.page-content').parallax();

    var toggleMenu = function() {
        if($('.menu-container').hasClass('menu-toggled')){
            $('.menu-icon').replaceWith('<span class="fa fa-fw fa-bars menu-icon" aria-hidden="true"></span>');
        } else {
            $('.menu-icon').replaceWith('<span class="fa fa-fw fa-close menu-icon" aria-hidden="true"></span>');
        }

        $('.menu-container').toggleClass('menu-toggled');
    }

    $('[data-action="toggle-menu"]').click(toggleMenu);

    $('#menu a').click(toggleMenu);

    $('#menu a').click(function() {
        var href = $.attr(this, 'href'),
            position = (href == '#o-mnie') ? $(href).offset().top : $(href).offset().top - 40;

        $('html, body').animate({
            scrollTop: position
        }, 500);
    });

    $('.navbar-brand a').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    });

    $(window).scroll(function () {
        var $nav = $(".navbar");
        $nav.toggleClass('navbar-scrolled', $(this).scrollTop() > $nav.height());

        if($nav.hasClass('navbar-scrolled')) {
            $nav.removeClass('bg-transparent');
        }
    });

    $('.owl-carousel').owlCarousel({
        loop: true,
        autoplay: true,
        responsive:{
            0:{
                items:1
            },
            400:{
                items:2
            },
            768:{
                items:3
            }
        }
    });

    $('[data-action="show-modal"]').click(function () {
        var image = $(this).parent().find('.carousel-image'),
            title = image.attr('alt'),
            src = image.data('fullimage-src');

        $('.modal-title').html(title);
        $('.modal-body img').attr({
            src: src,
            alt: title
        })

        $('.modal').modal();
    });

    $('.form-control').keyup(function () {
        $(this).parent().find('.floating-label').toggleClass('float', $(this).val().length > 0);
    });
});
