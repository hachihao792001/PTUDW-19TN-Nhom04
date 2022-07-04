function stringToSlug(str) {
  // remove accents
  var from = "àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ",
      to   = "aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy";
  for (var i=0, l=from.length ; i < l ; i++) {
    str = str.replace(RegExp(from[i], "gi"), to[i]);
  }

  str = str.toLowerCase()
        .trim()
        .replace(/[^a-z0-9\-]/g, '-')
        .replace(/-+/g, '-');

  return str;
}

window.addEventListener("load", function () {
    const API_URL = "http://localhost:3000";

    $("#myModal").on("shown.bs.modal", function () {
        $("#myInput").trigger("focus");
    });

		$("#searchBar").on("keyup", function () {
			var value = stringToSlug($(this).val().toLowerCase());
			const productItems = document.querySelectorAll(".productItem");
			const productNames = document.querySelectorAll(".productName"); 
			productItems.forEach(function (productItem, index) {
				const productName = stringToSlug(productNames[index].innerText.toLowerCase() );
				if (productName.indexOf(value) != -1) {
					productItem.style.display = "block";
				} else {
					productItem.style.display = "none";
				}
			});
		})

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

    const updateLocalCart = (productId, quantity) => {
        const cartJson = localStorage.getItem("cart") || "{}";
        const localCart = JSON.parse(cartJson);
        let { products } = localCart;
        const newProducts = [...products].find(
            (product) => product._id === productId
        );
        if (!newProducts) {
            products.push({
                _id: productId,
                quantity,
            });
        } else {
            for (let i = 0; i < products.length; i++) {
                if (products[i]._id === productId) {
                    if (quantity === 0 || products[i].quantity == 0) {
                        products.splice(i, 1);
                    } else {
                        products[i].quantity = quantity;
                    }
                    break;
                }
            }
        }
        localStorage.setItem("cart", JSON.stringify({ products }));
    };

    const userId = document.querySelector("#userId").innerHTML;

    const calculateTotalPriceCart = () => {
        const productsJson = localStorage.getItem("products") || "[]";
        const productsConverted = JSON.parse(productsJson);
        const { products } = productsConverted;

        let productsMap = {};

        for (let i = 0; i < products.length; i++) {
            productsMap[products[i]._id] = products[i];
        }

        const cartJson = localStorage.getItem("cart") || "{}";
        const cart = JSON.parse(cartJson);

        let total = 0;
        let totalQuantity = 0;

        if (cart?.products?.length > 0) {
            cart?.products.forEach(function (product) {
                const productItem = productsMap[product._id];
                total += product.quantity * productItem.price;
                totalQuantity += product.quantity;
            });
        }
        $("#totalPriceCart").html(numberWithCommas(total));
        $("#total-products-price").html(numberWithCommas(total));
        $("#total-products-quantity").html(totalQuantity);
    };

    calculateTotalPriceCart();

    const UpdateDBCart = async (product) => {
        let formData = new FormData();
        formData.append("userId", parseInt(userId));
        formData.append("productId", parseInt(product._id));
        formData.append("quantity", parseInt(product.quantity));

        try {
            await fetch(`${API_URL}/cart`, {
                method: "POST",
                body: formData,
            });
            updateLocalCart(product._id, product.quantity);
        } catch (error) {
            console.log(error);
        }
    };

    const DeleteDBCart = async (product) => {
        let formData = new FormData();
        formData.append("userId", parseInt(userId));
        formData.append("productId", parseInt(product._id));

        try {
            await fetch(`${API_URL}/cart`, {
                method: "DELETE",
                body: formData,
            });
        } catch (error) {
            console.log(error);
        }
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

        if (cart?.products?.length > 0) {
            let total = 0;

            cart?.products.forEach(function (product) {
                const productItem = productsMap[product._id];
                total += product.quantity * productItem.price;

                const productItemElements = $(
                    $.parseHTML(`
                        <div class='item'>
                            <div class='img'>
                                <img src="${productItem.image}" 
                                    alt="${productItem.image}" />
                            </div>
                            <div class='info'>
                                <h3>${productItem.name}</h3>
                                <p>${productItem.description}</p>
                                <span>Giá: ${numberWithCommas(
                                    productItem.price
                                )}</span>
                            </div>
                            <div class='select'>
                                <div class='quantity'>
                                    <i data-product-id="${product._id}" 
                                        class='fa-solid fa-minus minus-cart-button'></i>

                                    <input data-product-id="${product._id}" 
                                        type='number' class="quantity-cart-input" 
                                        value="${product.quantity}" />

                                    <i data-product-id="${product._id}" 
                                        class='fa-solid fa-plus plus-cart-button'></i>
                                </div>
                            </div>
                        </div>
                    `)
                );

                const minusButton =
                    productItemElements.find(".minus-cart-button");
                const plusButton =
                    productItemElements.find(".plus-cart-button");
                const quantityInput = productItemElements.find(
                    ".quantity-cart-input"
                );

                minusButton.on("click", async function () {
                    const quantity = parseInt(quantityInput.val());
                    if (quantity > 1) {
                        quantityInput.val(quantity - 1);
                        await UpdateDBCart({
                            _id: productItem._id,
                            quantity: quantity - 1,
                        });
                        calculateTotalPriceCart();
                    }
                });
                plusButton.on("click", async function () {
                    const quantity = parseInt(quantityInput.val());
                    quantityInput.val(quantity + 1);
                    await UpdateDBCart({
                        _id: productItem._id,
                        quantity: quantity + 1,
                    });
                    calculateTotalPriceCart();
                });

                quantityInput.on("change", async function () {
                    const quantity = parseInt(quantityInput.val());
                    if (quantity < 1) {
                        quantityInput.val(1);
                        await UpdateDBCart({
                            _id: productItem._id,
                            quantity: 1,
                        });
                        return;
                    }
                    await UpdateDBCart({ _id: productItem._id, quantity });
                    calculateTotalPriceCart();
                });

                popUpContent.append(productItemElements);
            });

            popUpContent.append(`
			<div class='total'>
			<span>Tổng tiền: <span id="totalPriceCart">${numberWithCommas(
                total
            )}</span></span>
		</div>
				`);
        } else {
            popUpContent.append(`
			<div class='total'>
			<span>Tổng tiền: <span id="totalPriceCart">${numberWithCommas(0)}</span></span>
		</div>
				`);
        }
    };

    updatePopupCart();

    const btnAddProducts = document.querySelectorAll(".btn-add");

    btnAddProducts.forEach(function (btn) {
        const localCart = localStorage.getItem("cart") || "{}";
        const cart = JSON.parse(localCart) || {};
        const productId = btn.getAttribute("data-product-id");
        let hasProduct = false;

        if (cart["products"]) {
            cart["products"].forEach(function (product) {
                if (product._id === parseInt(productId)) {
                    hasProduct = true;
                    btn.innerText = "Xóa";
										btn.classList.add("btn-delete");
                }
            });
        }

        updatePopupCart();

        btn.addEventListener("click", async function () {
            const localCart = localStorage.getItem("cart") || "{}";
            const cart = JSON.parse(localCart) || {};
            const productId = btn.getAttribute("data-product-id");
            let hasProduct = false;

            if (cart["products"]) {
                cart["products"].forEach(function (product) {
                    if (product._id === parseInt(productId)) {
                        hasProduct = true;
                    }
                });
            }

            console.log("Cart", cart);

            if (hasProduct) {
                cart["products"].forEach(function (product, index) {
                    if (product._id == productId) {
                        cart["products"].splice(index, 1);
                    }
                });
								localStorage.setItem("cart", JSON.stringify(cart));
                await DeleteDBCart({ _id: productId });
                calculateTotalPriceCart();
                this.innerText = "Thêm";
								btn.classList.remove("btn-delete");
            } else {
                let newProduct = {
                    _id: parseInt(productId),
                    quantity: 1,
                };
                cart["products"].push(newProduct);
								localStorage.setItem("cart", JSON.stringify(cart));
                await UpdateDBCart(newProduct);
                calculateTotalPriceCart();
                this.innerText = "Xóa";
								btn.classList.add("btn-delete");
            }

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

document.querySelector('#btnOrderNow').addEventListener('click', openCart);

const btnOrder = document.getElementById('btn-order');
btnOrder.addEventListener('click', function () {
  console.log('inside handle payment event');
  const name = document.getElementById('nameOrder').value;
  const phone = document.getElementById('phoneOrder').value;
  const address = document.getElementById('addressOrder').value;
  const payment = document.getElementById('paymentMethodOrder').value;
  const customer_id = document.querySelector('#userId').innerHTML;

  const cartId = document.getElementById('keyOrder').getAttribute('key');
  const status = 'new';
  const date = Date.now();
  const total = document.getElementById('totalOrder');
  const email = '';
  const newOrder = {
    cartId: cartId,
    customer_id: customer_id,
    payment: payment,
    total: total,
    date: date,
    status: status,
    customer_name: name,
    customer_email: email,
    customer_phone: phone,
    customer_address: address,
  };
  CreateNewOrder(newOrder);
});

const CreateNewOrder = async (newOrder) => {
  console.log('inside handle CreateNewOrder event');

  let formData = new FormData({ ...newOrder });
  try {
    await fetch(`${API_URL}/order`, {
      method: 'POST',
      body: formData,
    });
  } catch (error) {
    console.log(error);
  }
};
