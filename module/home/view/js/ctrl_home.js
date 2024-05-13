function carousel_AutomationParts() {
    ajaxPromise(friendlyURL('?module=home'), 'POST', 'JSON', {op: 'Carrousel_Automation'})
        .then(function (data) {
            console.log("Datos recibidos de carousel_AutomationParts:", data);
            // Limpiar el contenido actual del carrusel
            $("#swiper-aut-parts .swiper-wrapper").empty();

            // Agregar las nuevas imágenes al carrusel
            for (row in data) {
                $('<div></div>').addClass('swiper-slide carousel_aut_parts').attr( 'id', data[row].id_aut_parts ).appendTo("#swiper-aut-parts .swiper-wrapper")
                    .html(
                        "<img class='swiper-img' src='http://localhost/Framework/HousingProject_Framework/" + data[row].img_aut_parts + "' alt=''>" +
                        "<div class='carousel-container'>" +
                        "<div class='carousel-content animate__animated animate__fadeInUp'>" +
                        "<h2><span>" + data[row].name_aut_parts + "</span></h2>" +
                        "<p>" + data[row].description_aut_parts + "</p>" +
                        "<div class='text-center'><a href='' class='btn-get-started'>Read More</a>" +
                        "</div>" +
                        "</div>" +
                        "</div>"
                    );
            }

            // Inicializar Swiper

            // new Swiper('.swiper-container', {
            new Swiper('.swiper-container', {
                slidesPerView: 1,
                spaceBetween: 10,
                loop: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                autoplay: {
                    delay: 3000, // Tiempo en milisegundos entre diapositivas
                    disableOnInteraction: false,
                },
                disableOnInteraction: false,
            });
        })
        .catch(function () {
            // window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Carrusel_Brands HOME";
            console.log('Error: Carousel error');
        });
}

function loadTypes() {
    ajaxPromise(friendlyURL('?module=home'), 'POST', 'JSON', {op: 'Carrousel_Type'})
    .then(function(data) {
        console.log("Datos recibidos de load_Types:", data);
        for (row in data) {
            $('<div></div>').addClass('col-lg-3 col-md-6 d-flex align-items-stretch carousel_type').addClass('swiper-slide').attr( 'id', data[row].id_type ).appendTo('#types-carousel .container_Types')
                .html(
                    "<div class='member' data-aos='fade-up'>" +
                    "<div class='member-img'>" +
                    "<img src='http://localhost/Framework/HousingProject_Framework/" + data[row].img_type + "' class='img-fluid' alt=''>" +
                    "</div>" +
                    "<div class='member-info'>" +
                    "<h4>" + data[row].name_type + "</h4>" +
                    "</div>" +
                    "</div>" +
                    "</div>"

                )
        }

        var swiper0 = new Swiper('#types-carousel', {
            slidesPerView: 4,
            spaceBetween: 10,
            loop: true,
            pagination: {
                el: '#types-carousel .swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '#types-carousel .swiper-button-next',
                prevEl: '#types-carousel .swiper-button-prev',
            },
            breakpoints: {
                150: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                },
                320: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                },
                500: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                },
                570: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                },
                700: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                },
                1000: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                },
                1100: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                },
                1200: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                }
            },
            autoplay: {
                delay: 2000, // Tiempo en milisegundos entre diapositivas
                disableOnInteraction: false,
            },
            disableOnInteraction: false,
        });
    }).catch(function() {
        window.location.href = "index.php?page=503";
        // window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Type_Categories HOME";
    });
}

function loadCategories() {
    ajaxPromise(friendlyURL('?module=home'), 'POST', 'JSON', {op: 'homePageCategory'})
    .then(function(data) {
        console.log("Datos recibidos de load_Categories:", data);
        for (row in data) {
            $('<div></div>').addClass('col-lg-3 col-md-6 d-flex align-items-stretch carousel_categories').addClass('swiper-slide').attr( 'id', data[row].id_category ).appendTo('#categories-carousel .container_Categories')
                .html(
                    "<div class='member' data-aos='fade-up'>" +
                    "<div class='member-img'>" +
                    "<img src='http://localhost/Framework/HousingProject_Framework/" + data[row].img_category + "' class='img-fluid' alt=''>" +
                    "</div>" +
                    "<div class='member-info'>" +
                    "<h4>" + data[row].name_category + "</h4>" +
                    "</div>" +
                    "</div>" +
                    "</div>"

                )
        }

        var swiper1 = new Swiper('#categories-carousel', {
            slidesPerView: 4,
            spaceBetween: 10,
            loop: true,
            pagination: {
                el: '#categories-carousel .swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '#categories-carousel .swiper-button-next',
                prevEl: '#categories-carousel .swiper-button-prev',
            },
            breakpoints: {
                150: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                },
                320: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                },
                500: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                },
                570: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                },
                700: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                },
                1000: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                },
                1100: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                },
                1200: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                }
            },
            autoplay: {
                delay: 2000, // Tiempo en milisegundos entre diapositivas
                disableOnInteraction: false,
            },
            disableOnInteraction: false,
        });
    }).catch(function() {
        window.location.href = "index.php?page=503";
        // window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Type_Categories HOME";
    });
}

function loadOperations() {
    ajaxPromise(friendlyURL('?module=home'), 'POST', 'JSON', {op: 'homePageOperation'})
    .then(function(data) {
        console.log("Datos recibidos de load_Operations:", data);
        for (row in data) {
            $('<div></div>').attr( 'id', data[row].id_operation ).addClass('col-lg-3 col-md-6 d-flex align-items-stretch carousel_operations').appendTo('#containerOperations')
                .html(
                    "<div class='member' data-aos='fade-up'>" +
                    "<div class='member-img'>" +
                    "<img src='http://localhost/Framework/HousingProject_Framework/" + data[row].img_operation + "' class='img-fluid' alt=''>" +
                    "</div>" +
                    "<div class='member-info'>" +
                    "<h4>" + data[row].name_operation + "</h4>" +
                    "<span>" + data[row].description_operation + "</span>" +
                    "</div>" +
                    "</div>" +
                    "</div>"
                )

        }
    }).catch(function() {
        window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Types_car HOME";
    });
}

function loadCities() {
    ajaxPromise(friendlyURL('?module=home'), 'POST', 'JSON', {op: 'homePageCity'})
        .then(function (data) {
            console.log("Datos recibidos de loadCities:", data);
            var containerCities = $('#containerCities');

            // Initialize Swiper container
            var swiperContainer = $('<section></section>').attr('id', 'cities').addClass('city section-bg');
            var containerDiv = $('<div></div>').addClass('container');
            var titleDiv = $('<div></div>').addClass('section-title').attr('data-aos', 'fade-up');
            titleDiv.html("<h2><strong>Cities</strong></h2>");

            var rowDiv = $('<div></div>').addClass('row').attr('id', 'containerCities');
            var citySliderDiv = $('<div></div>').addClass('city-slider swiper');
            var swiperWrapperDiv = $('<div></div>').addClass('swiper-wrapper align-items-center');

            for (var row in data) {
                var cityDiv = $('<div></div>').attr( 'id', data[row].id_city ).addClass('swiper-slide col-lg-3 col-md-6 d-flex align-items-stretch carousel_cities');
                cityDiv.html(
                    "<div class='member' data-aos='fade-up'>" +
                    "<div class='member-img '>" +
                    "<img src='http://localhost/Framework/HousingProject_Framework/" + data[row].img_city + "' class='img-fluid' alt=''>" +
                    "<div class='social'>" +
                    "<a href=''><i class='bi bi-twitter'></i></a>" +
                    "<a href=''><i class='bi bi-facebook'></i></a>" +
                    "<a href=''><i class='bi bi-instagram'></i></a>" +
                    "<a href=''><i class='bi bi-linkedin'></i></a>" +
                    "</div>" +
                    "</div>" +
                    "<div class='member-info'>" +
                    "<h4>" + data[row].name_city + "</h4>" +
                    "<span>" + data[row].description_city + "</span>" +
                    "</div>" +
                    "</div>"
                );

                swiperWrapperDiv.append(cityDiv);
            }

            citySliderDiv.append(swiperWrapperDiv);
            citySliderDiv.append("<div class='swiper-pagination'></div>");
            citySliderDiv.append("<div class='swiper-button-next'></div>");
            citySliderDiv.append("<div class='swiper-button-prev'></div>");

            rowDiv.append(citySliderDiv);
            // containerDiv.append(titleDiv);
            containerDiv.append(rowDiv);
            swiperContainer.append(containerDiv);

            containerCities.html(swiperContainer);

            // Initialize Swiper
            var swiper = new Swiper('.city-slider', {
                slidesPerView: 4,
                spaceBetween: 30,
                loop: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                autoplay: {
                    delay: 2000, // Tiempo en milisegundos entre diapositivas
                    disableOnInteraction: false,
                },
                disableOnInteraction: false,
            });
        })
        .catch(function () {
            console.log("Error in AJAX request:");
            window.location.href = "index.php?page=503";
            // window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Types_car HOME";
        });
}


function loadRecommendations() {
    ajaxPromise(friendlyURL('?module=home'), 'POST', 'JSON', {op: 'homePageRecommendations'})
    .then(function(data) {
        console.log("Datos recibidos de loadRecommendations:", data);
        for (row in data) {
            $('<div></div>').attr( 'id', data[row].name_city ).addClass('col-lg-3 col-md-6 d-flex align-items-stretch').appendTo('#containerRecommendations')
                .html(
                    "<div class='member' data-aos='fade-up'>" +
                    "<div class='member-img'>" +
                    "<img src='http://localhost/Framework/HousingProject_Framework/" + data[row].img_city + "' class='img-fluid' alt=''>" +
                    "</div>" +
                    "<div class='member-info'>" +
                    "<h4>" + data[row].name_city + "</h4>" +
                    "</div>" +
                    "</div>" +
                    "</div>"
                )

        }
    }).catch(function() {
        window.location.href = "index.php?page=503";
        // window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Types_car HOME";
    });
}

function loadMostVisited() {
    ajaxPromise(friendlyURL('?module=home'), 'POST', 'JSON', {op: 'homePageMostVisited'})
    .then(function(data) {
        console.log("Datos recibidos de loadMostVisited:", data);
        for (row in data) {
            $('<div></div>').attr( 'id', data[row].name_city ).addClass('col-lg-3 col-md-6 d-flex align-items-stretch').appendTo('#containerMostVisited')
                .html(
                    "<div class='member' data-aos='fade-up'>" +
                    "<div class='member-img'>" +
                    "<img src='http://localhost/Framework/HousingProject_Framework/" + data[row].img_city + "' class='img-fluid' alt=''>" +
                    "</div>" +
                    "<div class='member-info'>" +
                    "<h4>" + data[row].name_city + "</h4>" +
                    "</div>" +
                    "</div>" +
                    "</div>"
                )

        }
    }).catch(function() {
        window.location.href = "index.php?page=503";
        // window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Types_car HOME";
    });
}

function loadLastSearch() {
    var lastSearches = JSON.parse(localStorage.getItem('lastSearches')) || [];

    if (lastSearches.length > 0) {
        lastSearches.forEach(function (search) {
            $('<div></div>').attr('id', search[0].id_housing).addClass('col-lg-3 col-md-6 d-flex align-items-stretch').appendTo('#containerLastSearch')
                .html(
                    "<div class='member' data-aos='fade-up'>" +
                    "<div class='member-img'>" +
                    "<img src='http://localhost/Framework/HousingProject_Framework/" + search[0].img_city + "' class='img-fluid' alt=''>" +
                    "</div>" +
                    "<div class='member-info'>" +
                    "<h4>" + search[0].name_city + "</h4>" +
                    "</div>" +
                    "</div>" +
                    "</div>"
                );
        });
    }
}


function clicks(){

    $(document).on("click",'div.carousel_aut_parts', function (){
        var filters_home = [];
        filters_home.push({"aut_parts":[this.getAttribute('id')]});
        console.log("hola1 id=" + this.getAttribute('id'));
        localStorage.removeItem('filters_home');
        localStorage.setItem('filters_home', JSON.stringify(filters_home)); 

        // Borramos filtros de shop indviduales para no ocasionar problemas cuando
        // busquemos con el search despues de pulsar esto
        localStorage.removeItem('filter_city');
        localStorage.removeItem('filter_type');
        localStorage.removeItem('filter_operation');
        localStorage.removeItem('filter_category');
        localStorage.removeItem('filter_extras');
        localStorage.removeItem('filter_distinctweb');
        localStorage.removeItem('filter_orderby');
        localStorage.removeItem('filters_shop');
        // -Fin borrado-

        // -Hacer que se marquen los filters_shop correspondientes *1-
        localStorage.setItem('filter_distinctweb', $(this).find('h2 span').text()); // Guardamos el nombre de la parte automatizada
        if (localStorage.getItem('filter_distinctweb')) {
            $('.filter_distinctweb').val(localStorage.getItem('filter_distinctweb'));
        }
        // Obtenemos el nombre de la parte automatizada y luego creamos el formato que deseamos para filters_shop
        var nameAutParts = localStorage.getItem('filter_distinctweb'); 
        var search = [["name_aut_parts", nameAutParts]]; // Creamos el formato [["name_aut_parts", "nameAutParts"]]
        // Guardo search en localStorage
        localStorage.setItem('filters_shop', JSON.stringify(search)); // Esto guarda el formato [["name_aut_parts", "nameAutParts"]] en localStorage
        // -Finalización marcado filters_shop *1-
        
        setTimeout(function(){ 
            window.location.href = friendlyURL('?module=shop');
        }, 1000);  
    });

    $(document).on("click",'div.carousel_type', function (){
        var filters_home = [];
        filters_home.push({"type":[this.getAttribute('id')]});
        console.log("hola1 id=" + this.getAttribute('id'));
        localStorage.removeItem('filters_home');
        localStorage.setItem('filters_home', JSON.stringify(filters_home)); 

        // Borramos filtros de shop indviduales para no ocasionar problemas cuando
        // busquemos con el search despues de pulsar esto
        localStorage.removeItem('filter_city');
        localStorage.removeItem('filter_type');
        localStorage.removeItem('filter_operation');
        localStorage.removeItem('filter_category');
        localStorage.removeItem('filter_extras');
        localStorage.removeItem('filter_distinctweb');
        localStorage.removeItem('filter_orderby');
        localStorage.removeItem('filters_shop');
        // -Fin borrado-

        // -Hacer que se marquen los filters_shop correspondientes *2-
        localStorage.setItem('filter_type', $(this).find('.member-info h4').text()); // Guardamos el nombre del tipo de vivienda
        if (localStorage.getItem('filter_type')) {
            var filterType = localStorage.getItem('filter_type'); // Obtener el valor almacenado en localStorage
                // Buscar el radio button cuyo valor coincide con el valor almacenado y marcarlo como seleccionado
                $('.filter_type').filter(`[value='${filterType}']`).prop('checked', true);
        }
        // Obtenemos el nombre del tipo de vivienda y luego creamos el formato que deseamos para filters_shop
        var nameType = localStorage.getItem('filter_type'); 
        var search = [["name_type", nameType]]; // Creamos el formato [["name_type", "nameType"]]
        // Guardo search en localStorage
        localStorage.setItem('filters_shop', JSON.stringify(search)); // Esto guarda el formato [["name_type", "nameType"]] en localStorage
        // -Finalización marcado filters_shop *2-

        setTimeout(function(){ 
          window.location.href = friendlyURL('?module=shop');
        }, 1000);  
    });

    $(document).on("click",'div.carousel_categories', function (){
        var filters_home = [];
        filters_home.push({"category":[this.getAttribute('id')]});
        localStorage.removeItem('filters_home');
        console.log("hola2 id=" + this.getAttribute('id'));
        localStorage.setItem('filters_home', JSON.stringify(filters_home)); 

        // Borramos filtros de shop indviduales para no ocasionar problemas cuando
        // busquemos con el search despues de pulsar esto
        localStorage.removeItem('filter_city');
        localStorage.removeItem('filter_type');
        localStorage.removeItem('filter_operation');
        localStorage.removeItem('filter_category');
        localStorage.removeItem('filter_extras');
        localStorage.removeItem('filter_distinctweb');
        localStorage.removeItem('filter_orderby');
        localStorage.removeItem('filters_shop');
        // -Fin borrado-

        // -Hacer que se marquen los filters_shop correspondientes *3-
        localStorage.setItem('filter_category', $(this).find('.member-info h4').text()); // Guardamos el nombre de la categoria de la vivienda
        if (localStorage.getItem('filter_category')) {
            $('.filter_category').val(localStorage.getItem('filter_category'));
        }
        // Obtenemos el nombre de la categoria de la vivienda y luego creamos el formato que deseamos para filters_shop
        var nameCategory = localStorage.getItem('filter_category'); 
        var search = [["name_category", nameCategory]]; // Creamos el formato [["name_category", "nameCategory"]]
        // Guardo search en localStorage
        localStorage.setItem('filters_shop', JSON.stringify(search)); // Esto guarda el formato [["name_category", "nameCategory"]] en localStorage
        // -Finalización marcado filters_shop *3-

        setTimeout(function(){ 
          window.location.href = friendlyURL('?module=shop');
        }, 1000);  
    }); 

    $(document).on("click",'div.carousel_operations', function (){
        var filters_home = [];
        filters_home.push({"operation":[this.getAttribute('id')]});
        console.log("hola3 id=" + this.getAttribute('id'));
        localStorage.removeItem('filters_home');
        localStorage.setItem('filters_home', JSON.stringify(filters_home)); 

        // Borramos filtros de shop indviduales para no ocasionar problemas cuando
        // busquemos con el search despues de pulsar esto
        localStorage.removeItem('filter_city');
        localStorage.removeItem('filter_type');
        localStorage.removeItem('filter_operation');
        localStorage.removeItem('filter_category');
        localStorage.removeItem('filter_extras');
        localStorage.removeItem('filter_distinctweb');
        localStorage.removeItem('filter_orderby');
        localStorage.removeItem('filters_shop');
        // -Fin borrado-

        // -Hacer que se marquen los filters_shop correspondientes *4-
        localStorage.setItem('filter_operation', $(this).find('.member-info h4').text()); // Guardamos el nombre de la operación de la vivienda
        if (localStorage.getItem('filter_operation')) {
            $('.filter_operation').val(localStorage.getItem('filter_operation'));
        }
        // Obtenemos el nombre de la operación de la vivienda y luego creamos el formato que deseamos para filters_shop
        var nameOperation = localStorage.getItem('filter_operation'); 
        var search = [["name_operation", nameOperation]]; // Creamos el formato [["name_operation", "nameOperation"]]
        // Guardo search en localStorage
        localStorage.setItem('filters_shop', JSON.stringify(search)); // Esto guarda el formato [["name_operation", "nameOperation"]] en localStorage
        // -Finalización marcado filters_shop *4-

        setTimeout(function(){ 
          window.location.href = friendlyURL('?module=shop');
        }, 1000);  
    });

    $(document).on("click",'div.carousel_cities', function (){
        var filters_home = [];
        filters_home.push({"city":[this.getAttribute('id')]});
        console.log("hola4 id=" + this.getAttribute('id'));
        localStorage.removeItem('filters_home');
        localStorage.setItem('filters_home', JSON.stringify(filters_home)); 

        // Borramos filtros de shop indviduales para no ocasionar problemas cuando
        // busquemos con el search despues de pulsar esto
        localStorage.removeItem('filter_city');
        localStorage.removeItem('filter_type');
        localStorage.removeItem('filter_operation');
        localStorage.removeItem('filter_category');
        localStorage.removeItem('filter_extras');
        localStorage.removeItem('filter_distinctweb');
        localStorage.removeItem('filter_orderby');
        localStorage.removeItem('filters_shop');
        // -Fin borrado-

        // -Hacer que se marquen los filters_shop correspondientes *5-
        var cityName = $(this).find('.member-info h4').text();
        localStorage.setItem('filter_city', JSON.stringify([cityName])); // Convertimos el nombre de la ciudad en un arreglo JSON
        if (localStorage.getItem('filter_city')) {
            $('.filter_city').val(cityName); // Seteamos el valor del campo .filter_city con el nombre de la ciudad directamente
        }
        // Obtenemos el nombre de la ciudad y luego creamos el formato que deseas para filters_shop
        var nameCity = localStorage.getItem('filter_city'); 
        var search = [["name_city", JSON.parse(nameCity)]]; // Convertimos el nombre de la ciudad guardado en localStorage de nuevo a un arreglo
        // Guardo search en localStorage
        localStorage.setItem('filters_shop', JSON.stringify(search)); // Esto guarda el formato [["name_city", ["nameCity"]]] en localStorage
        // -Finalización marcado filters_shop *5-


        setTimeout(function(){ 
          window.location.href = friendlyURL('?module=shop');
        }, 1000);  
    });
} 

$(document).ready(function() {
    carousel_AutomationParts()
    loadTypes()
    loadCategories();
    loadOperations();
    loadCities();
    loadRecommendations();
    loadMostVisited();
    loadLastSearch();
    clicks();
});