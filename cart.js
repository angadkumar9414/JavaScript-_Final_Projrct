

var isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
if (isLoggedIn == null || isLoggedIn == false) {
    location.replace("./index.html");
}
var cartList = JSON.parse(localStorage.getItem("cart")) || [];
var totalAmont = 0

var totalItem = 0
for (var i = 0; i < cartList.length; i++) {
    $("#card-list").append(createCard(cartList[i], i));
    totalAmont += cartList[i].price * cartList[i].quantity
    totalItem += cartList[i].quantity
}
$("#item-count").html(totalItem);
$("#total-amount").html(totalAmont);



function createCard(cartObj, i) {
    var card = document.createElement('div');
    card.classList.add('checkout-card');

    card.innerHTML += `
    <div>
        <img class="checkout-product-img" src="${cartObj.preview}" />
    </div>
    <div>
        <h4>${cartObj.name}</h4>
        <div class="qty-wrapper">        
            <p>${cartObj.quantity}</p>
        </div>
        <button id ="Xbtn" onclick = removeItem(${i})>Remove Item</button>
        <p class = "price" >Price : <span>₹ ${cartObj.price}</span></p>
        <p class = "price" >Subtotal ( ${cartObj.quantity} items ): <span>₹ ${cartObj.price * cartObj.quantity}</span></p>
    </div>
    `;
    return card;
}

function removeItem(i) {
    cartList.splice(i, 1);
    localStorage.setItem("cart", JSON.stringify(cartList));
    location.reload();
}


var placeOrderElement = document.getElementById("btn-place-order");
placeOrderElement.addEventListener("click", function () {

    if (cartList.length == 0) {
        alert("No Items in The Cart");
    }
    else {

        var orderedItems = [];
        for(var i=0; i<cartList.length; i++){
            var obj = {
                "id": cartList[i].id,
                "brand": cartList[i].brand,
                "name": cartList[i].name,
                "price": cartList[i].price,
                "preview": cartList[i].preview,
                "isAccessory": cartList[i].isAccessory,
                "quantity": cartList[i].quantity
            }
            orderedItems.push(obj);
        }
       var orderObj={
        Amount : totalAmont,
        Items : totalItem,
        Products : orderedItems
       }
       var OrderList = JSON.parse(localStorage.getItem("orders")) || [];
       OrderList.push(orderObj);
       localStorage.setItem("orders",JSON.stringify(OrderList));

       try {
        $.ajax({
            type: 'POST',
            url: 'https://5d76bf96515d1a0014085cf9.mockapi.io/order',
            data: JSON.stringify(orderObj),
            contentType: 'application/json',
            success: function (response) {
                // Handle the success response here
                console.log('Success:', response);
            },
            error: function (xhr, status, error) {
                // Handle the error here
                console.log('Error:', xhr.responseText);
                throw new Error('POST request failed'); // Throw an error to trigger the catch block
            }
        });
    } catch (e) {
        // Handle exceptions here
        console.error('Exception:', e);
    } finally {
        localStorage.removeItem('cart');
        alert('Order Placed Successfully')

        location.assign('./confirmorder.html');
}
    }

})


