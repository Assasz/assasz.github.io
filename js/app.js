$(document).ready(function () {

    carouselImages.forEach(function (image, index) {

        let imageWrapper = document.createElement("div");
        imageWrapper.classList.add("image-wrapper")

        let imageNode = document.createElement("img")
        imageNode.classList.add("carousel-image")
        imageNode.setAttribute("src", image.thumbSrc)
        imageNode.setAttribute("id", index);

        let span = document.createElement("span")
        span.classList.add("image-addon")
        span.classList.add("fa")
        span.classList.add("fa-fw")
        span.classList.add("fa-arrows-alt")
        span.classList.add("image-addon")

        span.setAttribute("aria-label", "Zobacz")
        span.setAttribute("data-action", "show-modal")

        imageWrapper.append(imageNode)
        imageWrapper.append(span)

        $('.photos-carousel').append(imageWrapper)
    })

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

    var toggleMenu = function () {
        if ($('.menu-container').hasClass('menu-toggled')) {
            $('.menu-icon').replaceWith('<span class="fa fa-fw fa-bars menu-icon" aria-hidden="true"></span>');
        } else {
            $('.menu-icon').replaceWith('<span class="fa fa-fw fa-close menu-icon" aria-hidden="true"></span>');
        }

        $('.menu-container').toggleClass('menu-toggled');
    }

    $('[data-action="toggle-menu"]').click(toggleMenu);

    $('#menu a').click(toggleMenu);

    $('#menu a').click(function () {
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

        if ($nav.hasClass('navbar-scrolled')) {
            $nav.removeClass('bg-transparent');
        }
    });

    $('.owl-carousel').owlCarousel({
        loop: true,
        autoplay: true,
        responsive: {
            0: {
                items: 1
            },
            400: {
                items: 2
            },
            768: {
                items: 3
            }
        }
    });

    var currentImageIdx;

    function refreshModal() {
        let { src, desc: title } = carouselImages[currentImageIdx]

        console.log("dispalay image " + currentImageIdx)
        $('.modal-title').html(title);
        $('.modal-body img').attr({
            src: src,
            alt: title
        })
    }

    function onModalNext(e) {
        e.preventDefault()

        if (currentImageIdx == carouselImages.length - 1)
            currentImageIdx = 0
        else
            currentImageIdx++

        refreshModal()
    }

    function onModalPrev(e) {
        e.preventDefault()

        if (currentImageIdx == 0)
            currentImageIdx = carouselImages.length - 1
        else
            currentImageIdx--

        refreshModal()
    }


    $('.next.nav-btn').click(onModalNext)

    $('.previous.nav-btn').click(onModalPrev)

    $('[data-action="show-modal"]').click(function () {
        var clickedImage = $(this).parent().find('.carousel-image');
        currentImageIdx = clickedImage.attr("id");

        refreshModal(currentImageIdx)

        $('.modal').modal();
    });

    $('.form-control').keyup(function () {
        $(this).parent().find('.floating-label').toggleClass('float', $(this).val().length > 0);
    });
});
