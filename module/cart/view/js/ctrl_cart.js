function addCart(element){
    var id_housing = $(element).attr("id");
    console.log("id_housing", id_housing);
    var access_token = localStorage.getItem('access_token');
    var refresh_token = localStorage.getItem('refresh_token');
    if(access_token && refresh_token){
        ajaxPromise(friendlyURL('?module=cart'), 'POST', 'JSON', {'access_token': access_token, 'id': id_housing, 'op':'add_update_Cart'})
        .then(function(data) {
            if (data === "insert" || data === "update") {
                console.log("addCart --> insert/update");
                updateItemsCart();
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
    updateItemsCart()
});