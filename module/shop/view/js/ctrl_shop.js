function loadHousings() {
    var verificate_filters = localStorage.getItem('filters_home') || false; 
    var verificate_filters_shop = localStorage.getItem('filters_shop') || false;
    var offset = 0; 
    var items_page = 3; 
    if(verificate_filters != false) {
        pagination();
        localStorage.removeItem('filters_home');
        var filters = JSON.parse(verificate_filters);
        console.log("Datos de filters_home:", filters);
        // ajaxForSearch('?module=shop&op=filters_home', 'POST', 'JSON', {'filters':filters, 'offset': offset, 'items_page': items_page});
        ajaxForSearch(friendlyURL('?module=shop'), 'POST', 'JSON', {'filters':filters, 'offset': offset, 'items_page': items_page, 'op' : 'filters_home'});
    } else if (verificate_filters_shop != false){
        var filters__shop = JSON.parse(verificate_filters_shop);
        console.log("Datos de filters_shop:", filters__shop);
        // ajaxForSearch('?module=shop&op=filters_shop', 'POST', 'JSON', {'filters__shop':filters__shop, 'offset': offset, 'items_page': items_page});
        ajaxForSearch(friendlyURL('?module=shop'), 'POST', 'JSON', {'filters__shop':filters__shop, 'offset': offset, 'items_page': items_page, 'op' : 'filters_shop'});
        filter_button();
        pagination(filters__shop);
    } else {
        // ajaxForSearch('?module=shop&op=all_housings', 'POST', 'JSON', {'offset': offset, 'items_page': items_page});
        ajaxForSearch(friendlyURL('?module=shop'), 'POST', 'JSON', {'offset': offset, 'items_page': items_page, 'op' : 'all_housings'});
        pagination(filters__shop);
    }
}

// function ajaxForSearch(url, type, dataType, data=false) {
function ajaxForSearch(url, type, dataType, data=false) {
    
    ajaxPromise(url, type, dataType, data)
        // console.log('estoy aqui1')
        .then(function (data) {
            console.log("Datos recibidos de load_Housings:", data);
            $('#content_shop_housings').empty();
            $('.date_housing' && '.date_img').empty();
            $('.section_details').show(); //mostramos section de filtros
            $('.container_shop').css('margin-top', '120px'); //ponemos el margen-top a 120px
            $('.map-wrapper').css('margin-top', '120px'); //ponemos el margen-top a 120px
            
            //Mejora para que cuando no hayan resultados en los filtros aplicados
            if (data == "error") {
                $('<div></div>').appendTo('#content_shop_housings')
                    .html(
                        '<h3>No results are found with the filters applied!</h3>'
                    )
            } else {
                for (row in data) {
                    $('<div></div>').attr({ 'id': data[row].id_housing, 'class': 'list_content_shop col-g-12' }).appendTo('#content_shop_housings')
                        .html(
                            "<div class='hola col-lg-12 mt-4'>" +
                            "<div class='cont-img col-lg-4 more_info_list1' id='" + data[row].id_housing + "' onclick='event.stopPropagation();'>" +
                            "<div class='swiper' id='swiper-container-" + data[row].id_housing + "'>" +
                            "<div class='swiper-wrapper carrousel_cont_shop'>" +

                            "</div>" +
                            "<div class='swiper-pagination'></div>" +
                            "<div class='swiper-button-next'></div>" +
                            "<div class='swiper-button-prev'></div>" +
                            "</div>" +
                            "</div>" +
                            "<div class='hello col-lg-8 more_info_list1' id='" + data[row].id_housing + "'>" +
                            "<div class='gh'>" +
                            "<i class='fa-solid fa-euro-sign fa-2x'> " + data[row].housing_price + "</i>" +
                            "<hr />" +
                            "</div>" +
                            "<p class='di'><strong> " + data[row].name_type + "</strong> of  " + data[row].housing_m2 + "m<sup>2</sup> in " + data[row].name_city + "<span class='span_total_likes'> | Total Likes: " + data[row].likes_count + "</span>" + "<img class='img-icon img-like unpainted_like_list' id='" + data[row].id_housing + "' src= 'view/icons/list_shop/like-regular.svg' alt=''></img>" + "</p>" +
                            "<i class='fas fa-info-circle'> " + data[row].cadastral_ref + "</i>" +
                            "<i class='fa-solid fa-warehouse'> " + data[row].garage + "</i>" +
                            "<i class='fa-solid fa-location-dot'> " + data[row].housing_address + "</i>" +
                            "<i class='fa-solid fa-fire'> " + data[row].housing_heating + "</i>" +
                            "<i class='fa-solid fa-square'> " + data[row].housing_m2 + " m<sup>2</sup></i>" +
                            "<i class='fa-solid fa-people-roof'> " + data[row].housing_rooms + " rooms</i>" +
                            "<div class='description'>" +
                            "<p>Descripción general aquí sobre una casa que esta en venta y que necesita venderse para calllar y no ver nada que no interese muchas overflow: hidden kjd ajahkdaka kjadjakj fhdhksfks skskjskfs jkdsjkjds kasjksakd jasjksad</p>" +
                            "</div>" +
                            "</div>" +
                            "</div>"

                        );
                    for (images in data[row].img_housings) {
                        $('<div></div>').attr({ 'id': data[row].img_housings[images], class: 'swiper-slide' }).appendTo('#swiper-container-' + data[row].id_housing + ' .carrousel_cont_shop')
                            .html(
                                "<img src= '" + data[row].img_housings[images] + "' alt=''>"
                            );
                    }
                    var swiper = new Swiper('#swiper-container-' + data[row].id_housing + '', {
                        slidesPerView: 1,
                        spaceBetween: 10,
                        loop: true,
                        pagination: {
                            el: ".swiper-pagination",
                            clickable: true
                        },
                        navigation: {
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev"
                        },
                        disableOnInteraction: false,
                        effect: "cube",
                        cubeEffect: {
                            shadow: false // Desactiva la sombra del efecto cube
                        }
                    });
                }
            }
            if (data != "error") {
                load_likes_list();
                mapBox_all(data);
            }
        }).catch(function () {
            console.log('estoy aqui');
            // window.location.href = "index.php?page=503";
        });
}

function clicks() {
    $(document).on("click", ".more_info_list1", function () {
        if (!$(event.target).hasClass('img-like')) {
            var id_housing = this.getAttribute('id');
            console.log(id_housing);
            loadDetails(id_housing);
        }
    });
}

function loadDetails(id_housing) {
    // ajaxPromise('?module=shop&op=details_housing', 'POST', 'JSON', {'id': id_housing})
    ajaxPromise(friendlyURL('?module=shop'), 'POST', 'JSON', {'id': id_housing, 'op':'details_housing'})
        .then(function (data) {
            console.log("Datos recibidos de loadDetails:", data);
            // Obtener el arreglo actual de búsquedas desde el localStorage
            var lastSearches = JSON.parse(localStorage.getItem('lastSearches')) || [];

            // Agregar la nueva búsqueda al arreglo
            lastSearches.push(data);

            // Almacenar el arreglo actualizado en el localStorage
            localStorage.setItem('lastSearches', JSON.stringify(lastSearches));
            
            $('#content_shop_housings').empty();
            $('.contenedor').empty();
            $('.date_img_dentro').empty();
            $('.date_car_dentro').empty();
            $('#carrousel_details').empty();
            $('.filters').empty();
            $('.section_details').hide(); //ocultamos section de filtros.
            $('.container_shop').css('margin-top', '0px'); //ponemos margin-top a 0px.
            $('.map-wrapper').css('margin-top', '0px');
            $('#pagination').empty();

            // console.log(data[1][0]);
            $('<div class="row gy-4"> \
                    <div class="col-lg-12"> \
                        <div class="portfolio-details-slider swiper"> \
                            <div class="swiper-wrapper align-items-center" id="carrousel_details"> \
                            </div> \
                            <div class="swiper-pagination"></div> \
                            <div class="swiper-button-next"></div> \
                            <div class="swiper-button-prev"></div> \
                        </div> \
                    </div> \
                </div').appendTo('.date_img');
            for (row in data[1][0]) {
                console.log(data[1][0][row].img_housings);
                $('<div></div>').attr({ 'id': data[1][0].id_img, class: 'swiper-slide' }).appendTo('#carrousel_details')
                    .html(
                        "<img src= '" + data[1][0][row].img_housings + "' alt=''>"
                    );
            }
            console.log('Inicializando Swiper...');
            var gr = new Swiper('.portfolio-details-slider', {
                slidesPerView: 2,
                spaceBetween: 0,
                loop: true,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false
                },
                pagination: {
                    el: '.swiper-pagination',
                    type: 'bullets',
                    clickable: true
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                disableOnInteraction: false,

            });
            // Verificar si los elementos están presentes antes de intentar seleccionarlos
            if ($('#carrousel_details').length > 0) {
                console.log('Se encontraron elementos con el id "carrousel_details".');
            } else {
                console.log('No se encontraron elementos con el id "carrousel_details".');
            }

            if ($('.portfolio-details-slider').length > 0) {
                console.log('Se encontraron elementos con la clase "portfolio-details-slider".');
            } else {
                console.log('No se encontraron elementos con la clase "portfolio-details-slider".');
            }


            $('<div></div>').attr({ 'id': data[0].id_housing, class: 'date_car_dentro' }).appendTo('.date_housing')
                .html(`
                    <div class='col-lg-8 mx-auto'>
                    <div class='portfolio-info'>
                    <h3>${data[0].housing_price} € || <img class='img-icon-details img-like unpainted_like_details' src='view/icons/details_shop/like-regular.svg' id=${data[0].id_housing} alt=''></h3>
                    <ul class='lista_1'>
                    <li><strong>Housing Type</strong>: ${data[0].name_type}</li>
                    <li><strong>Client</strong>: ASU Company</li>
                    <li><strong>Publication date</strong>: ${data[0].publication_date}</li>
                    <li><strong>Project URL</strong>: <a href='#'>www.example.com</a></li>
                    </ul>
                    <ul class='hola'>
                    <p></p>
                    </ul>
                    <h3 class='hello'>Characteristics</h3>
                    <ul class='icon-list-characteristics'>
                    <li>
                    <img src= 'view/icons/details_shop/square_meters.svg' alt=''>
                    <div class='icon-content'>
                    <span><strong>Square meters</strong></span>
                    <span>${data[0].housing_m2} m<sup>2</sup></span>
                    </div>
                    </li>
                    </ul>
                    <h3 class='hello'>Extras</h3>
                    <ul class='icon-list-extras'>
                    </ul>
                    <h3 class='hello'>Location</h3>
                    <ul class='location-maps'>
                    <div id="map1"></div>
                    </ul>
                    </ul>
                    <h3 class='hello'>Housings Related</h3>
                    <ul class='results'>
                    
                    </ul>
                    </div>
                    </div>`

                )
            if (data[0].housing_bedrooms != 0) {
                $('<div></div>').appendTo('.portfolio-info .icon-list-characteristics')
                .html(
                    `<li>
                    <img src= 'view/icons/details_shop/bedroom.svg' alt=''>
                    <div class='icon-content'>
                    <span><strong>Bedrooms</strong></span>
                    <span>${data[0].housing_bedrooms}</span>
                    </div>
                    </li>`
                ); 
            }
            if (data[0].housing_bathrooms != 0) {
                $('<div></div>').appendTo('.portfolio-info .icon-list-characteristics')
                .html(
                    `<li>
                    <img src= 'view/icons/details_shop/bathroom.svg' alt=''>
                    <div class='icon-content'>
                    <span><strong>Bathrooms</strong></span>
                    <span>${data[0].housing_bathrooms}</span>
                    </div>
                    </li>`
                ); 
            }
            if (data[0].housing_heating != 'No heating') {
                $('<div></div>').appendTo('.portfolio-info .icon-list-characteristics')
                .html(
                    `<li>
                    <img src= 'view/icons/details_shop/heating.svg' alt=''>
                    <div class='icon-content'>
                    <span><strong>Heating</strong></span>
                    <span>${data[0].housing_heating}</span>
                    </div>
                    </li>`
                ); 
            }
            for (row in data[2][0]) {
                $('<div></div>').attr({'id': data[2][0][row].id_extras}).appendTo('.portfolio-info .icon-list-extras')
                    .html(
                        `<li>
                        <img src= '${data[2][0][row].img_extras}' alt=''>
                        <span>${data[2][0][row].name_extras}</span>
                        </li>`
                        
                    );
                }
                // <h3 class='hello'>Housings Related (${data[0].name_type}s or ${data[2][0][row].name_extras})</h3>
                localStorage.setItem('id_details', data[0].id_housing);
                // load_likes_details(data[0].id_housing);
                mapBox(data[0]);
                console.log("id extras " + data[2][0][row].id_extras);
                more_husings_related(data[0].id_type, data[0].id_housing, data[2][0][row].id_extras);
        }).catch(function () {
            // console.log('estoy aqui');
            window.location.href = "index.php?page=503";
            //window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Load_Details SHOP";
        });

}

function print_filters() {
    // ajaxPromise('?module=shop&op=print_dynamic_filters_shop', 'GET', 'JSON')
    ajaxPromise(friendlyURL('?module=shop'), 'POST', 'JSON', {'op':'print_dynamic_filters_shop'})
    .then(function (data) {
        console.log("Datos recibidos de print_filters:", data);
        $('<div class="div_filters"></div>').appendTo('.filters')
        .html(`
            <div>
                <a href="#modalSuccess"><button type="button" data-filter="city">Housing City</button></a>
                <div id="modalSuccess" class="modal">
                    <div class="modal-content">
                        <div class="modal-header header-success">
                            <span class="modal-header-title">Housing City</span>
                            <a href="#/" class="header-btn-close">&#215;</a>
                        </div> <!-- .modal-header -->
                        <div class="radio-container">
                            <div class="column">
                                <!-- Radios para la primera columna -->
                            </div>
                            <div class="column1">
                                <!-- Radios para la primera columna -->
                            </div>
                        </div>
                    </div> <!-- .modal-content -->
                </div>
            </div>
            <div>
                <a href="#modalType"><button type="button" data-filter="type">Housing Type</button></a>
                <div id="modalType" class="modal">
                    <div class="modal-content">
                        <div class="modal-header header-success">
                            <span class="modal-header-title">Housing Type</span>
                            <a href="#/" class="header-btn-close">&#215;</a>
                        </div> <!-- .modal-header -->
                        <div class="radio_container_type">
                            <div class="columna">
                                <!-- Radios para la primera columna -->
                            </div>
                        </div>
                    </div> <!-- .modal-content -->
                </div>
            </div>
            <select class="filter_operation" name="select_operation" id="select_operation"> 
                <option disabled selected style="display:none;">Housing Operation</option>
                
            </select>
            <select class="filter_category" name="select_category" id="select_category"> 
                <option disabled selected style="display:none;">Housing Category</option>
                
            </select> 
            <select class="filter_extras" name="select_extras" id="select_extras"> 
                <option disabled selected style="display:none;">Extras</option>
                
            </select>
            <select class="filter_distinctweb" name="select_distinctweb" id="select_distinctweb"> 
                <option disabled selected style="display:none;">Automation</option>
                
            </select>
            <select class="filter_orderby" name="select_orderby" id="select_orderby"> 
                <option disabled selected style="display:none;">Order By</option>
                <option value="Price" id="Price">Per price</option> 
                <option value="M2" id="M2">Per square meters</option> 
                
            </select>    
            <button class="filter_button" id="Button_filter">Filter</button> 
            <button class="filter_remove" id="Remove_filter">Remove</button>`
        )
        var countColumn = 0;
        var countColumn1 = 0;

        for (row in data[0][0]){
            // Crear un div para cada par de radio-item y colocarlos en dos columnas
            var $radioItem = $('<div></div>').addClass('radio-item col-md-12 mb-2');
    
            // Insertar radio-item en la columna correspondiente
            if (countColumn <= countColumn1) {
                $radioItem.appendTo('.radio-container .column');
                countColumn++;
            } else {
                $radioItem.appendTo('.radio-container .column1');
                countColumn1++;
            }

            // Agregar el contenido HTML al radio-item
            $radioItem.html(
                `<input type="checkbox" id='${data[0][0][row].name_city}' value='${data[0][0][row].name_city}' class="filter_city form-check-input" name="select_city" id="select_city">
                <label class="form-check-label" for='${data[0][0][row].name_city}'>${data[0][0][row].name_city}</label>`
            );
        }
        for (row in data[1][0]){
            $('<div></div>').attr('class','radio-item-type col-md-12').appendTo('.radio_container_type .columna')
                .html(
                    `<input type="radio" id='${data[1][0][row].name_type}' value='${data[1][0][row].name_type}' class="filter_type form-check-input" name="select_type" id="select_type">
                    <label class="form-check-label" for='${data[1][0][row].name_type}'>${data[1][0][row].name_type}</label>`
                    
                );
                
        }
        for (row in data[2][0]){
            $('<option></option>').val(`${data[2][0][row].name_operation}`).attr({'id': data[2][0][row].name_operation}).appendTo('#select_operation')
            .html(
                `${data[2][0][row].name_operation}`
            );
        }
        for (row in data[3][0]){
            $('<option></option>').val(`${data[3][0][row].name_category}`).attr({'id': data[3][0][row].name_category}).appendTo('#select_category')
            .html(
                `${data[3][0][row].name_category}`
            );
        }
        for (row in data[4][0]){
            $('<option></option>').val(`${data[4][0][row].name_extras}`).attr({'id': data[4][0][row].name_extras}).appendTo('#select_extras')
            .html(
                `${data[4][0][row].name_extras}`
            );
        }
        for (row in data[5][0]){
            $('<option></option>').val(`${data[5][0][row].name_aut_parts}`).attr({'id': data[5][0][row].name_name_aut_parts}).appendTo('#select_distinctweb')
            .html(
                `${data[5][0][row].name_aut_parts}`
            );
        }
        filter_button();
        $(document).on('click', '.filter_remove', function() {
            remove_filters();
        });
    }).catch(function () {
        window.location.href = "index.php?page=503";
        //window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Load_Details SHOP";
    });
}

function filter_button() {
    $(function() {
        // Obtener los valores almacenados o un array vacío si no hay ninguno
        var filter_city = JSON.parse(localStorage.getItem('filter_city')) || [];
    
        $('.filter_city').change(function() {
            var selectedValue = this.value;
            
            // Verificar si el valor ya está presente en el array
            var index = filter_city.indexOf(selectedValue);
            if (index === -1) {
                filter_city.push(selectedValue); // Agregar el valor si no está presente
            } else {
                filter_city.splice(index, 1); // Eliminar el valor si ya está presente
            }
            
            localStorage.setItem('filter_city', JSON.stringify(filter_city)); // Guardar el array actualizado en el localStorage
        });
    
        // Aplicar los valores almacenados al elemento select
        if (filter_city.length > 0) {
            $('.filter_city').val(filter_city);
        }
    });
    $(function() {
        // Manejar el cambio de radio buttons y almacenar el valor seleccionado en localStorage
        $('.filter_type').change(function() {
            if ($(this).is(':checked')) { // Verificar si el radio button está marcado
                localStorage.setItem('filter_type', $(this).val()); // Almacenar el valor seleccionado en localStorage
            }
        });
        // Establecer el radio button seleccionado al cargar la página
        if (localStorage.getItem('filter_type')) {
            var filterType = localStorage.getItem('filter_type'); // Obtener el valor almacenado en localStorage
            // Buscar el radio button cuyo valor coincide con el valor almacenado y marcarlo como seleccionado
            $('.filter_type').filter(`[value='${filterType}']`).prop('checked', true);
        }
    });
    $(function() {
        $('.filter_operation').change(function() {
            localStorage.setItem('filter_operation', this.value);
        });
        if (localStorage.getItem('filter_operation')) {
            $('.filter_operation').val(localStorage.getItem('filter_operation'));
        }
    });
    $(function() {
        $('.filter_category').change(function() {
            localStorage.setItem('filter_category', this.value);
        });
        if (localStorage.getItem('filter_category')) {
            $('.filter_category').val(localStorage.getItem('filter_category'));
        }
    });
    $(function() {
        $('.filter_extras').change(function() {
            localStorage.setItem('filter_extras', this.value);
        });
        if (localStorage.getItem('filter_extras')) {
            $('.filter_extras').val(localStorage.getItem('filter_extras'));
        }
    });
    $(function() {
        $('.filter_distinctweb').change(function() {
            localStorage.setItem('filter_distinctweb', this.value);
        });
        if (localStorage.getItem('filter_distinctweb')) {
            $('.filter_distinctweb').val(localStorage.getItem('filter_distinctweb'));
        }
    });

    $(function() {
        $('.filter_orderby').change(function() {
            localStorage.setItem('filter_orderby', this.value);
        });
        if (localStorage.getItem('filter_orderby')) {
            $('.filter_orderby').val(localStorage.getItem('filter_orderby'));
        }
    });
    $(document).on('click', '.filter_button', function() {
        var filters_shop = [];

        localStorage.removeItem('filters');
        localStorage.removeItem('filters_search');

        if (localStorage.getItem('filter_city')) {
            filter_city = JSON.parse(localStorage.getItem('filter_city'));
            if (filter_city.length > 0) {
                filters_shop.push(['name_city', filter_city])
            } else {
                localStorage.remove('filter_city');
                localStorage.remove('filters_shop');
            }
            // filters_shop.push(['name_city', filter_city])
        }
        // if (localStorage.getItem('filter_type')) {
        //     filters_shop.push(['name_type', localStorage.getItem('filter_type')])
        // }

        // Obtener el valor del radio button seleccionado
        var selectedType = $('.filter_type:checked').val(); // Buscar el radio button que esté marcado y obtener su valor
        // Verificar si se ha seleccionado algún radio button
        if (selectedType) { // Comprobar si se ha seleccionado algún radio button
            filters_shop.push(['name_type', selectedType]); // Agregar el nombre del filtro y su valor al arreglo de filtros que se aplicarán
        }
        if (localStorage.getItem('filter_operation')) {
            filters_shop.push(['name_operation', localStorage.getItem('filter_operation')])
        }
        if (localStorage.getItem('filter_category')) {
            filters_shop.push(['name_category', localStorage.getItem('filter_category')])
        }
        if (localStorage.getItem('filter_extras')) {
            filters_shop.push(['name_extras', localStorage.getItem('filter_extras')])
        }
        if (localStorage.getItem('filter_distinctweb')) {
            filters_shop.push(['name_aut_parts', localStorage.getItem('filter_distinctweb')])
        }
        if (localStorage.getItem('filter_orderby')) {
            filters_shop.push(['name_orderby', localStorage.getItem('filter_orderby')])
        }
        console.log(filters_shop);
        if (filters_shop.length != 0) {
            localStorage.setItem('filters_shop', JSON.stringify(filters_shop));
            location.reload();
        } else {
            localStorage.removeItem('filters_shop');
            location.reload();
        }
    });
    highlightFilters();
}

function highlightFilters() {
    if(localStorage.getItem('filters_shop')) {
        var all_filters = JSON.parse(localStorage.getItem('filters_shop'));
    }

    for (row in all_filters) {
        if (all_filters[row][0] === 'name_city') {
            // $('#select_city').val(all_filters[row][1]).addClass('highlighted');
            $('[data-filter="city"]').addClass('highlighted_modal');
        }
        if (all_filters[row][0] === 'name_type') {
            $('[data-filter="type"]').addClass('highlighted_modal');
            // $('#select_type').val(all_filters[row][1]).addClass('highlighted');
            // Marcar el radio button correspondiente en lugar de establecer el valor
            // $('input[name="select_type"][value="' + all_filters[row][1] + '"]').prop('checked', true).addClass('highlighted');
        }
        if (all_filters[row][0] === 'name_operation') {
            $('#select_operation').val(all_filters[row][1]).addClass('highlighted');
        }
        if (all_filters[row][0] === 'name_category') {
            $('#select_category').val(all_filters[row][1]).addClass('highlighted');
        }
        if (all_filters[row][0] === 'name_extras') {
            $('#select_extras').val(all_filters[row][1]).addClass('highlighted');
        }
        if (all_filters[row][0] === 'name_aut_parts') {
            $('#select_distinctweb').val(all_filters[row][1]).addClass('highlighted');
        }
        if (all_filters[row][0] === 'name_orderby') {
            $('#select_orderby').val(all_filters[row][1]).addClass('highlighted');
        }
    }
}

function remove_filters() {
    localStorage.removeItem('filter_city');
    localStorage.removeItem('filter_type');
    localStorage.removeItem('filter_operation');
    localStorage.removeItem('filter_category');
    localStorage.removeItem('filter_extras');
    localStorage.removeItem('filter_distinctweb');
    localStorage.removeItem('filter_orderby');
    localStorage.removeItem('filters_shop');
    $('#select_city').removeClass('highlighted_modal');
    $('#select_type').removeClass('highlighted_modal');
    $('#select_operation').removeClass('highlighted');
    $('#select_category').removeClass('highlighted');
    $('#select_extras').removeClass('highlighted');
    $('#select_distinctweb').removeClass('highlighted');
    $('#select_orderby').removeClass('highlighted');
    location.reload();
}

function mapBox_all(data) {
    mapboxgl.accessToken = 'pk.eyJ1IjoiMjBqdWFuMTUiLCJhIjoiY2t6eWhubW90MDBnYTNlbzdhdTRtb3BkbyJ9.uR4BNyaxVosPVFt8ePxW1g';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-3.71183, 40.41275], // starting position [lng, lat]
        zoom: 5 // starting zoom
    });

    map.addControl(
        new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl
        }),
        'top-left'
    );
    
    map.addControl(
        new MapboxDirections({
            accessToken: mapboxgl.accessToken
        }),
        'bottom-right'
    );

    map.addControl(new mapboxgl.NavigationControl(), 'top-left');
    // map.addControl(new mapboxgl.FullscreenControl());
    map.addControl(new mapboxgl.FullscreenControl(), 'top-left');
    map.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true
    }), 'top-left');


    for (row in data) {
        const marker = new mapboxgl.Marker({
            color: "#1bbd36"
        })
        const minPopup = new mapboxgl.Popup()
        minPopup.setHTML('<div class="popup-content">' + '<h3 style="text-align:center;">' + data[row].housing_address + '</h3><p style="text-align:center;">Rooms: <b>' + data[row].housing_rooms + '</b></p>' +
            '<p style="text-align:center;">Price: <b>' + data[row].housing_price + '€</b></p>' +
            '<img class="popup-image" src=" ' + data[row].img_housing + '"/>' +
            '<a class="button button-primary-outline button-ujarak button-size-1 wow fadeInLeftSmall link" data-wow-delay=".4s" id="' + data[row].id_housing + '">Read More</a>'+
            '</div>')
        marker.setPopup(minPopup)
            .setLngLat([data[row].longitude, data[row].latitude])
            .addTo(map);
    }
}

function mapBox(id_housing) {
    mapboxgl.accessToken = 'pk.eyJ1IjoiMjBqdWFuMTUiLCJhIjoiY2t6eWhubW90MDBnYTNlbzdhdTRtb3BkbyJ9.uR4BNyaxVosPVFt8ePxW1g';
    const map1 = new mapboxgl.Map({
        container: 'map1',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [id_housing.longitude, id_housing.latitude], // starting position [lng, lat]
        zoom: 10 // starting zoom
    });
    const markerLocationID = new mapboxgl.Marker({
        color: "#1bbd36"
    })
    const minPopup = new mapboxgl.Popup()
    minPopup.setHTML('<div class="popup-content">' + '<h4>' + id_housing.housing_address + '</h4><p>Rooms: ' + id_housing.housing_rooms + '</p>' +
        '<p>Price: ' + id_housing.housing_price + '€</p>' +
        '<img class="popup-image" src=" ' + id_housing.img_housing + '"/>' + 
        '</div>')
    markerLocationID.setPopup(minPopup)
        .setLngLat([id_housing.longitude, id_housing.latitude])
        .addTo(map1);
}

function pagination(filters__shop) {
    var filters = JSON.parse(localStorage.getItem('filters_home'));
    // var filters_shop = JSON.parse(localStorage.getItem('filters_shop'));
    var filters__shop = filters__shop;
    console.log(filters);
    console.log(filters__shop);
    if (filters != null) {
        // var url = "?module=shop&op=count_filters_home";
        var url = friendlyURL("?module=shop&op=count_filters_home");
        console.log("url1");
    } else if (filters__shop != undefined) {
        // var url = "?module=shop&op=count_filters_shop";
        var url = friendlyURL("?module=shop&op=count_filters_shop");
        console.log("url2");
    } else {
        // var url = "?module=shop&op=count_all";
        var url = friendlyURL("?module=shop&op=count_all");
        console.log("url3");
    }
    ajaxPromise(url, 'POST', 'JSON', { 'filters__shop': filters__shop, 'filters': filters })
        .then(function(data) {
            console.log(data); // Imprime el contenido del objeto data en la consola
            var offset = data[0].contador;
            console.log("offset " + offset);
            var items_page = 3;
            if (offset >= items_page) {
                total_pages = Math.ceil(offset / items_page);
            } else {
                total_pages = 1;
            }
            $('#pagination').empty();
            for (var i = 1; i <= total_pages; i++) {
                $('#pagination').append('<button class="btn-pager" id="page_' + i + '">' + i + '</button>');
            }
            
            // Agregar evento clic a los botones de paginación
            $('#pagination').on('click', 'button', function() {
                var page = parseInt($(this).attr('id').split('_')[1]); // Obtener el número de página del id del botón
                offset = items_page * (page - 1);
                if (filters__shop != undefined) {
                    // ajaxForSearch("?module=shop&op=filters_shop", 'POST', 'JSON', {'filters__shop': filters__shop,'offset': offset, 'items_page': items_page});
                    ajaxForSearch(friendlyURL("?module=shop"), 'POST', 'JSON', {'filters__shop': filters__shop,'offset': offset, 'items_page': items_page, 'op':'filters_shop'});
                } else if (filters != null){
                    console.log("grafcet ");
                    // ajaxForSearch("?module=shop&op=filters_home", 'POST', 'JSON', {'filters': filters,'offset': offset, 'items_page': items_page});
                    ajaxForSearch(friendlyURL("?module=shop"), 'POST', 'JSON', {'filters': filters,'offset': offset, 'items_page': items_page, 'op':'filters_home'});
                } else {
                    // ajaxForSearch('?module=shop&op=all_housings', 'POST', 'JSON', {'offset': offset, 'items_page': items_page});
                    ajaxForSearch(friendlyURL('?module=shop'), 'POST', 'JSON', {'offset': offset, 'items_page': items_page, 'op':'all_housings'});
                }
                // $('html').animate({ scrollTop: $(".wrap") });
            });
        })
}

function housings_related(offset_housing = 0, housing_type, current_housing_id, current_extras_id, total_items) {
    let items = 3;
    // let offset_housing = offset_housing;
    // let housing_type = housing_type;
    let total_item = total_items;
    let elementsAdded_offset_0 = 0;
    let elementsAdded_offset_more3 = 0;
    console.log("Housign TYPE" + housing_type);

    // ajaxPromise("?module=shop&op=housings_related", 'POST', 'JSON', { 'housing_type': housing_type, 'current_housing_id': current_housing_id, 'current_extras_id': current_extras_id,'offset_housing': offset_housing, 'items': items })
    ajaxPromise(friendlyURL("?module=shop"), 'POST', 'JSON', { 'housing_type': housing_type, 'current_housing_id': current_housing_id, 'current_extras_id': current_extras_id,'offset_housing': offset_housing, 'items': items, 'op': 'housings_related'})
        .then(function(data) {
            console.log("datalength " + data);
            if (offset_housing == 0) {
                for (row in data[0]) {
                    if (data[0][row].id_housing != undefined) {
                        $('<div></div>').attr({ 'id': data[0][row].id_housing, 'class': 'more_info_list col-lg-3 col-md-6 align-items-stretch housing-item' }).appendTo('.results')
                            .html(
                                "<div class='member' data-aos='fade-up'>" +
                                "<div class='member-img'>" +
                                "<img src=" + data[0][row].img_housing + " class='img-fluid' alt=''>" +
                                "</div>" +
                                "<div class='member-info'>" +
                                "<h4>" + data[0][row].housing_price + "</h4>" +
                                "</div>" +
                                "</div>" +
                                "</div>"
                            )
                            elementsAdded_offset_0++;
                    }
                }
                console.log("elemnts" + elementsAdded_offset_0);
                if (elementsAdded_offset_0 > 0) {
                    console.log("estoy aqui");
                    for (row in data[1][0]) {
                        console.log("voy haciendo1 " + data[1][0][row].id_housing);
                        if (data[1][0][row].id_housing != undefined) {
                            if (elementsAdded_offset_0 < 3) {
                                console.log("voy haciendo");
                                console.log("elementsaaaaaa" + elementsAdded_offset_0);
                                $('<div></div>').attr({ 'id': data[1][0][row].id_housing, 'class': 'more_info_list col-lg-3 col-md-6 align-items-stretch housing-item' }).appendTo('.results')
                                    .html(
                                        "<div class='member' data-aos='fade-up'>" +
                                        "<div class='member-img'>" +
                                        "<img src=" + data[1][0][row].img_housing + " class='img-fluid' alt=''>" +
                                        "</div>" +
                                        "<div class='member-info'>" +
                                        "<h4>" + data[1][0][row].housing_price + "</h4>" +
                                        "</div>" +
                                        "</div>" +
                                        "</div>"
    
                                    )
                                    elementsAdded_offset_0++;
                            }
                            
                        }
                    }
                }
                var total_housings = total_item - 3;
                if (total_housings <= offset_housing) {
                    $('.more_housing__button').empty();
                    // $('<div></div>').attr({ 'id': 'more_housing__button', 'class': 'more_housing__button' }).appendTo('.results')
                    //     .html(
                    //         "</br><button class='btn-notexist' id='btn-notexist'></button>"
                    //     )
                } else {
                    $('.more_housing__button').empty();
                    // $('<div></div>').attr({ 'id': 'more_housing__button', 'class': 'more_housing__button' }).appendTo('.title_content')
                    $('<div></div>').attr({ 'id': 'more_housing__button', 'class': 'more_housing__button' }).appendTo('.results')
                        .html(
                            '<button class="load_more_button" id="load_more_button">LOAD MORE</button>'
                        )
                }
            }
            console.log("offset" + offset_housing);
            if (offset_housing >= 3) {
                for (row in data[0]) {
                    if (data[0][row].id_housing != undefined) {
                        console.log(data);
                        $('<div></div>').attr({ 'id': data[0][row].id_housing, 'class': 'more_info_list col-lg-3 col-md-6 align-items-stretch housing-item' }).appendTo('.results')
                            .html(
                                "<div class='member' data-aos='fade-up'>" +
                                "<div class='member-img'>" +
                                "<img src=" + data[0][row].img_housing + " class='img-fluid' alt=''>" +
                                "</div>" +
                                "<div class='member-info'>" +
                                "<h4>" + data[0][row].housing_price + "</h4>" +
                                "</div>" +
                                "</div>" +
                                "</div>"

                            )
                            elementsAdded_offset_more3++;
                    }
                }
                console.log("elemnts" + elementsAdded_offset_more3);
                if (elementsAdded_offset_more3 > 0) {
                    console.log("estoy aqui");
                    for (row in data[1][0]) {
                        console.log("voy haciendo1 " + data[1][0][row].id_housing);
                        if (data[1][0][row].id_housing != undefined) {
                            if (elementsAdded_offset_more3 < 3) {
                                console.log("voy haciendo");
                                console.log("elementsaaaaaa" + elementsAdded_offset_more3);
                                $('<div></div>').attr({ 'id': data[1][0][row].id_housing, 'class': 'more_info_list col-lg-3 col-md-6 align-items-stretch housing-item' }).appendTo('.results')
                                    .html(
                                        "<div class='member' data-aos='fade-up'>" +
                                        "<div class='member-img'>" +
                                        "<img src=" + data[1][0][row].img_housing + " class='img-fluid' alt=''>" +
                                        "</div>" +
                                        "<div class='member-info'>" +
                                        "<h4>" + data[1][0][row].housing_price + "</h4>" +
                                        "</div>" +
                                        "</div>" +
                                        "</div>"
    
                                    )
                                    elementsAdded_offset_more3++;
                            }
                            
                        }
                    }
                }
                var total_housings = total_item - 3;
                if (total_housings <= offset_housing) {
                    $('.more_housing__button').empty();
                    // $('<div></div>').attr({ 'id': 'more_housing__button', 'class': 'more_housing__button' }).appendTo('.results')
                    //     .html(
                    //         "</br><button class='btn-notexist' id='btn-notexist'></button>"
                    //     )
                } else {
                    $('.more_housing__button').empty();
                    // $('<div></div>').attr({ 'id': 'more_housing__button', 'class': 'more_housing__button' }).appendTo('.title_content')
                    $('<div></div>').attr({ 'id': 'more_housing__button', 'class': 'more_housing__button' }).appendTo('.results')
                        .html(
                            '<button class="load_more_button" id="load_more_button">LOAD MORE</button>'
                        )
                }
            }
        }).catch(function() {
            console.log("error housings_related");
        });
}

function more_husings_related(housing_type, current_housing_id, current_extras_id) {
    var housing_type = housing_type;
    var offset = 0;
    // ajaxPromise('?module=shop&op=count_housings_related', 'POST', 'JSON', { 'housing_type': housing_type, 'current_housing_id': current_housing_id })
    ajaxPromise(friendlyURL('?module=shop'), 'POST', 'JSON', { 'housing_type': housing_type, 'current_housing_id': current_housing_id, 'op': 'count_housings_related'})
        .then(function(data) {
            var total_items = data[0].n_prod;
            housings_related(0, housing_type, current_housing_id, current_extras_id, total_items);
            $(document).on("click", '.load_more_button', function() {
                offset = offset + 3;
                $('.more_housing__button').empty();
                housings_related(offset, housing_type, current_housing_id, current_extras_id, total_items);
            });
        }).catch(function() {
            console.log('error total_items');
        });
}

function load_likes_list() {
    console.log("Entro load_likes_list");
    var access_token = localStorage.getItem('access_token');
    var refresh_token = localStorage.getItem('refresh_token');
    if(access_token && refresh_token) {
        ajaxPromise(friendlyURL('?module=shop'), 'POST', 'JSON', { 'access_token': access_token, 'op': 'load_likes_list' })
        .then(function(data) {
            for (row in data) {
                // Obtener el ID del elemento
                var housingId = data[row].id_housing;
                
                // Buscar la imagen dentro del elemento con el ID correspondiente
                var imgElement = $("#" + housingId + " img.img-icon");

                // Verificar si la imagen existe
                if (imgElement.length > 0) {
                    // Cambiar la fuente de la imagen
                    imgElement.attr("src", "view/icons/list_shop/like-solid.svg");
                    // Agregar la clase painted_like
                    imgElement.addClass("painted_like_list").removeClass("unpainted_like_list");
                }
            }
        });
    }
}

// function load_likes_details(id_housing) {
//     console.log("Entro load_likes_details");
//     var access_token = localStorage.getItem('access_token');
//     var refresh_token = localStorage.getItem('refresh_token');
//     id = id_housing;
//     if(access_token && refresh_token) {
//         ajaxPromise(friendlyURL('?module=shop'), 'POST', 'JSON', { 'access_token': access_token, 'id': id, 'op': 'load_likes_details' })
//         .then(function(data) {
//             for (row in data) {
//                 // Obtener el ID del elemento
//                 var housingId = data[row].id_housing;
                
//                 // Buscar la imagen dentro del elemento con el ID correspondiente
//                 var imgElement = $("#" + housingId + " img.img-icon-details");

//                 // Verificar si la imagen existe
//                 if (imgElement.length > 0) {
//                     // Cambiar la fuente de la imagen
//                     imgElement.attr("src", "view/icons/details_shop/like-solid.svg");
//                     // Agregar la clase painted_like
//                     imgElement.addClass("painted_like_details").removeClass("unpainted_like_details");
//                 }
//             }
//         });
//     }
// }

// function click_likes() {
//     $(document).on('click', '.img-like', function() {
//         console.log("Entro click_likes");
//         console.log("Elemento seleccionado:", $(this));
//         var access_token = localStorage.getItem('access_token');
//         var refresh_token = localStorage.getItem('refresh_token');
//         var id = this.getAttribute('id');
//         console.log("Elemento seleccionado:", id);
//         if (access_token && refresh_token) {
//             ajaxPromise(friendlyURL('?module=shop'), 'POST', 'JSON', { 'access_token': access_token, 'id': id, 'op': 'controller_likes' })
//             // Verificar si la imagen tiene la clase unpainted_like_details
//             if($(this).hasClass("img-icon-details")){
//                 if ($(this).hasClass("unpainted_like_details")) {
//                     // Remover la clase unpainted_like_details y agregar la clase painted_like_details
//                     $(this).removeClass("unpainted_like_details").addClass("painted_like_details").attr("src", "view/icons/details_shop/like-solid.svg");
//                 } else {
//                     // Remover la clase painted_like_details y agregar la clase unpainted_like_details
//                     $(this).removeClass("painted_like_details").addClass("unpainted_like_details").attr("src", "view/icons/details_shop/like-regular.svg");
//                 }
//             }
//             if($(this).hasClass("img-icon")){
//                 if ($(this).hasClass("unpainted_like_list")) {
//                     // Remover la clase unpainted_like_list y agregar la clase painted_like_list
//                     $(this).removeClass("unpainted_like_list").addClass("painted_like_list").attr("src", "view/icons/list_shop/like-solid.svg");
//                 } else {
//                     // Remover la clase painted_like_list y agregar la clase unpainted_like_list
//                     $(this).removeClass("painted_like_list").addClass("unpainted_like_list").attr("src", "view/icons/list_shop/like-regular.svg");
//                 }
//             }
//         } else {
//             if (localStorage.getItem('id_details')) {
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Restricted Like Action',
//                     text: 'You need to be logged in to like',
//                     showConfirmButton: false,
//                     timer: 2000
//                 }).then(function() {
//                     window.location.href = friendlyURL('?module=login');
//                 });
//             } else {
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Restricted Like Action',
//                     text: 'You need to be logged in to like',
//                     showConfirmButton: false,
//                     timer: 2000
//                 }).then(function() {
//                     window.location.href = friendlyURL('?module=login');
//                 });
//             }
//         }
//     });
// }

$(document).ready(function () { 
    loadHousings();
    print_filters();
    filter_button();
    clicks();
    // click_likes();
});