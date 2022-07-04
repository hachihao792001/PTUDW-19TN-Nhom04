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

    const numberWithCommas = (x, unit = "đ") => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + unit;
    };

    const updatePopupCart = () => {
        const productsJson = localStorage.getItem("products") || "[]";
        const productsConverted = JSON.parse(productsJson);
        const { products } = productsConverted;

        let productsMap = {};

        for (let i = 0; i < products.length; i++) {
            productsMap[products[i]._id] = products[i];
        }

        const cartJson = localStorage.getItem("cart") || "{}";
        const cart = JSON.parse(cartJson);

        const popUpContent = $("#cartModal #myPopup");
        popUpContent.html("");

        console.log(cart.products);

        if (cart?.products?.length > 0) {
            let total = 0;

            cart?.products.forEach(function (product) {
                const productItem = productsMap[product.id];
                total += product.quantity * productItem.price;
                popUpContent.append(`
					<div class='item'>
					<div class='img'>
						<img src="${productItem.image}" alt="${productItem.image}" />
					</div>
					<div class='info'>
						<h3>${productItem.name}</h3>
						<p>${productItem.description}</p>
						<span>Giá: ${numberWithCommas(productItem.price)}</span>
					</div>
					<div class='select'>
						<div class='quantity'>
							<i data-product-id="${
                                product.id
                            }" class='fa-solid fa-minus minus-cart-button'></i>
							<input data-product-id="${
								product.id
						}" type='number' class="quantity-cart-input" value="${product.quantity}" />
							<i data-product-id="${
                                product.id
                            }" class='fa-solid fa-plus plus-cart-button'></i>
						</div>
					</div>
				</div>
					`);
            });

            popUpContent.append(`
					<div class='total'>
						<span id='TotalAmount'>Tổng tiền: ${numberWithCommas(total)}</span>
					</div>
				`);
        } else {
            popUpContent.append(`
					<div class='total'>
						<span id='TotalAmount'>Tổng tiền: 0</span>
					</div>
				`);
        }
    };

		updatePopupCart();

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

        updatePopupCart();

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
            updatePopupCart();
        });
    });

    $("#cartModal").on("shown.bs.modal", function () {
        updatePopupCart();
    });
});

const openCart = function () {
    console.log("chay vo open cart roi");
    document.getElementById("cart").click();
};

document.querySelector("#btnOrderNow").addEventListener("click", openCart);
