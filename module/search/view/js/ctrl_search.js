function load_types() {
    ajaxPromise('?module=search&op=search_type', 'POST', 'JSON')
        .then(function (data) {
            console.log("Datos recibidos de search_load_types:", data);
            $('<option>Type</option>').attr('selected', true).attr('disabled', true).appendTo('.search_type')
            for (row in data) {
                $('<option value="' + data[row].name_type + '">' + data[row].name_type + '</option>').appendTo('.search_type')
            }
        }).catch(function () {
            window.location.href = "index.php?page=503";
            // window.location.href = "index.php?modules=exception&op=503&error=fail_load_brands&type=503";
        });
}

// function load_category(h_type) {
//     $('.search_category').empty();

//     if (h_type == undefined) {
//         ajaxPromise('module/search/controller/controller_search.php?op=search_category_null', 'POST', 'JSON')
//             .then(function (data) {
//                 $('<option>Category</option>').attr('selected', true).attr('disabled', true).appendTo('.search_category')
//                 for (row in data) {
//                     $('<option value="' + data[row].name_category + '">' + data[row].name_category + '</option>').appendTo('.search_category')
//                 }
//             }).catch(function () {
//                 window.location.href = "index.php?page=503";
//                 // window.location.href = "index.php?modules=exception&op=503&error=fail_load_category&type=503";
//             });
//     }
//     else {
//         ajaxPromise('module/search/controller/controller_search.php?op=search_category', 'POST', 'JSON', h_type)
//             .then(function (data) {
//                 for (row in data) {
//                     $('<option value="' + data[row].name_category + '">' + data[row].name_category + '</option>').appendTo('.search_category')
//                 }
//             }).catch(function () {
//                 window.location.href = "index.php?page=503";
//                 // window.location.href = "index.php?modules=exception&op=503&error=fail_loas_category_2&type=503";
//             });
//     }
// }

function launch_search() {
    load_types();
    // load_category();
    // $(document).on('change', '.search_type', function () {
    //     let h_type = $(this).val();
    //     console.log("hola " + h_type);
    //     // let h_type = $(event.target).val();
    //     if (h_type === 0) {
    //         load_category();
    //     } else {
    //         load_category({ h_type });
    //     }
    // });
}

// function autocomplete() {
    
//     $("#autocom").on("keyup", function () {
//         console.log("autocomplete() function is running!");
//         let sdata = { complete: $(this).val() };
        
//         if (($('.search_type').val() != 0)) {
//             sdata.h_type = $('.search_type').val();
//             if (($('.search_type').val() != 0) && ($('.search_category').val() != 0)) {
//                 sdata.category = $('.search_category').val();
//             }
//         }
//         if (($('.search_type').val() == undefined) && ($('.search_category').val() != 0)) {
//             sdata.category = $('.search_category').val();
//         }
//         ajaxPromise('module/search/controller/controller_search.php?op=autocomplete', 'POST', 'JSON', sdata)
//             .then(function (data) {
//                 // $('#searchAuto').empty();
//                 // $('#searchAuto').fadeIn(10000000);
//                 $('#search_auto').empty();
//                 $('#search_auto').fadeIn(1000);
//                 for (row in data) {
//                     $('<div></div>').appendTo('#search_auto').html(data[row].name_city).attr({ 'class': 'searchElement', 'id': data[row].name_city });
//                 }
//                 $(document).on('click', '.searchElement', function () {
//                     $('#autocom').val(this.getAttribute('id'));
//                     $('#search_auto').fadeOut(1000);
//                 });
//                 $(document).on('click scroll', function (event) {
//                     if (event.target.id !== 'autocom') {
//                         $('#search_auto').fadeOut(1000);
//                     }
//                 });
//             }).catch(function () {
//                 $('#search_auto').fadeOut(500);
//             });
//     });
// }


// function button_search() {
//     $('#search-btn').on('click', function () {
//         var search = [];
        
//         //Mantenemos los filtros pintados que ya tenemos en filters_shop*
//         if (localStorage.getItem('filter_distinctweb')) {
//             search.push([ "name_aut_parts", localStorage.getItem('filter_distinctweb') ])
//         }
//         if (localStorage.getItem('filter_orderby')) {
//             search.push([ "name_orderby", localStorage.getItem('filter_orderby') ])
//         }
//         if (localStorage.getItem('filter_extras')) {
//             search.push([ "name_extras", localStorage.getItem('filter_extras') ])
//         }
//         if (localStorage.getItem('filter_operation')) {
//             search.push([ "name_operation", localStorage.getItem('filter_operation') ])
//         }
//         if (localStorage.getItem('filter_city')) {
//             // Analizar el valor almacenado para convertirlo de nuevo en un array
//             const ciudad = JSON.parse(localStorage.getItem('filter_city'));
            
//             // Agregar la información de la ciudad como un array sin corchetes adicionales
//             search.push(["name_city", ciudad]);
//         }
//         if (localStorage.getItem('filter_type')) {
//             search.push([ "name_type", localStorage.getItem('filter_type') ])
//         }
//         if (localStorage.getItem('filter_category')) {
//             search.push([ "name_category", localStorage.getItem('filter_category') ])
//         }
//         //Fin*

//         if ($('.search_type').val() != undefined) {
//             // search.push([ "name_type", $('.search_type').val() ])
//             // Antes de agregar el nuevo tipo de búsqueda, eliminamos cualquier entrada previa de "name_type"
//             search = search.filter(item => item[0] !== "name_type");

//             // Luego, agregamos el nuevo tipo de búsqueda
//             search.push(["name_type", $('.search_type').val()]);

//             // -Hacer que se marquen los filters_shop correspondientes *1-
//             localStorage.setItem('filter_type', $('.search_type').val());
//             if (localStorage.getItem('filter_type')) {
//                 var filterType = localStorage.getItem('filter_type'); // Obtener el valor almacenado en localStorage
//                 // Buscar el radio button cuyo valor coincide con el valor almacenado y marcarlo como seleccionado
//                 $('.filter_type').filter(`[value='${filterType}']`).prop('checked', true);
//             }
//             // -Finalización marcado filters_shop *1-

//             if ($('.search_category').val() != undefined) {
//                 // search.push([ "name_category", $('.search_category').val() ])
//                 // Antes de agregar la nueva categoría de búsqueda, eliminamos cualquier entrada previa de "name_category"
//                 search = search.filter(item => item[0] !== "name_category");
    
//                 // Luego, agregamos la nueva categoría de búsqueda
//                 search.push(["name_category", $('.search_category').val()]);
//                 localStorage.setItem('filter_category', $('.search_category').val());
//                 if (localStorage.getItem('filter_category')) {
//                     $('.filter_category').val(localStorage.getItem('filter_category'));
//                 }
//             }
//         } else if ($('.search_type').val() == undefined) {
//             if ($('.search_category').val() != undefined) {
//                 // search.push([ "name_category", $('.search_category').val() ])
//                 // Antes de agregar la nueva categoría de búsqueda, eliminamos cualquier entrada previa de "name_category"
//                 search = search.filter(item => item[0] !== "name_category");
    
//                 // Luego, agregamos la nueva categoría de búsqueda
//                 search.push(["name_category", $('.search_category').val()]);

//                 // -Hacer que se marquen los filters_shop correspondientes *2-
//                 localStorage.setItem('filter_category', $('.search_category').val());
//                 if (localStorage.getItem('filter_category')) {
//                     $('.filter_category').val(localStorage.getItem('filter_category'));
//                 }
//                 // -Finalización marcado filters_shop *2-

//             }
//         }
//         var cityValue = $('#autocom').val(); // Obtener el valor de la ciudad
//         // if (cityValue !== "") {
//         //     search.push(["name_city", [cityValue]]);

//         //     // -Hacer que se marquen los filters_shop correspondientes *3-
//         //     localStorage.setItem('filter_city', JSON.stringify([cityValue]));
//         //     if (localStorage.getItem('filter_city')) {
//         //         $('.filter_city').val(JSON.parse(localStorage.getItem('filter_city')));
//         //     }
//         // // -Finalización marcado filters_shop *3-

//         // }
//         if (cityValue !== "") {
//             // Verificar si ya existe una entrada "name_city"
//             var cityIndex = search.findIndex(item => item[0] === "name_city");
        
//             if (cityIndex !== -1) {
//                 // Si ya existe, agregamos la nueva ciudad a la lista existente de ciudades
//                 if (!search[cityIndex][1].includes(cityValue)) {
//                     search[cityIndex][1].push(cityValue);
//                 }
//             } else {
//                 // Si no existe, creamos una nueva entrada "name_city" con la ciudad
//                 search.push(["name_city", [cityValue]]);
//             }
        
//             // -Hacer que se marquen los filters_shop correspondientes *3-
//             // Actualizar el valor de filter_city en localStorage
//             localStorage.setItem('filter_city', JSON.stringify(search.find(item => item[0] === "name_city")[1]));
//             // Establecer el valor seleccionado en el elemento HTML
//             $('.filter_city').val(JSON.parse(localStorage.getItem('filter_city')));
//             // -Finalización marcado filters_shop *3-
//         }
//         localStorage.removeItem('filters_shop');
//         if (search.length != 0) {
//             localStorage.setItem('filters_shop', JSON.stringify(search));
//         }
//         window.location.href = 'index.php?page=controller_shop&op=list';
//     });
// }


$(document).ready(function () {
    launch_search();
    // autocomplete();
    // button_search();
});