$(document).ready(function () {
   var isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"))
    // Check cart items and update the cart count
    let totalCount = 0;
    const cartList = JSON.parse(localStorage.getItem("cart")) || [];
    checkCartItems();

    function checkCartItems() {
        for (let i = 0; i < cartList.length; i++) {
            totalCount += cartList[i].quantity || 0;
        }
        const cartCountElement = document.getElementById('cart-count');
        if (isLoggedIn == null || isLoggedIn == false) {
            cartCountElement.textContent = `(0)`;
        } else {
            if (cartCountElement) {
                cartCountElement.textContent = `(${totalCount})`;
            }
        }

    }
    $("#login-btn").on("click",function(){
        if(isLoggedIn == null){
            localStorage.setItem("isLoggedIn",JSON.stringify(true));
        }
        else if(isLoggedIn == false){
            localStorage.setItem("isLoggedIn",JSON.stringify(true));
        }
        else{
            localStorage.setItem("isLoggedIn",JSON.stringify(false));
        }
        location.reload();
    })

    checkForLogin();

    function checkForLogin() {
        if (isLoggedIn == null) {
            disableHref();
            $('#login-btn').html('Sign Up');
        } else if (isLoggedIn == false) {
            disableHref();
            $('#login-btn').html('Log In');
        } else {
            enableHref();
            $('#login-btn').html('Log Out');
        }
    }

    function disableHref() {
        $('#cart-link').attr('href', "");
    }

    function enableHref() {
        $('#cart-link').attr('href',`./cart.html`);
}
})
