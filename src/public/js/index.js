window.addEventListener("load", function () {
    $("#myModal").on("shown.bs.modal", function () {
        $("#myInput").trigger("focus");
    });

    $(document).ready(function () {
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
            responsive: [
                {
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
            responsive: [
                {
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

    const btnAddProducts = document.querySelectorAll(".btn-add");

    btnAddProducts.forEach(function (btn) {
        btn.addEventListener("click", function () {
            const localCart = localStorage.getItem("cart") || "{}";
            const cart = JSON.parse(localCart) || {};
            const productId = this.getAttribute("data-product-id");

            let hasProduct = false;

            if (cart["products"]) {
                cart["products"].forEach(function (product) {
                    if (product.id == productId) {
                        hasProduct = true;
                    }
                });
            } else {
                cart["products"] = [];
                cart["products"].push({
                    id: productId,
                    quantity: 1,
                });
            }

            if (hasProduct === true) {
                this.innerText = "Xóa khỏi giỏ hàng";
            }

            localStorage.setItem("cart", JSON.stringify(cart));
        });
    });

    btnAddProducts.forEach(function (btn) {
        const localCart = localStorage.getItem("cart") || "{}";
        const cart = JSON.parse(localCart) || {};
        const productId = btn.getAttribute("data-product-id");
        let hasProduct = false;

        if (cart["products"]) {
            cart["products"].forEach(function (product) {
                if (product.id === productId) {
                    hasProduct = true;
                    btn.innerText = "Xóa khỏi giỏ hàng";
                }
            });
        }

        btn.addEventListener("click", function () {
            const localCart = localStorage.getItem("cart") || "{}";
            const cart = JSON.parse(localCart) || {};
            const productId = btn.getAttribute("data-product-id");
            let hasProduct = false;

            if (cart["products"]) {
                cart["products"].forEach(function (product) {
                    if (product.id === productId) {
                        hasProduct = true;
                    }
                });
            }
            console.log(cart);
            if (hasProduct) {
                cart["products"].forEach(function (product, index) {
                    if (product.id == productId) {
                        cart["products"].splice(index, 1);
                    }
                });
                this.innerText = "Thêm";
            } else {
                cart["products"].push({
                    id: productId,
                    quantity: 1,
                });
                this.innerText = "Xóa khỏi giỏ hàng";
            }

            localStorage.setItem("cart", JSON.stringify(cart));
        });
    });
});

const openCart = function () {
    console.log("chay vo open cart roi");
    document.getElementById("cart").click();
};

document.querySelector("#btnOrderNow").addEventListener("click", openCart);
