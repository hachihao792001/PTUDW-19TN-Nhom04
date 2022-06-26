window.addEventListener("load", function() {
    $("#myModal").on("shown.bs.modal", function() {
        $("#myInput").trigger("focus");
    });

    $(document).ready(function() {
        AOS.init({ duration: 1000 });
        $(".promotion-slider").slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            dots: true,
            arrows: true,
            prevArrow: $(".slider-prev"),
            nextArrow: $(".slider-next"),
            autoplay: true,
            autoplaySpeed: 1500,
            responsive: [{
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 2,
                    },
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                    },
                },
            ],
        });
        $(".images-slider").slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            responsive: [{
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 2,
                    },
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                    },
                },
            ],
        });
    });
});

const openCart = function() {
    console.log("chay vo open cart roi");
    document.getElementById("cart").click();
};

document.querySelector("#btnOrderNow").addEventListener("click", openCart);