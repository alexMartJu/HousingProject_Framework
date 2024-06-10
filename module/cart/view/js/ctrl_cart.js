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
                $(".total-price-value").append(total_price.toFixed(2) + ' €');

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

function clicks_checkout(){
    $('.checkout-button').on('click', function(e) {
        checkout();
    });

    $('.checkout_pay').on('click', function(e) {
        e.preventDefault();
        finish_buy();
    });
}

function checkout(){
    var access_token = localStorage.getItem('access_token');
    var refresh_token = localStorage.getItem('refresh_token');
    if(access_token && refresh_token){
        if ($("#productTableBody tr").length === 0) {
            // Mostrar el mensaje de alerta usando SweetAlert
            Swal.fire({
                icon: 'warning',
                title: 'Empty Cart',
                text: 'Your shopping cart is empty. Please add items before proceeding to checkout.',
                showConfirmButton: false,
                timer: 2000
            });
        } else {
            window.location.href = friendlyURL('?module=cart&op=checkout_view');
        }
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

// Función para cargar el resumen del pedido y pintar la tabla dinámicamente
function loadOrderSummary() {
    var access_token = localStorage.getItem('access_token');
    var refresh_token = localStorage.getItem('refresh_token');
    if (access_token && refresh_token) {
        ajaxPromise(friendlyURL('?module=cart'), 'POST', 'JSON', {'access_token': access_token, 'op': 'paintCheckout'})
            .then(function(response) {
                // Limpiar la tabla antes de agregar nuevas filas
                $('#summaryTableBody').empty();

                // Iterar sobre los datos recibidos y construir las filas de la tabla
                response.forEach(function(item) {
                    var row = '<tr>';
                    row += '<td>' + item.housing_type + ' in ' + item.city_name + '</td>'; // Aquí se agrega el tipo de vivienda y la ciudad
                    row += '<td>' + item.name_product + '</td>';
                    row += '<td>' + item.price_product + '</td>';
                    row += '<td>' + item.quantity + '</td>';
                    row += '</tr>';

                    $('#summaryTableBody').append(row);
                });
            })
            .catch(function(error) {
                console.error('Error al cargar el resumen del pedido:', error);
            });
    } else {
        // Manejar el caso en el que no haya tokens de acceso
        console.error('No hay tokens de acceso disponibles.');
    }
}

function validate_customer_info() {
    var error = false;

    var name = document.getElementById('name').value;
    var address = document.getElementById('address').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var cardNumber = document.getElementById('card-number').value;
    var expiryDate = document.getElementById('expiry-date').value;
    var cvv = document.getElementById('cvv').value;

    // Validación del nombre
    if (name.length === 0) {
        document.getElementById('error_name').innerHTML = "Debes ingresar el nombre.";
        error = true;
    } else {
        document.getElementById('error_name').innerHTML = "";
    }

    // Validación de la dirección
    if (address.length === 0) {
        document.getElementById('error_address').innerHTML = "Debes ingresar la dirección.";
        error = true;
    } else {
        document.getElementById('error_address').innerHTML = "";
    }

    // Validación del correo electrónico
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.length === 0) {
        document.getElementById('error_email').innerHTML = "Debes ingresar el correo electrónico.";
        error = true;
    } else if (!emailPattern.test(email)) {
        document.getElementById('error_email').innerHTML = "Debes ingresar un correo electrónico válido.";
        error = true;
    } else {
        document.getElementById('error_email').innerHTML = "";
    }

    // Validación del teléfono
    var phonePattern = /^\d{9}$/;
    if (phone.length === 0) {
        document.getElementById('error_phone').innerHTML = "Debes ingresar el número de teléfono.";
        error = true;
    } else if (!phonePattern.test(phone)) {
        document.getElementById('error_phone').innerHTML = "Debes ingresar un número de teléfono válido (9 dígitos).";
        error = true;
    } else {
        document.getElementById('error_phone').innerHTML = "";
    }

    // Validación del número de tarjeta
    var cardPattern = /^\d{16}$/;
    if (cardNumber.length === 0) {
        document.getElementById('error_card_number').innerHTML = "Debes ingresar el número de tarjeta.";
        error = true;
    } else if (!cardPattern.test(cardNumber)) {
        document.getElementById('error_card_number').innerHTML = "Debes ingresar un número de tarjeta válido (16 dígitos).";
        error = true;
    } else {
        document.getElementById('error_card_number').innerHTML = "";
    }

    // Validación de la fecha de expiración
    var expiryPattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (expiryDate.length === 0) {
        document.getElementById('error_expiry_date').innerHTML = "Debes ingresar la fecha de expiración.";
        error = true;
    } else if (!expiryPattern.test(expiryDate)) {
        document.getElementById('error_expiry_date').innerHTML = "Debes ingresar una fecha de expiración válida (MM/AA).";
        error = true;
    } else {
        document.getElementById('error_expiry_date').innerHTML = "";
    }

    // Validación del CVV
    var cvvPattern = /^\d{3}$/;
    if (cvv.length === 0) {
        document.getElementById('error_cvv').innerHTML = "Debes ingresar el CVV.";
        error = true;
    } else if (!cvvPattern.test(cvv)) {
        document.getElementById('error_cvv').innerHTML = "Debes ingresar un CVV válido (3 dígitos).";
        error = true;
    } else {
        document.getElementById('error_cvv').innerHTML = "";
    }

    if (error) {
        return 0;
    } else {
        return 1;
    }
}

function finish_buy() {
    if(validate_customer_info() != 0) {
        var access_token = localStorage.getItem('access_token');
        var refresh_token = localStorage.getItem('refresh_token');
        var name_check = document.getElementById('name').value;
        var phone_check = document.getElementById('phone').value;
        if (access_token && refresh_token) {
            ajaxPromise(friendlyURL('?module=cart'), 'POST', 'JSON', {'access_token': access_token, 'name_check': name_check, 'phone_check': phone_check, 'op': 'finish_buy'})
                .then(function(data) {
                    console.log("fiinsh buy ", data);
                    if (data === "error_stock") {
                        Swal.fire({
                            icon: 'error',
                            title: 'Stock Exceed',
                            text: 'You have reached the maximum stock available for this item.',
                            showConfirmButton: false,
                            timer: 2000
                        }).then(function() {
                            window.location.href = friendlyURL('?module=cart');
                        });
                    } else if (data === "Checkout_good") {
                        Swal.fire({
                            icon: 'success',
                            title: 'Successful purchase',
                            text: 'Thank you for trusting us',
                            showConfirmButton: false,
                            timer: 2500
                        }).then(function() {
                            window.location.href = friendlyURL('?module=userProfile&op=userProfile_invoicesView');
                        });
                    } else if (data === "Checkout_error") {
                        Swal.fire({
                            icon: 'error',
                            title: 'Chceckout Error',
                            text: 'Something wrong occured',
                            showConfirmButton: false,
                            timer: 2500
                        }).then(function() {
                            window.location.href = friendlyURL('?module=cart');
                        });
                    }
                })
                .catch(function() {
                    console.log("Error al eliminar producto del carrito");
                });
        } else {
            console.error('No hay tokens de acceso disponibles.');
        }
    }
}

$(document).ready(function() {
    paint_cart();
    delete_line_Cart();
    clicks_checkout();
    loadOrderSummary()
});