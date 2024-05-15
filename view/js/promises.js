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
    $('<li></li>').html('<a href="' + friendlyURL("?module=home") + '" class="active">Home</a>').appendTo('#navbar ul');
    $('<li></li>').html('<a href="' + friendlyURL("?module=shop") + '">Shop</a>').appendTo('#navbar ul');
    $('<div class="login-register-button"></div>').appendTo('#navbar ul'); 
    $('<div class="logout_login-button"></div>').appendTo('#navbar ul'); 

    var access_token = localStorage.getItem('access_token');
    var refresh_token = localStorage.getItem('refresh_token');
    if (access_token && refresh_token) {
        ajaxPromise('module/login/controller/controller_login.php?op=data_user', 'POST', 'JSON', { 'access_token': access_token })
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
                // Crear el contenedor para la imagen y el botón
                var $container_avatar_logout = $('<div></div>').appendTo('.logout_login-button');

                // Crear la imagen con una clase
                var $avatar = $('<img src="' + data.avatar + '" alt="Robot">').addClass('avatar-image');
                $avatar.appendTo($container_avatar_logout);

                // Crear el texto del nombre de usuario
                var $username = $('<span class="span_username_logout">' + data.username + '</span>').addClass('username-text');
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
    ajaxPromise('module/login/controller/controller_login.php?op=logout', 'POST', 'JSON')
        .then(function(data) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            window.location.href = "index.php?page=controller_home&op=list";
        }).catch(function() {
            console.log('Something has occured');
        });
}

$(document).ready(function() {
    load_menu();
    click_logout();
});