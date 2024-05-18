// ------------------- LOGIN ------------------------ //
function click_login(){
    $("#login").keypress(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            e.preventDefault(); //e.preventDefault() para el formulario y da orden de hacer login().
            login();
        }
    });
    
    $('#login').on('click', function(e) {
        e.preventDefault();
        login();
    }); 
}

function validate_login() {
    var error = false;

    if (document.getElementById('username_log').value.length === 0) {
        document.getElementById('error_username_log').innerHTML = "You must enter the user.";
        error = true;
    } else {
        if (document.getElementById('username_log').value.length < 5) {
            document.getElementById('error_username_log').innerHTML = "The user must be at least 5 characters long.";
            error = true;
        } else {
            document.getElementById('error_username_log').innerHTML = "";
        }
    }

    if (document.getElementById('passwd_log').value.length === 0) {
        document.getElementById('error_passwd_log').innerHTML = "You must enter the password.";
        error = true;
    } else {
        document.getElementById('error_passwd_log').innerHTML = "";
    }

    if (error == true) {
        return 0;
    }
}

function login() {
    if (validate_login() != 0) {
        var username_log = document.getElementById('username_log').value;
        var passwd_log = document.getElementById('passwd_log').value;
        console.log("username_log" + username_log);
        console.log("email_log" + passwd_log);

        ajaxPromise(friendlyURL('?module=login'), 'POST', 'JSON', {'username_log': username_log, 'passwd_log': passwd_log, 'op':'login'})
            .then(function(data) {
                console.log("Datos obtenidos en Login: ", data);
                if (data == "error_user") {
                    document.getElementById('error_username_log').innerHTML = "The user does not exist, make sure you have typed it correctly."
                } else if (data == "error_passwd") {
                    document.getElementById('error_passwd_log').innerHTML = "The password is incorrect."
                } else if (data == "activate_error") {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'You must verify the email',
                        showConfirmButton: false,
                        timer: 3000
                    });
                } else {
                    localStorage.setItem("access_token", data.access_token);
                    localStorage.setItem("refresh_token", data.refresh_token);

                    Swal.fire({
                        icon: 'success',
                        title: 'Logged successfully',
                        text: 'Welcome back, ' + username_log + '!',
                        showConfirmButton: false,
                        timer: 2500
                    }).then(function() {
                        // Redirect after successful login
                        window.location.href = friendlyURL("?module=shop"); //¿poner view?
                    });
                }
            }).catch(function(textStatus) {
                if (console && console.log) {
                    console.log("La solicitud ha fallado: " + textStatus);
                }
            });
    }
}

// ------------------- REGISTER ------------------------ //
function click_register(){
	$("#register__form").keypress(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            e.preventDefault(); //e.preventDefault() para el formulario y da orden de hacer register().
            register();
        }
    });

	$('#register').on('click', function(e) {
        e.preventDefault();
        register();
    });
}

function validate_register() {
    var username_exp = /^(?=.{5,}$)(?=.*[a-zA-Z0-9]).*$/;
    var mail_exp = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
    var pssswd_exp = /^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/;
    var error = false;

    if (document.getElementById('username_reg').value.length === 0) {
        document.getElementById('error_username_reg').innerHTML = "You must enter the user.";
        error = true;
    } else {
        if (document.getElementById('username_reg').value.length < 5) {
            document.getElementById('error_username_reg').innerHTML = "The username must be at least 5 characters long.";
            error = true;
        } else {
            if (!username_exp.test(document.getElementById('username_reg').value)) {
                document.getElementById('error_username_reg').innerHTML = "Special characters are not allowed.";
                error = true;
            } else {
                document.getElementById('error_username_reg').innerHTML = "";
            }
        }
    }

    if (document.getElementById('email_reg').value.length === 0) {
        document.getElementById('error_email_reg').innerHTML = "You must enter the email.";
        error = true;
    } else {
        if (!mail_exp.test(document.getElementById('email_reg').value)) {
            document.getElementById('error_email_reg').innerHTML = "The email format is invalid.";
            error = true;
        } else {
            document.getElementById('error_email_reg').innerHTML = "";
        }
    }

    if (document.getElementById('passwd1_reg').value.length === 0) {
        document.getElementById('error_passwd1_reg').innerHTML = "You must enter the password.";
        error = true;
    } else {
        if (document.getElementById('passwd1_reg').value.length < 8) {
            document.getElementById('error_passwd1_reg').innerHTML = "The password must be at least 8 characters long.";
            error = true;
        } else {
            if (!pssswd_exp.test(document.getElementById('passwd1_reg').value)) {
                document.getElementById('error_passwd1_reg').innerHTML = "Must contain a minimum of 8 characters, uppercase, lowercase and special symbols.";
                error = true;
            } else {
                document.getElementById('error_passwd1_reg').innerHTML = "";
            }
        }
    }

    if (document.getElementById('passwd2_reg').value.length === 0) {
        document.getElementById('error_passwd2_reg').innerHTML = "You have to repeat the password.";
        error = true;
    } else {
        if (document.getElementById('passwd2_reg').value.length < 8) {
            document.getElementById('error_passwd2_reg').innerHTML = "The password must be at least 8 characters long.";
            error = true;
        } else {
            if (document.getElementById('passwd2_reg').value === document.getElementById('passwd1_reg').value) {
                document.getElementById('error_passwd2_reg').innerHTML = "";
            } else {
                document.getElementById('error_passwd2_reg').innerHTML = "The passwords do not match.";
                error = true;
            }
        }
    }

    if (error == true) {
        return 0;
    } else {
        return 1; // Devuelve 1 si la validación es exitosa
    }
}

function register() {
    if (validate_register() != 0) {
        console.log("Entro validate register");
        
        var username_reg = document.getElementById('username_reg').value;
        var email_reg = document.getElementById('email_reg').value;
        var password1_reg = document.getElementById('passwd1_reg').value;
        var password2_reg = document.getElementById('passwd2_reg').value;
        console.log("username" + username_reg);
        console.log("email" + email_reg);
        console.log("pass1" + password1_reg);
        console.log("pass2" + password2_reg);

        ajaxPromise(friendlyURL('?module=login'), 'POST', 'JSON', {'email_reg': email_reg, 'username_reg': username_reg, 'password1_reg': password1_reg, 'op':'register'})
            .then(function(data) {
                console.log("Datos obtenidos en Register: ", data);
                console.log("Entro then");
                if (data == "error_email") {
                    console.log("Register: Error email.");
                    document.getElementById('error_email_reg').innerHTML = "The email is already in use, make sure you do not already have an account."
                } else if (data == "error_username") {
                    console.log("Register: Error username.");
                    document.getElementById('error_username_reg').innerHTML = "The user is already in use, try another one."
                } else if (data == "error_user") {
                    console.log("Register: Error user.");
                    Swal.fire({
                        icon: 'error',
                        title: 'Registration Failed',
                        text: 'There was an error during registration. Please try again later.',
                        showConfirmButton: false,
                        timer: 5000
                      }).then(function() {
                          // Redireccionar después de un registro exitoso
                          window.location.href = friendlyURL("?module=login");
                      });
                } else {
                    console.log("Register: ok.");
                    Swal.fire({
                        icon: 'info',
                        title: 'Verify Your Email',
                        text: 'Please check your email to verify your account and complete the registration process, ' + username_reg + '!',
                        showConfirmButton: false,
                        timer: 5000
                      }).then(function() {
                          // Redireccionar después de un registro exitoso
                          window.location.href = friendlyURL("?module=login");
                      });
                    
                }
            }).catch(function(textStatus) {
                if (console && console.log) {
                    console.log("La solicitud ha fallado: " + textStatus);
                }
            });
    }
}

$(document).ready(function(){
    click_register();
    click_login();
});