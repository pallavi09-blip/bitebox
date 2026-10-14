
    
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

let cart=[];
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
}

let cartBody=(
    document.querySelector("#shopping-cart tbody")
);

function renderCart(){
cartBody.innerHTML="";

}

function renderCart(){
    if(!cartBody){
        return;
    }
cartBody.innerHTML="";
cart.forEach(function(item,index){
    let itemTotal=item.price* item.quantity;
    let row=document.createElement("tr");
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

