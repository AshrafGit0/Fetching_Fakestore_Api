function bodyload() {
    LoadCategories();
    LoadProducts("https://fakestoreapi.com/products");
    GetCartCount();
    activeLinks();
}
function LoadCategories() {
    fetch("https://fakestoreapi.com/products/categories")
        .then(function (response) {
            return response.json();
        })
        .then(function (categories) {
            categories.unshift("all");
            categories.map(function (category) {
                var option = document.createElement("option");
                option.text = category.toUpperCase();
                option.value = category;
                document.getElementById("lstCategories").appendChild(option);
            });
        });
}
function LoadProducts(URL) {
    fetch(URL)
        .then(function (response) {
            return response.json();
        })
        .then(function (products) {
            document.querySelector("main").innerHTML = "";
            products.map(function (product) {
                var div = document.createElement("div");
                div.className = "card p-2 m-2";
                div.style.width = "250px";
                div.innerHTML = `
            <img class="card-img-top" src=${product.image} height="170">
              <div class="card-header overflow-auto mt-2" style="height:90px">
                ${product.title}
                </div>
                <div>
                    <dl>
                        <dt>Price</dt>
                        <dd>${product.price}</dd>
                        <dt>Ratings</dt>
                        <dd>${product.rating.rate} <span class="bi bi-star-fill text-success"></span>[${product.rating.count}]</dd>
                    </dl>
                </div>
                <div>
                    <button class="btn btn-dark bi bi-cart3 w-100" onclick="AddToCartClick(${product.id})">Add To Cart</button>
                </div>
            `;
                document.querySelector("main").appendChild(div);
            });
        });
}
function CategoryChange() {
    var categoryName = document.getElementById("lstCategories").value;
    if (categoryName == "all") {
        LoadProducts(`https://fakestoreapi.com/products`);
    } else {
        LoadProducts(`https://fakestoreapi.com/products/category/${categoryName}`);
    }
}
var cartItems = [];
function AddToCartClick(id) {
    fetch(`https://fakestoreapi.com/products/${id}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (product) {
            // alert(`${product.title} Added to cart`);
            cartItems.push(product);
            GetCartCount();
        })
}
function GetCartCount() {
    document.getElementById("CartCount").innerHTML = cartItems.length;
}
function ShowCartClick() {
    document.querySelector("tbody").innerHTML = "";
    cartItems.map(function (item) {
        var tr = document.createElement("tr");
        var tdTitle = document.createElement("td");
        var tdPreview = document.createElement("td");
        var tdPrice = document.createElement("td");
        tdTitle.innerHTML = item.title;
        tdPreview.innerHTML = `<img src=${item.image} width="50" height="50">`;
        tdPrice.innerHTML = item.price;

        tr.appendChild(tdTitle);
        tr.appendChild(tdPreview);
        tr.appendChild(tdPrice);
        document.querySelector("tbody").appendChild(tr);
    })
}

// navbar active links

function activeLinks() {
    const links = document.querySelectorAll("header nav span a");
    links.forEach((link) => {
        link.addEventListener("click", (e) => {
            document.querySelector(".active").classList.remove("active");
            e.target.classList.add("active");
        })
    })
    console.log(links);
}
