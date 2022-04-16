window.addEventListener("load", function () {
    $(document).ready(function () {
        $(".images-slider").slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            dots: true,
            arrows: true,
        });
    });
});
