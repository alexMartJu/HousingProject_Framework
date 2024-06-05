function ajaxPromise(sUrl, sType, sTData, sData = undefined) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: sUrl,
            type: sType,
            dataType: sTData,
            data: sData
        }).done((data) => {
            resolve(data);
        }).fail((jqXHR, textStatus, errorThrow) => {
            reject(errorThrow);
        }); 
    });
};
// function ajaxPromise(sType, sTData, sUrl, sData = undefined)

/* FRIENDLY URL */
function friendlyURL(url) {
    var link = "";
    url = url.replace("?", "");
    url = url.split("&");
    cont = 0;
    for (var i = 0; i < url.length; i++) {
    	cont++;
        var aux = url[i].split("=");
        if (cont == 2) {
        	link += "/" + aux[1] + "/";	
        }else{
        	link += "/" + aux[1];
        }
    }
    return "http://localhost/Framework/HousingProject_Framework" + link;
}

//================LOAD-HEADER================
function load_menu() {
    $('#navbar ul').empty();
    $('<li></li>').html('<a href="' + friendlyURL("?module=home") + '" class="active">Home</a>').appendTo('#navbar ul');
    $('<li></li>').html('<a href="' + friendlyURL("?module=shop") + '">Shop</a>').appendTo('#navbar ul');
    $('<div class="login-register-button"></div>').appendTo('#navbar ul'); 
    $('<div class="logout_login-button"></div>').appendTo('#navbar ul'); 

    var access_token = localStorage.getItem('access_token');
    var refresh_token = localStorage.getItem('refresh_token');
    if (access_token && refresh_token) {
        ajaxPromise(friendlyURL("?module=login"), 'POST', 'JSON', { 'access_token': access_token, 'op': 'data_user'})
            .then(function(data) {
                if (data.type_user == "client") {
                    console.log("Client loged");
                    $('.login-register-button').empty();
                } else {
                    console.log("Admin loged");
                    $('.login-register-button').empty();
                }
                $('.logout_login-button').empty(); //para que no se pinte mas veces cuando se refresque token
                $('.logout_login-button').show();

                // Crear y añadir el icono del carrito de compras al principio de la lista
                var $cartItem = $('<li></li>').prependTo('#navbar ul');
                var $cartLink = $('<a class="a_cart" href="' + friendlyURL("?module=cart") + '"></a>').appendTo($cartItem);
                $('<img>', {
                    src: 'http://localhost/Framework/HousingProject_Framework/view/icons/cart/cart-shopping-solid.svg',
                    class: 'cart_header',
                    alt: 'Shopping Cart'
                }).appendTo($cartLink);
                // Añadir el span para el número de artículos en el carrito
                var $cartCount = $('<span class="cart-count"></span>').appendTo($cartLink);
                
                // Crear el contenedor para la imagen y el botón
                var $container_avatar_logout = $('<div></div>').appendTo('.logout_login-button');

                // Crear la imagen con una clase
                var $avatar = $('<img src="' + data.avatar + '" alt="Robot">').addClass('avatar-image');
                $avatar.appendTo($container_avatar_logout);

                // Crear el texto del nombre de usuario
                var $username = $('<span class="span_username_logout" title="' + data.username + '">' + data.username + '</span>').addClass('username-text');
                $username.appendTo($container_avatar_logout);

                // Crear el botón de logout y el enlace de usuario
                $('<button class=btn-logout id="logout">Logout</button>').appendTo($container_avatar_logout);

            }).catch(function() {
                console.log("Error al cargar los datos del user");
            });
    } else {
        console.log("No hay token disponible");
        $('.logout_login-button').empty();
        // $('<button class="btn-login-reg" onclick="window.location.href=\'index.php?page=controller_login&op=login-register_view\'">Login/Register</button>').appendTo('.login-register-button');
        $('<button class="btn-login-reg" onclick="window.location.href=\'' + friendlyURL("?module=login") + '\'">Login/Register</button>').appendTo('.login-register-button');
    }
}


//================CLICK-LOGOUT================
function click_logout() {
    $(document).on('click', '#logout', function() {
        Swal.fire({
            icon: 'success',
            title: 'Logout successful',
            text: 'See you soon !',
            timer: 2500, // Mostrar la alerta durante 3 segundos
            showConfirmButton: false, // Ocultar el botón de confirmación
          }).then((result) => {
            // Después de que la alerta se cierre automáticamente
            logout(); // Llamar a la función logout después de 2 segundos y medio
          });
    });
}

//================LOGOUT================
function logout() {
    ajaxPromise(friendlyURL("?module=login"), 'POST', 'JSON', { 'op': 'logout'})
        .then(function(data) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            window.location.href = friendlyURL("?module=home");
        }).catch(function() {
            console.log('Something has occured');
        });
}

//================LOAD_CONTENT================
function load_content() {
    let path = window.location.pathname.split('/');
    console.log("path ", path);
    if(path[4] === 'recover'){
        console.log("recover");
        window.location.href = friendlyURL("?module=login&op=recover_view");
        localStorage.setItem("token_email", path[5]);
    }else if (path[4] === 'verify') {
        console.log("verify");
        ajaxPromise(friendlyURL("?module=login"), 'POST', 'JSON', {token_email: path[5], 'op':'verify_email'})
        .then(function(data) {
            if (data == "verify") {
                Swal.fire({
                    icon: 'success',
                    title: 'Email Verified.Registration Successful',
                    text: 'Welcome to Housing Project!',
                    timer: 3000, // Mostrar la alerta durante 3 segundos
                    showConfirmButton: false, // Ocultar el botón de confirmación
                  }).then((result) => {
                    // Después de que la alerta se cierre automáticamente
                    window.location.href = friendlyURL("?module=login");
                  });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Register Token Expired',
                    text: 'The Register token expired. A new email has been sent to verify you.',
                    showConfirmButton: false,
                    timer: 5000
                  }).then(function() {
                      // Redireccionar después de un registro exitoso
                      window.location.href = friendlyURL("?module=login");
                  });
            }
        })
        .catch(function() {
          console.log('Error: verify email error');
        });
    }else if (path[4] === 'recover_view') {
        console.log("recover_view ");
        load_form_new_password();
    }else if (path[3] === 'login') {
        console.log("login ");
        $(".login-wrap").show();
        $(".forget_html").hide();
    }
}

function addCart(element){
    var id_housing = $(element).attr("id");
    console.log("id_housing", id_housing);
    var access_token = localStorage.getItem('access_token');
    var refresh_token = localStorage.getItem('refresh_token');
    if(access_token && refresh_token){
        ajaxPromise(friendlyURL('?module=cart'), 'POST', 'JSON', {'access_token': access_token, 'id': id_housing, 'op':'add_update_Cart'})
        .then(function(data) {
            console.log("addCart", data);
            if (data === "insert" || data === "update") {
                console.log("addCart --> insert/update");
                updateItemsCart();
            }else if (data === "exceeds_stock") {
                Swal.fire({
                    icon: 'warning',
                    title: 'Stock Limit Exceeded',
                    text: 'You have reached the maximum stock available for this item.',
                    showConfirmButton: false,
                    timer: 2000
                });
            } else if (data === "out_of_stock") {
                Swal.fire({
                    icon: 'warning',
                    title: 'Out of Stock',
                    text: 'This item is currently out of stock.',
                    showConfirmButton: false,
                    timer: 2000
                });
            }
        }).catch(function(error) {
            console.log("Error ajaxPromise addCart", error);
        });  
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Restricted Cart Action',
            text: 'You need to be logged in to buy something',
            showConfirmButton: false,
            timer: 2000
        }).then(function() {
            window.location.href = friendlyURL('?module=login');
        });
    }
}

function updateItemsCart() {
    var access_token = localStorage.getItem('access_token');
    var refresh_token = localStorage.getItem('refresh_token');
    if(access_token && refresh_token){
        ajaxPromise(friendlyURL('?module=cart'), 'POST', 'JSON', {'access_token': access_token, 'op':'updateItemsCart'})
        .then(function(data) {
            if(data.type === "numberItems") {
                console.log("Entro updateItemsCart()", data.number_lines);
                $('.cart-count').text(data.number_lines);
            } else if(data.type === "error") {
                console.log("Error: No se pudo obtener el número de líneas");
            } else {
                console.log("Error: Respuesta desconocida del servidor");
            }
        }).catch(function(error) {
            console.log("Error ajaxPromise addCart", error);
        });  
    }
}

$(document).ready(function() {
    load_menu();
    click_logout();
    setTimeout(function() {
        updateItemsCart();
    }, 500);
    load_content()
});