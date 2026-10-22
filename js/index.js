
    
    console.log("hiii");
    function calculateitemprice(price,quantity){
        return price*quantity;
    }

    let cartrows=document.querySelectorAll("#shopping-cart tbody tr");

    function calculateSubtotal(){
        let subtotal=0;
        let cartrows=document.querySelectorAll("#shopping-cart tbody tr");

        cartrows.forEach(function(row){
            let priceText =  row.children[1].textContent;
            let price = parseFloat(priceText.replace("₹", "")  );
        let quantityText = row.querySelector( ".quantity-box span" ).textContent;
        let quantity = parseInt(quantityText);
        let itemTotal = calculateitemprice(price,quantity);
        subtotal += itemTotal;
        });
        return subtotal;
    }   
        
    function calculateDeliverycharges(subtotal){
        if(subtotal===0)
        {
            return 0;
        }
        return 30;
    }

    function calculatePackagingCharge(subtotal) {
    if (subtotal === 0) {
        return 0;
    }
    return 20;
}

function calculateDiscount(subtotal) {
    if (subtotal > 500) {
        return subtotal * 0.10;
    }
    return 0;
}

function calculateTotal(subtotal,deliveryCharge,packagingCharge,discount) {
    return subtotal + deliveryCharge + packagingCharge - discount;
}

function updateOrderSummary() {
  
   let subtotalElement = document.getElementById("subtotal-amount");
    if (!subtotalElement) {
        return;
    }

    let subtotal = calculateSubtotal();
    let deliveryCharge =calculateDeliverycharges(subtotal);
    let packagingCharge = calculatePackagingCharge(subtotal);
    let discount = calculateDiscount(subtotal);
    let totalAmount = calculateTotal(subtotal, deliveryCharge, packagingCharge, discount);


    document.getElementById("subtotal-amount").textContent = "₹" + subtotal.toFixed(2);
    document.getElementById("delivery-amount").textContent = "₹" + deliveryCharge.toFixed(2);

  document.getElementById("packaging-amount").textContent = "₹" + packagingCharge.toFixed(2);

    document.getElementById("discount-amount").textContent = "-₹" + discount.toFixed(2);

    document.getElementById( "total-amount").textContent = "₹" + totalAmount.toFixed(2);

}

let cart=JSON.parse(localStorage.getItem("biteboxCart"))||[];
let menuContainer=document.getElementById("menu-items");
if(menuContainer){
    menuContainer.addEventListener("click",function(event){
        let button=event.target.closest("button");
      /*  if (!button) {
            return;
        }*/
        if ( button.textContent.includes("Add to Cart")) {
          
            let card = button.closest("article");
          
            addToCart(card);
        }

    });
}
console.log(menuContainer);

function addToCart(card) {
    let name = card.querySelector("h3").textContent.trim();
 
    let priceText = card.querySelector(".price") .textContent;
 
    let price = parseFloat( priceText.replace("₹", ""));
 
    let image = card.querySelector("img").getAttribute("src");
 
    console.log("Name:", name);
    console.log("Price:", price);
    console.log("Image:", image);


let cartItem={
    name :name,
    price:price,
    image:image,
    quantity:1

};

let existingItem =
    cart.find(function(item) {
        return item.name === name;
    });

if(existingItem)
{
    existingItem.quantity++;
}
else 
{
    cart.push(cartItem);
}
console.log("cart",cart);
localStorage.setItem("biteboxCart",JSON.stringify(cart));
renderCart();
}



//dynamically aad to cart 
let cartBody=document.querySelector("#shopping-cart tbody");

console.log(cartBody);


function renderCart(){
    if(!cartBody){
        console.log("rendercart");
        return;
    }
    cartBody.innerHTML="";

    if (cart.length === 0) {

        let row = document.createElement("tr");

    
        row.innerHTML = `

            <td colspan="5">

                <div class="empty-cart">

                    <h3> Your Cart is Empty</h3>

                    <p>
                        Add some delicious food
                        from our Menu!
                    </p>



            </div>

            </td>

        `;


        cartBody.appendChild(row);

        return;

    }

    cart.forEach(function(item,index)
    {
    let itemTotal=item.price* item.quantity;
    let row=document.createElement("tr");
    console.log(row);
    row.innerHTML=
                    `<td>

                <div class="cart-item">

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                    >

                    <div>

                        <h3>
                            ${item.name}
                        </h3>

                    </div>

                </div>

            </td>

            <td>
                ₹${item.price}
            </td>
            <td>

                <div class="quantity-box">

                    <button
                        class="decrease"
                        data-index="${index}">
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        class="increase"
                        data-index="${index}">
                        +
                    </button>

                </div>

            </td>


            <td>
                ₹${itemTotal.toFixed(2)}
            </td>
            <td>

    <a href="#" class="remove-item" data-index="${index}">

    <img src="assets/icons/delete.png" alt="Delete" width="25">

    </a>

            </td>`;
            cartBody.appendChild(row);
});
   

}
renderCart();

//search a specifc item in the cart 
let menucards=document.querySelectorAll("#menu-items article");
function searchMenu(){
    let searchv=document.querySelector("input").value.trim().toLowerCase();
    menucards.forEach((card)=>{
        let foodName=card.querySelector("h3").textContent.trim().toLowerCase();
        if(foodName.includes(searchv)){
            card.style.display="";
        }
        else{
            card.style.display="none";
        }
    })
}

//search by category
let categorybuttons=document.querySelectorAll("#category-buttons button");
function filterMenu(category) {
 
    menucards.forEach(function(card) {
        let cardCategory = card.dataset.category.toLowerCase();
 
        if (cardCategory === category) {
            card.style.display = "";
        }
        else {
            card.style.display = "none";
        }
    });
 
}

categoryCards.forEach(
    function(card) {
 
        card.addEventListener("click",function() {
                let category = card.querySelector("h3")
                        .textContent
                        .trim()
                        .toLowerCase();
                filterMenu(category);
            }
        );
    }
);

//toggle theme day and night mode 

let themeButton = document.getElementById("theme-toggle");


function toggleTheme() {
    document.body.classList.toggle("dark-theme");

    let themeIcon = themeButton.querySelector(".theme-icon");
  
    let themeText = themeButton.querySelector(".theme-text");

    if (document.body.classList.contains("dark-theme")) {
        themeIcon.textContent = "☾";
        themeText.textContent ="NIGHT MODE";
        localStorage.setItem("biteboxTheme","dark");
    }  

 else {
        themeIcon.textContent = "☀";
        themeText.textContent ="DAY MODE";
        localStorage.setItem("biteboxTheme","light");

    }
}

function loadTheme() {
    let savedTheme = localStorage.getItem("biteboxTheme");

    /* Disable animation while loading */
    document.body.classList.add("theme-loading");

    if (savedTheme === "dark") {
       document.body.classList.add("dark-theme");
    }


else {
        document.body.classList.remove("dark-theme");
    }

    let themeIcon = themeButton.querySelector(".theme-icon");

    let themeText = themeButton.querySelector(".theme-text");

    if (savedTheme === "dark") {
        if (themeIcon) {
            themeIcon.textContent ="☾";
        }

        if (themeText) {
            themeText.textContent = "NIGHT MODE";
        }
    }

    else {

        if (themeIcon) {
            themeIcon.textContent = "☀";
        }


        if (themeText) {
            themeText.textContent = "DAY MODE";
        }
    }

    /* Allow animation again */
    setTimeout(function () {
        document.body.classList.remove("theme-loading");
    }, 50);

}

if (themeButton) {
     themeButton.addEventListener("click",function () {
            toggleTheme();
        }
    );
}
loadTheme();