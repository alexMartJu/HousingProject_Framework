function paint_userProfile_data() {
    var access_token = localStorage.getItem('access_token');
    var refresh_token = localStorage.getItem('refresh_token');
    console.log("Entro paint_userProfile_data()");
    if (access_token && refresh_token) {
        ajaxPromise(friendlyURL('?module=userProfile'), 'POST', 'JSON', {'access_token': access_token, 'op': 'paint_userProfile_data'})
        .then(function(data) {
            if (data) {
            console.log(data);

            document.querySelector('.name').innerText = data.username;
            document.querySelector('.info-email').innerText = data.email;
            document.querySelector('.likes-count').innerText = data.likes_count;
            document.querySelector('.purchases-count').innerText = data.purchases_count;
            document.querySelector('.descriptions').innerText = `Thank you, ${data.username} for using our application! We appreciate your support.`;

            var photoDiv = document.querySelector('.photo');
            photoDiv.style.backgroundImage = `url('${data.avatar}')`;
            }

            document.querySelector('.read-username').value = data.username;
            document.querySelector('.read-email').value = data.email;
        })
        .catch(function() {
            console.log("Error consulta paint_userProfile_data");
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Restricted Action',
            text: 'You need to be logged',
            showConfirmButton: false,
            timer: 2000
        }).then(function() {
            window.location.href = friendlyURL('?module=login');
        });
    }
}

function clicks() {
    $('.button-infouser').on('click', function(e) {
        e.preventDefault();
        if (validateForm()) {
            change_personalInfo();
        }
    });
}

function validateForm() {
    var firstName = document.getElementById("first_name").value;
    var lastName = document.getElementById("last_name").value;
    var dob = document.getElementById("dob").value;

    if (!firstName || !lastName || !dob) {
        Swal.fire({
            icon: 'error',
            title: 'Form Incomplete',
            text: 'Please fill in all required fields.',
            showConfirmButton: false,
            timer: 2000
        });
        return false;
    }

    return true;
}

function change_personalInfo() {
    var access_token = localStorage.getItem('access_token');
    var refresh_token = localStorage.getItem('refresh_token');
    var firstName = document.getElementById("first_name").value;
    var lastName = document.getElementById("last_name").value;
    var dob = document.getElementById("dob").value;
    var address = document.getElementById("address").value;
    var interests = document.getElementById("interests").value;
    console.log("Entro change_personalInfo()");
    if (access_token && refresh_token) {
        ajaxPromise(friendlyURL('?module=userProfile'), 'POST', 'JSON', {'access_token': access_token, 'firstName': firstName, 'lastName': lastName, 'dob': dob, 'address': address, 'interests': interests, 'op': 'change_personalInfo'})
        .then(function(data) {
            if (data === "insert_info" || data === "update_info") {
                Swal.fire({
                    icon: 'success',
                    title: 'Change Info',
                    text: 'Your information has been successfully changed.',
                    showConfirmButton: false,
                    timer: 2000
                });
            }
        })
        .catch(function() {
            console.log("Error consulta change_personalInfo");
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Restricted Action',
            text: 'You need to be logged',
            showConfirmButton: false,
            timer: 2000
        }).then(function() {
            window.location.href = friendlyURL('?module=login');
        });
    }
}

function list_likes_user() {
    var access_token = localStorage.getItem('access_token');
    var refresh_token = localStorage.getItem('refresh_token');
    console.log("Entro list_likes_user()");
    if (access_token && refresh_token) {
        ajaxPromise(friendlyURL('?module=userProfile'), 'POST', 'JSON', {'access_token': access_token, 'op': 'list_likes_user'})
        .then(function(data) {
            console.log("then --> list_likes_user --> ", data);
            if (data === "there_arent_likes") {
                console.log("User doesnt have likes");
                var galleryContainer = document.querySelector('.gallery-likes');
                var noLikesMessage = document.createElement('h2');
                noLikesMessage.textContent = "You haven't liked anything yet.";
                galleryContainer.appendChild(noLikesMessage);
            } else if (data === "error") {
                console.log("Something wrong has occured");
            } else {
                // Obtener la referencia al contenedor donde se pintará la tabla
                var galleryContainer = document.querySelector('.gallery-likes');

                // Crear una tabla
                var table = document.createElement('table');
                table.classList.add('likes-table');

                // Crear el encabezado de la tabla
                var tableHeader = document.createElement('thead');
                var headerRow = document.createElement('tr');
                var headers = ['Image', 'Type', 'City', 'Price'];
                headers.forEach(function(headerText) {
                    var headerCell = document.createElement('th');
                    headerCell.textContent = headerText;
                    headerRow.appendChild(headerCell);
                });
                tableHeader.appendChild(headerRow);
                table.appendChild(tableHeader);

                // Crear el cuerpo de la tabla
                var tableBody = document.createElement('tbody');
                var baseUrl = 'http://localhost/Framework/HousingProject_Framework/';
                data.forEach(function(like) {
                    var row = document.createElement('tr');
                    var imgCell = document.createElement('td');
                    var img = document.createElement('img');
                    img.src = baseUrl + like.img_housing; // Suponiendo que el campo se llame img_housing
                    imgCell.appendChild(img);
                    row.appendChild(imgCell);

                    var typeCell = document.createElement('td');
                    typeCell.textContent = like.name_type; // Suponiendo que el campo se llame type
                    row.appendChild(typeCell);

                    var cityCell = document.createElement('td');
                    cityCell.textContent = like.name_city; // Suponiendo que el campo se llame city
                    row.appendChild(cityCell);

                    var priceCell = document.createElement('td');
                    // Formatear el precio
                    var formattedPrice = Number(like.housing_price).toLocaleString('es-ES', { minimumFractionDigits: 0 }) + ' €';
                    priceCell.textContent = formattedPrice;
                    row.appendChild(priceCell);

                    tableBody.appendChild(row);
                });
                table.appendChild(tableBody);

                // Agregar la tabla al contenedor
                galleryContainer.appendChild(table);
            }
        })
        .catch(function() {
            console.log("catch --> list_likes_user()");
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Restricted Action',
            text: 'You need to be logged',
            showConfirmButton: false,
            timer: 2000
        }).then(function() {
            window.location.href = friendlyURL('?module=login');
        });
    }
}

function list_invoices_user() {
    var access_token = localStorage.getItem('access_token');
    var refresh_token = localStorage.getItem('refresh_token');
    console.log("Entro list_invoices_user()");
    if (access_token && refresh_token) {
        ajaxPromise(friendlyURL('?module=userProfile'), 'POST', 'JSON', {'access_token': access_token, 'op': 'list_invoices_user'})
        .then(function(data) {
            console.log("then --> list_invoices_user --> ", data);
            if (data === "there_arent_invoices") {
                console.log("User doesnt have likes");
                var galleryContainer = document.querySelector('.gallery-invoices');
                var noLikesMessage = document.createElement('h2');
                noLikesMessage.textContent = "You haven't buy anything yet.";
                galleryContainer.appendChild(noLikesMessage);
            } else if (data === "error") {
                console.log("Something wrong has occured");
            } else {
                var galleryInvoices = document.querySelector('.gallery-invoices');
                galleryInvoices.innerHTML = '';
                // Crear la tabla de facturas
                var table = document.createElement('table');
                table.classList.add('invoice-table');
                var thead = document.createElement('thead');
                var tbody = document.createElement('tbody');
                // Crear encabezados de tabla
                var headers = ['Invoice ID', 'Date', 'Amount', 'PDF Link', 'QR Link'];
                var headerRow = document.createElement('tr');
                headers.forEach(function(headerText) {
                    var th = document.createElement('th');
                    th.textContent = headerText;
                    headerRow.appendChild(th);
                });
                thead.appendChild(headerRow);
                table.appendChild(thead);
                var baseUrl = 'http://localhost/Framework/HousingProject_Framework/';

                // Crear filas de tabla con los datos de las facturas
                data.forEach(function(invoice) {
                    var row = document.createElement('tr');
                    var invoiceIdCell = document.createElement('td');
                    invoiceIdCell.textContent = invoice.purchase_id;
                    row.appendChild(invoiceIdCell);

                    var dateCell = document.createElement('td');
                    dateCell.textContent = invoice.purchase_date;
                    row.appendChild(dateCell);

                    var amountCell = document.createElement('td');
                    amountCell.textContent = invoice.total_price;
                    row.appendChild(amountCell);

                    var pdfLinkCell = document.createElement('td');
                    var pdfLink = document.createElement('a');
                    pdfLink.href = baseUrl + 'uploads/pdf/factura_' + invoice.purchase_id + '.pdf';
                    pdfLink.textContent = 'Download PDF';
                    pdfLinkCell.appendChild(pdfLink);
                    row.appendChild(pdfLinkCell);

                    var qrLinkCell = document.createElement('td');
                    var qrLink = document.createElement('a');
                    qrLink.href = baseUrl + 'uploads/qr/qr_' + invoice.purchase_id + '.png';
                    qrLink.textContent = 'See QR';
                    qrLinkCell.appendChild(qrLink);
                    row.appendChild(qrLinkCell);

                    tbody.appendChild(row);
                });
                table.appendChild(tbody);
                // Agregar la tabla a gallery-invoices
                galleryInvoices.appendChild(table);
            }
        })
        .catch(function() {
            console.log("catch --> list_invoices_user()");
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Restricted Action',
            text: 'You need to be logged',
            showConfirmButton: false,
            timer: 2000
        }).then(function() {
            window.location.href = friendlyURL('?module=login');
        });
    }
}

function fileUpload_user() {
    var access_token = localStorage.getItem('access_token');
    var refresh_token = localStorage.getItem('refresh_token');
    console.log("Entro fileUpload_user()");
    if (access_token && refresh_token) {
        var formData = new FormData($('#uploadForm')[0]);
        formData.append('access_token', access_token);
        formData.append('op', 'upload_file_user');

        $.ajax({
            url: friendlyURL('?module=userProfile'),
            type: 'POST',
            dataType: 'json',
            data: formData,
            contentType: false,
            processData: false,
            success: function(data) {
                console.log("then --> list_invoices_user --> ", data);
                if (data.error) {
                    $('#message').html(data.error);
                } else if (data === "user_invalid") {
                    Swal.fire({
                        icon: 'error',
                        title: 'Restricted Action',
                        text: 'You need to be logged with a Local user to do this action',
                        showConfirmButton: false,
                        timer: 2000
                    });
                } else if (data === "fail_upload") {
                    Swal.fire({
                        icon: 'error',
                        title: 'Restricted Action',
                        text: 'You cant upload this file',
                        showConfirmButton: false,
                        timer: 2000
                    });
                } else if (data === "update_Avatar_done") {
                    $('#message').html('File successfully uploaded!');
                    Swal.fire({
                        icon: 'success',
                        title: 'Succesfully Picture Change',
                        text: 'Profile picture successfully changed',
                        showConfirmButton: false,
                        timer: 2500
                    }).then(function() {
                        window.location.href = friendlyURL('?module=userProfile');
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Something error was occured',
                        showConfirmButton: false,
                        timer: 2000
                    }).then(function() {
                        window.location.href = friendlyURL('?module=home');
                    });
                }
            },
            error: function(xhr, status, error) {
                console.log("catch --> fileUpload_user()", error);
                $('#message').html('Error uploading file.');
            }
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Restricted Action',
            text: 'You need to be logged',
            showConfirmButton: false,
            timer: 2000
        }).then(function() {
            window.location.href = friendlyURL('?module=login');
        });
    }
}

$(document).ready(function() {
    paint_userProfile_data();
    clicks();
    setTimeout(function() {
        list_likes_user();
    }, 500);
    list_invoices_user();
    $('#uploadForm').on('submit', function(e){
        e.preventDefault();
        fileUpload_user();
    });
});