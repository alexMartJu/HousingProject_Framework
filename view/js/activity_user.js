function protecturl() {
    // var token = localStorage.getItem('token');
    var access_token = localStorage.getItem('access_token');
    var refresh_token = localStorage.getItem('refresh_token');
    if(access_token && refresh_token) {
        ajaxPromise('module/login/controller/controller_login.php?op=controluser', 'POST', 'JSON', { 'access_token': access_token, 'refresh_token': refresh_token })
        .then(function(data) {
            if (data == "Correct_User") {
                console.log("CORRECTO-->El usuario coincide con la session");
            } else if (data == "Wrong_User") {
                console.log("INCORRECTO--> Estan intentando acceder a una cuenta");
                logout_auto();
            } else if (data == "Token_ExpirationTime") {
                console.log("INCORRECTO--> El token ha expirado");
                logout_auto();
            } else {
                console.log("CORRECTO-->Access token refreshed correctly");
                localStorage.setItem("access_token", data);
                load_menu();
            }
        })
        .catch(function() { console.log("ANONYMOUS_user") });
    } else {
        console.log("No hay un usuario logueado ahora mismo")
    }
}

function control_activity() {
    var access_token = localStorage.getItem('access_token');
    var refresh_token = localStorage.getItem('refresh_token');
    if (access_token  && refresh_token) {
        ajaxPromise('module/login/controller/controller_login.php?op=actividad', 'POST', 'JSON')
            .then(function(response) {
                if (response == "inactivo") {
                    console.log("usuario INACTIVO");
                    logout_auto();
                } else {
                    console.log("usuario ACTIVO")
                }
            });
    } else {
        console.log("No hay usario logueado");
    }
}

function refresh_cookie() {
    ajaxPromise('module/login/controller/controller_login.php?op=refresh_cookie', 'POST', 'JSON')
        .then(function(response) {
            console.log("Refresh cookie correctly");
        });
}

function logout_auto() {
    ajaxPromise('module/login/controller/controller_login.php?op=logout', 'POST', 'JSON')
        .then(function(data) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            Swal.fire({
                icon: 'error',
                title: 'Check Security',
                text: 'The account has been closed for security reasons!',
                timer: 2000, // Mostrar la alerta durante 2 segundos
                showConfirmButton: false, // Ocultar el botón de confirmación
              }).then((result) => {
                // Después de que la alerta se cierre automáticamente
                window.location.href = "index.php?page=controller_login&op=login-register_view";
              });
        }).catch(function() {
            console.log('Something has occured');
        });
}

$(document).ready(function() {
    protecturl();
    setInterval(function() { control_activity() }, 60000); //10min= 600000
    setInterval(function() { refresh_cookie() }, 60000);
});