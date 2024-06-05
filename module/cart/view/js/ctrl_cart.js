function paint_cart() {
    var access_token = localStorage.getItem('access_token');
    var refresh_token = localStorage.getItem('refresh_token');
    if (access_token && refresh_token) {
        ajaxPromise(friendlyURL('?module=cart'), 'POST', 'JSON', {'access_token': access_token, 'op': 'paintCart'})
            .then(function(data) {
                console.log("Datos recibidos del servidor en paint_cart:", data);
                
                $(".cart__products").empty(); // Limpiar la tabla antes de agregar nuevas filas

                var currentLineHTML = {}; // Objeto para almacenar la información de cada línea del carrito

                $(".total-price-value-cart").empty();
                var total_price = 0; // Inicializar el total_price

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
                        '<input type="number" class="quantity-input" data-id-line="' + item.id_line + '" data-id-product="' + item.id_product + '" data-id-housing="' + item.id_housing + '" value="' + item.quantity + '" min="0" max="' + item.stock + '" readonly>' +
                        '<button class="increment-btn" data-id-line="' + item.id_line + '">+</button>' +
                        '</div>' +
                        '</td>'
                    );
                    total_price += item.price_product * item.quantity;
                });
                $(".total-price-value-cart").append(total_price.toFixed(2) + ' €');

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

                // Manejar eventos de clic para los botones de incrementar y decrementar
                $(".increment-btn").click(function() {
                    var idLine = $(this).data("id-line");
                    var quantityInput = $(this).siblings(".quantity-input[data-id-line='" + idLine + "']");
                    var currentQuantity = parseInt(quantityInput.val());
                    // quantityInput.val(currentQuantity + 1);
                    // modify_quantity(this);
                    var stock = parseInt(quantityInput.attr("max")); // Obtener el stock desde el atributo max
                    if (currentQuantity < stock) {
                        quantityInput.val(currentQuantity + 1);
                        modify_quantity(this);
                    }
                });

                $(".decrement-btn").click(function() {
                    var quantityInput = $(this).siblings(".quantity-input");
                    var currentQuantity = parseInt(quantityInput.val());
                    var idLine = quantityInput.data("id-line");
                    var idHousing = quantityInput.data("id-housing");
                    var idProduct = quantityInput.data("id-product");
                
                    if (currentQuantity > 0) {
                        console.log("Entro decrement modify");
                        quantityInput.val(currentQuantity - 1);
                        modify_quantity(this);
                
                        // Verificar si la cantidad ha llegado a 0 y eliminar el producto del carrito
                        if (currentQuantity === 1) {
                            console.log("Entro decrement remove");
                            console.log("IDLINE " + idLine);
                            console.log("idHousing " + idHousing);
                            console.log("idProduct " + idProduct);
                            remove_product_from_cart(idLine, idHousing, idProduct);
                        }
                    }
                });
                
                
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

function modify_quantity(button) {
    var access_token = localStorage.getItem('access_token');
    var refresh_token = localStorage.getItem('refresh_token');
    var id_product = $(button).siblings(".quantity-input").data("id-product");
    var id_housing = $(button).siblings(".quantity-input").data("id-housing");
    var quantity = $(button).siblings(".quantity-input").val();
    console.log("entro modify");
    if (access_token && refresh_token) {
        ajaxPromise(friendlyURL('?module=cart'), 'POST', 'JSON', {'access_token': access_token, 'id_product': id_product, 'id_housing': id_housing, 'quantity': quantity, 'op': 'modifyQuantity'})
        .then(function(data) {
            if (data === "update") {
                console.log("Entro modify_quantity");
                paint_cart();
            } else {
                console.log("Error al updatear cantidad");
            }
        })
        .catch(function() {
            console.log("Error modificación cantidad");
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

function delete_line_Cart(){
    $(document).on('click','.delete-btn-cart',function () {
        var access_token = localStorage.getItem('access_token');
        var refresh_token = localStorage.getItem('refresh_token');
        var id_line = $(this).data('id-line'); // Obtener id_line del botón de eliminar
        if(access_token && refresh_token){
            ajaxPromise(friendlyURL('?module=cart'), 'POST', 'JSON', {'access_token': access_token, 'id_line': id_line, 'op': 'delete_line_Cart'})
            .then(function(data) { 
                if (data === "deleted") {
                    $('tr').has('button[data-id-line="'+ id_line +'"]').remove();
                    updateItemsCart();
                    paint_cart();
                } else {
                    console.log("Error al eliminar la línea del carrito");
                }
            }).catch(function() {
                console.log("Error consulta delete_line_Cart");
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
    });
}

function remove_product_from_cart(idLine, idHousing, idProduct) {
    var access_token = localStorage.getItem('access_token');
    var refresh_token = localStorage.getItem('refresh_token');
    if (access_token && refresh_token) {
        ajaxPromise(friendlyURL('?module=cart'), 'POST', 'JSON', {'access_token': access_token, 'id_line': idLine, 'id_housing': idHousing, 'id_product': idProduct, 'op': 'removeProduct'})
            .then(function(data) {
                console.log("Producto eliminado del carrito:", data);
                // Volver a pintar el carrito para reflejar los cambios
                paint_cart();
            })
            .catch(function() {
                console.log("Error al eliminar producto del carrito");
            });
    }
}

$(document).ready(function() {
    paint_cart();
    delete_line_Cart();
});