$(document).ready(function () {
  
  var productId = window.location.search.split('=')[1];
  var productObj = null;

  $.get(`https://5d76bf96515d1a0014085cf9.mockapi.io/product/${productId}`, function (response) {

    productObj = response;


    // if (productObj.isAccessory == false) {
    //     document.body.style.backgroundImage = 'url("/public/clothing-bg.jpg.avif")';
    //     document.body.style.backgroundSize = 'cover';
    // } else {
    //     document.body.style.backgroundImage = 'url("/public/accessories-bg3.jpg")';
    //     document.body.style.backgroundSize = 'cover';
    // }

    // Update product details
    $('#productImg').attr('src', productObj.preview);
    $('#name').html(productObj.name);
    $('#brand').html(productObj.brand);
    $('#price').html(`Price: Rs <span>${productObj.price}</span>`);
    $('#description').html(productObj.description);

    // Create preview images
    for (var i = 0; i < productObj.photos.length; i++) {
      $('#previewImages').append(createPreviewImages(productObj.photos[i], i));
    }
  });

  function createPreviewImages(pImg, i) {
    var previewImage = $('<img>').attr('src', pImg);

    if (i === 0) {
      previewImage.addClass('active');
    }

    previewImage.click(function () {
      $('#previewImages img').removeClass('active');
      previewImage.addClass('active');
      $('#productImg').attr('src', pImg);
    });

    return previewImage;
  }


  $("#add-to-cart").click(function () {
    var isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
    //   var cartList = JSON.parse(localStorage.getItem("cart")) || [];
    //   cartList.push(productObj);
    //   localStorage.setItem("cart",JSON.stringify(cartList));
    //   location.reload();

    if (isLoggedIn == null || isLoggedIn == false) {
      alert("Log In to access Cart");
      return false
    } else {

      var cartList = JSON.parse(localStorage.getItem('cart')) || [];

      var index = -1;
      for (var i = 0; i < cartList.length; i++) {
        if (parseInt(cartList[i].id) === parseInt(productObj.id)) {
          index = i;
          break; // Optimize by exiting the loop when found
        }
      }

      if (index > -1) {
        cartList[index].quantity += 1;
      } else {
        productObj.quantity = 1;
        cartList.push(productObj);
      }

      localStorage.setItem('cart', JSON.stringify(cartList));
      location.reload(); // Refresh the page
    }

  })
})

