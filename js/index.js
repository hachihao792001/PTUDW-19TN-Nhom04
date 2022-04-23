window.addEventListener("load", function() {
            $(document).ready(function() {
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

                        const menuCategory = [{
                                name: "PHINDI",
                                id: "phindi",
                            },
                            {
                                name: "CÀ PHÊ TRUYỀN THỐNG",
                                id: "caphetruyenthong",
                            },
                            {
                                name: "CÀ PHÊ EXPRESSO",
                                id: "expresso",
                            },
                            {
                                name: "ĐÁ XAY",
                                id: "daxay",
                            },
                            {
                                name: "TRÀ",
                                id: "tra",
                            },
                            {
                                name: "THỨC UỐNG KHÁC",
                                id: "thucuongkhac",
                            },
                            {
                                name: "BÁNH NGỌT",
                                id: "banhngot",
                            },
                        ];

                        const menuItems = [{
                                categoryId: "phindi",
                                items: [{
                                        image: "./assets/images/daxay.jpg",
                                        name: "Đá xay chocolate",
                                        description: "Iced Chocolate",
                                        price: "39.000",
                                    },
                                    {
                                        image: "./assets/images/trasua.webp",
                                        name: "Trà sữa",
                                        description: "Milk Tea",
                                        price: "28.000",
                                    },
                                    {
                                        image: "./assets/images/tradao.webp",
                                        name: "Trà Đào",
                                        description: "Peach Tea",
                                        price: "39.000",
                                    },
                                    {
                                        image: "./assets/images/tradau.jpg",
                                        name: "Trà dâu",
                                        description: "Strawberry Tea",
                                        price: "32.000",
                                    },
                                ],
                            },
                            {
                                categoryId: "caphetruyenthong",
                                items: [{
                                        image: "./assets/images/capheden.jpg",
                                        name: "Cà phê đen",
                                        description: "Coffee",
                                        price: "39.000",
                                    },
                                    {
                                        image: "./assets/images/caphesua.jpg",
                                        name: "Cà phê sữa",
                                        description: "Latte",
                                        price: "32.000",
                                    },
                                    {
                                        image: "./assets/images/capheden.jpg",
                                        name: "Cà phê đen",
                                        description: "Coffee",
                                        price: "39.000",
                                    },
                                    {
                                        image: "./assets/images/daxay.jpg",
                                        name: "Đá xay chocolate",
                                        description: "Iced Chocolate",
                                        price: "35.000",
                                    },
                                ],
                            },
                            {
                                categoryId: "expresso",
                                items: [{
                                        image: "./assets/images/trasua.webp",
                                        name: "Trà sữa",
                                        description: "Milk Tea",
                                        price: "25.000",
                                    },
                                    {
                                        image: "./assets/images/tradao.webp",
                                        name: "Trà Đào",
                                        description: "Peach Tea",
                                        price: "39.000",
                                    },
                                    {
                                        image: "./assets/images/tradau.jpg",
                                        name: "Trà dâu",
                                        description: "Strawberry Tea",
                                        price: "27.000",
                                    },
                                    {
                                        image: "./assets/images/example_logo.jpeg",
                                        name: "Phindi hạnh nhân",
                                        description: "Iced PHIN Coffee with Almond Milk",
                                        price: "39.000",
                                    },
                                ],
                            },
                            {
                                categoryId: "daxay",
                                items: [{
                                        image: "./assets/images/daxay.jpg",
                                        name: "Đá xay chocolate",
                                        description: "Iced Chocolate",
                                        price: "29.000",
                                    },
                                    {
                                        image: "./assets/images/example_logo.jpeg",
                                        name: "Phindi hạnh nhân",
                                        description: "Iced PHIN Coffee with Almond Milk",
                                        price: "39.000",
                                    },
                                    {
                                        image: "./assets/images/tradao.webp",
                                        name: "Trà Đào",
                                        description: "Peach Tea",
                                        price: "39.000",
                                    },
                                    {
                                        image: "./assets/images/tradau.jpg",
                                        name: "Trà dâu",
                                        description: "Strawberry Tea",
                                        price: "29.000",
                                    },
                                ],
                            },
                            {
                                categoryId: "tra",
                                items: [{
                                        image: "./assets/images/tradao.webp",
                                        name: "Trà Đào",
                                        description: "Peach Tea",
                                        price: "39.000",
                                    },
                                    {
                                        image: "./assets/images/tradau.jpg",
                                        name: "Trà dâu",
                                        description: "Strawberry Tea",
                                        price: "39.000",
                                    },
                                    {
                                        image: "./assets/images/example_logo.jpeg",
                                        name: "Phindi hạnh nhân",
                                        description: "Iced PHIN Coffee with Almond Milk",
                                        price: "38.000",
                                    },

                                    {
                                        image: "./assets/images/tradau.jpg",
                                        name: "Trà dâu",
                                        description: "Strawberry Tea",
                                        price: "39.000",
                                    },
                                ],
                            },
                            {
                                categoryId: "thucuongkhac",
                                items: [{
                                        image: "./assets/images/example_logo.jpeg",
                                        name: "Phindi hạnh nhân",
                                        description: "Iced PHIN Coffee with Almond Milk",
                                        price: "39.000",
                                    },
                                    {
                                        image: "./assets/images/tiramisu.webp",
                                        name: "Tiramisu",
                                        description: "Iced PHIN Coffee with Almond Milk",
                                        price: "35.000",
                                    },
                                    {
                                        image: "./assets/images/example_logo.jpeg",
                                        name: "Phindi hạnh nhân",
                                        description: "Iced PHIN Coffee with Almond Milk",
                                        price: "39.000",
                                    },
                                    {
                                        image: "./assets/images/example_logo.jpeg",
                                        name: "Phindi hạnh nhân",
                                        description: "Iced PHIN Coffee with Almond Milk",
                                        price: "39.000",
                                    },
                                ],
                            },
                            {
                                categoryId: "banhngot",
                                items: [{
                                        image: "./assets/images/tiramisu.webp",
                                        name: "Tiramisu",
                                        description: "Iced PHIN Coffee with Almond Milk",
                                        price: "34.000",
                                    },

                                    {
                                        image: "./assets/images/tradao.webp",
                                        name: "Trà Đào",
                                        description: "Peach Tea",
                                        price: "32.000",
                                    },
                                    {
                                        image: "./assets/images/tradau.jpg",
                                        name: "Trà dâu",
                                        description: "Strawberry Tea",
                                        price: "39.000",
                                    },
                                ],
                            },
                        ];

                        const categoryMap = {};
                        menuCategory.forEach((category) => {
                            categoryMap[category.id] = category.name;
                        });

                        $(".menu-nav ul").append(
                            menuCategory.map(function(item) {
                                return `<li><a href="#${item.id}">${item.name}</a></li>`;
                            })
                        );

                        $(".menu-list__group").append(
                                menuItems.map(function(item) {
                                        return `<div class="menu-list__group__items" id="${
                    item.categoryId
                }">
					<h3>${categoryMap[item.categoryId]}</h3>
					<ul>
						${item.items.map(function (itemDetail) {
                            return `
							<li>
							<div class="row">
									<div class="col-6  col-md-2">
											<div class="item-logo">
													<img src="${itemDetail.image}" alt="${itemDetail.name}" />
											</div>
									</div>
									<div class="col-6 col-md-6">
											<div class="item-description">
													<h3 >
															${itemDetail.name}
													</h3>
													<h4>
															${itemDetail.description}
													</h4>
											</div>
									</div>
									<div class="col-6 col-md-2">
											<div class="item-price">
													${itemDetail.price}đ
											</div>
									</div>
									<div class="col-6 col-md-2">
											<div class="item-quantity">
													<i class="fa-solid fa-minus"></i>
													<input type="number" value="1" min="0"/>
													<i class="fa-solid fa-plus"></i>
											</div>
									</div>
							</div>
					</li>
							`;
                        })}
					</ul>
					</div>`;
            })
        );
    });
});