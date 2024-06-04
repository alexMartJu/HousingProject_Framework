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

function paint_cart() {
    var access_token = localStorage.getItem('access_token');
    var refresh_token = localStorage.getItem('refresh_token');
    if (access_token && refresh_token) {
        ajaxPromise(friendlyURL('?module=cart'), 'POST', 'JSON', {'access_token': access_token, 'op': 'paintCart'})
            .then(function(data) {
                console.log("Datos recibidos del servidor en paint_cart:", data);
                
                $(".cart__products").empty(); // Limpiar la tabla antes de agregar nuevas filas

                var currentLineHTML = {}; // Objeto para almacenar la información de cada línea del carrito


                // Iterar sobre los datos recibidos
                data.forEach(function(item) {
                    // Si aún no existe información para la línea actual, inicializarla
                    if (!currentLineHTML[item.id_line]) {
                        currentLineHTML[item.id_line] = {
                            image: item.img_housing,
                            rows: [],
                            deleteButtonAdded: false // Variable para asegurar que solo se agregue un botón de eliminar por línea
                        };
                    }

                    // Agregar información de la fila actual a la lista de filas de la línea actual
                    currentLineHTML[item.id_line].rows.push(
                        '<td>' + item.name_product + '</td>' +
                        '<td>' + item.price_product + '</td>' +
                        '<td>' +
                        '<div class="quantity-control">' +
                        '<button class="decrement-btn" data-id-line="' + item.id_line + '">-</button>' +
                        '<input type="number" class="quantity-input" data-id-line="' + item.id_line + '" data-id-product="' + item.id_product + '" data-id-housing="' + item.id_housing + '" value="' + item.quantity + '" min="0" readonly>' +
                        '<button class="increment-btn" data-id-line="' + item.id_line + '">+</button>' +
                        '</div>' +
                        '</td>'
                    );
                });

                // Construir las filas y agregarlas a la tabla del carrito
                for (var id_line in currentLineHTML) {
                    var rowHTML = '<tr>';
                    rowHTML += '<td rowspan="' + currentLineHTML[id_line].rows.length + '" class="housing-image"><img src="' + currentLineHTML[id_line].image + '" alt="Housing Image"></td>';
                    rowHTML += currentLineHTML[id_line].rows.join('</tr><tr>');
                    rowHTML += '</tr>';

                    $(".cart__products").append(rowHTML);

                    // Agregar el botón de eliminar si aún no se ha agregado
                    if (!currentLineHTML[id_line].deleteButtonAdded) {
                        $(".cart__products tr:last").append('<td><button class="delete-btn-cart" data-id-line="' + id_line + '">Delete</button></td>');
                        currentLineHTML[id_line].deleteButtonAdded = true;
                    }
                }
                
            })
            .catch(function() {
                console.log("Error creación tabla");
            });
    } else {
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

$(document).ready(function() {
    paint_cart();
    updateItemsCart()
});