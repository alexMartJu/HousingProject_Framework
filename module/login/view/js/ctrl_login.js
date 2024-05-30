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
    
    //Clicar si se ha olvidado contraseña
    $('#forget_pass').on('click', function(e) {
        e.preventDefault();
        load_form_recover_password();
    });

    $('#google').on('click', function(e) {
        social_login('google');
    }); 

    $('#github').on('click', function(e) {
        social_login('github');
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
                } else if (data == "otp_sent") {
                    Swal.fire({
                        icon: 'info',
                        title: 'OTP Code Sent',
                        text: 'We have sent an OTP code to your mobile phone.',
                        showConfirmButton: false,
                        timer: 2500
                    }).then(function() {
                        showOtpInput(username_log);
                    });
                } else if (data == "otp_error") {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Error sending OTP. Please try again later.',
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

// ------------------- SOCIAL LOGIN ------------------------ //
function social_login(param){
    authService = firebase_config();
    authService.signInWithPopup(provider_config(param))
    .then(function(result) {
        console.log('Hemos autenticado al usuario ', result.user);
        email_name = result.user.email;
        let username = email_name.split('@');
        let custom_username = username[0] + '_' + param;
        console.log(custom_username);

        social_user = {id: result.user.uid, username: custom_username, email: result.user.email, avatar: result.user.photoURL, 'op':'social_login'};
        if (result) {
            ajaxPromise(friendlyURL("?module=login"), 'POST', 'JSON', social_user)
            .then(function(data) {
                localStorage.setItem("access_token", data.access_token);
                localStorage.setItem("refresh_token", data.refresh_token);

                Swal.fire({
                    icon: 'success',
                    title: 'Logged successfully',
                    text: 'Welcome back!',
                    showConfirmButton: false,
                    timer: 2500
                }).then(function() {
                    window.location.href = friendlyURL("?module=home");
                });
            })
            .catch(function(error) {
                console.log('Error: Social login error', error);
            });
        }
    })
    .catch(function(error) {
        var errorCode = error.code;
        console.log(errorCode);
        var errorMessage = error.message;
        console.log(errorMessage);
        var email = error.email;
        console.log(email);
        var credential = error.credential;
        console.log(credential);
    });
}

function firebase_config(){
    var config = {
        apiKey: API_KEY,
        authDomain: AUTH_DOMAIN,
        projectId: PROJECT_ID,
        storageBucket: STORAGE_BUCKET,
        messagingSenderId: MESSAGING_SENDER_ID,
        appId: APP_ID,
        measurementId: MEASUREMENT_ID
    };
    if(!firebase.apps.length){
        firebase.initializeApp(config);
    }else{
        firebase.app();
    }
    return authService = firebase.auth();
}

function provider_config(param){
    if(param === 'google'){
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('email');
        return provider;
    }else if(param === 'github'){
        return provider = new firebase.auth.GithubAuthProvider();
    }
}

// ------------------- OTP LOGIN ------------------------ //
function click_otp(){
	$("#otp_form").keypress(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            e.preventDefault(); //e.preventDefault() para el formulario y da orden de hacer register().
            intro_Otp();
        }
    });

	$('#button_set_otp').on('click', function(e) {
        e.preventDefault();
        intro_Otp();
    });
}

function showOtpInput(username) {
    $(".login-wrap").hide();
    $('.section_login').css('padding', '0px');
    $('.section_otp').css('padding', '60px 0');
    $('#otp_container').css('margin-top', '0px');
    var otpContainer = document.getElementById('otp_container');
    otpContainer.innerHTML = `
    <div class="otp_html">
        <form id="otp_form" method="post">
            <h1>Introduce OTP</h1>
            <div class="otp">
                <div class="check_otp_username">
                    <label for="otp_username" class="label">Username: </label>
                    <br>
                    <input id="otp_username" name="otp_username" type="text" class="input" value="${username}" readonly>
                    <font color="red">
                        <br>
                        <span id="error_otp_username" class="error"></span>
                    </font>
                </div>
                <div class="check_otp_input">
                    <label for="otp_input" class="label">OTP Code: </label>
                    <br>
                    <input id="otp_input" name="otp_input" type="text" class="input">
                    <font color="red">
                        <br>
                        <span id="error_otp_input" class="error"></span>
                    </font>
                </div>
                <div class="button_send">
                    <input type="button" class="button" id="button_set_otp" value="Send OTP">
                </div>
            </div>
        </form>
    </div>
    `;
    click_otp();
}

function validate_otp() {
    var error = false;

    if (document.getElementById('otp_input').value.length === 0) {
        document.getElementById('error_otp_input').innerHTML = "You must enter the OTP code.";
        error = true;
    } else {
        document.getElementById('error_otp_input').innerHTML = "";
    }

    if (error == true) {
        return 0;
    }
}

function intro_Otp() {
    if (validate_otp() != 0) {
        var username = document.getElementById('otp_username').value;
        var otp = document.getElementById('otp_input').value;
        ajaxPromise(friendlyURL('?module=login'), 'POST', 'JSON', {'username': username, 'otp': otp, 'op':'intro_Otp'})
            .then(function(data) {
                console.log("Datos recibidos intro_Otp: ", data);
                if (data == "otp_valid") {
                    Swal.fire({
                        icon: 'success',
                        title: 'OTP Verified',
                        text: 'Your OTP has been verified. You can now log in.',
                        showConfirmButton: false,
                        timer: 2500
                    }).then(function() {
                        window.location.href = friendlyURL("?module=login");
                    });
                } else if (data == "otp_expired") {
                    Swal.fire({
                        icon: 'error',
                        title: 'Expired OTP code',
                        text: 'We have sent another OTP code to your mobile phone.',
                        showConfirmButton: false,
                        timer: 3000
                    });
                } else if (data == "otp_invalid") {
                    document.getElementById('error_otp_input').innerHTML = "The OPT isn't correct!"
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Something wrong occured!',
                        showConfirmButton: false,
                        timer: 3000
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

// ------------------- RECOVER PASSWORD ------------------------ //
function load_form_recover_password(){
    $(".login-wrap").hide();
    $(".forget_html").show();
    $('html, body').animate({scrollTop: $(".forget_html")});
    click_recover_password();
}

function click_recover_password(){
    $(".forget_html").keypress(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if(code==13){
        	e.preventDefault();
            send_recover_password();
        }
    });

    $('#button_recover').on('click', function(e) {
        e.preventDefault();
        send_recover_password();
    }); 
}

function validate_recover_password(){
    var mail_exp = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
    var error = false;

    if(document.getElementById('email_forg').value.length === 0){
		document.getElementById('error_email_forg').innerHTML = "You have to write an email";
		error = true;
	}else{
        if(!mail_exp.test(document.getElementById('email_forg').value)){
            document.getElementById('error_email_forg').innerHTML = "The email format is invalid"; 
            error = true;
        }else{
            document.getElementById('error_email_forg').innerHTML = "";
        }
    }
	
    if(error == true){
        return 0;
    }
}

function send_recover_password(){
    if(validate_recover_password() != 0){
        var email_forg = document.getElementById('email_forg').value;
        ajaxPromise(friendlyURL('?module=login'), 'POST', 'JSON', {'email_forg': email_forg, 'op':'send_recover_email'})
            .then(function(data) {
                console.log("Datos obtenidos en send_recover_password: ", data);
                if(data == "error"){		
                    $("#error_email_forg").html("The email doesn't exist");
                } else{
                    Swal.fire({
                        icon: 'info',
                        title: 'Email Sended',
                        text: 'Please check your email to recover your password',
                        showConfirmButton: false,
                        timer: 3000
                    }).then(function() {
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

function load_form_new_password(){
    token_email = localStorage.getItem('token_email');
    localStorage.removeItem('token_email');
    ajaxPromise(friendlyURL('?module=login'), 'POST', 'JSON', {'token_email': token_email, 'op':'verify_token'})
            .then(function(data) {
                console.log("Datos obtenidos en load_form_new_password: ", data);
                if(data == "verify"){
                    click_new_password(token_email); 
                }else {
                    // console.log("error");
                    Swal.fire({
                        icon: 'error',
                        title: 'Recover Token Expired',
                        text: 'The Recover token expired. A new email has been sent to verify you.',
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

function click_new_password(token_email){
    $(".recover_html").keypress(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if(code==13){
        	e.preventDefault();
            send_new_password(token_email);
        }
    });

    $('#button_set_pass').on('click', function(e) {
        e.preventDefault();
        send_new_password(token_email);
    }); 
}

function validate_new_password(){
    var error = false;

    if(document.getElementById('pass_rec').value.length === 0){
		document.getElementById('error_password_rec').innerHTML = "You have to write a password";
		error = true;
	}else{
        if(document.getElementById('pass_rec').value.length < 8){
            document.getElementById('error_password_rec').innerHTML = "The password must be longer than 8 characters";
            error = true;
        }else{
            document.getElementById('error_password_rec').innerHTML = "";
        }
    }

    if(document.getElementById('pass_rec_2').value != document.getElementById('pass_rec').value){
		document.getElementById('error_password_rec_2').innerHTML = "Passwords don't match";
		error = true;
	}else{
        document.getElementById('error_password_rec_2').innerHTML = "";
    }

    if(error == true){
        return 0;
    }
}

function send_new_password(token_email){
    if(validate_new_password() != 0){
        password= $('#pass_rec').val();
        console.log("password ", password);
        ajaxPromise(friendlyURL('?module=login'), 'POST', 'JSON', {'token_email': token_email, 'password' : password, 'op':'new_password'})
            .then(function(data) {
                console.log("Datos obtenidos en send_new_password: ", data);
                if(data == "done"){
                    Swal.fire({
                        icon: 'success',
                        title: 'Change Password',
                        text: 'New password changed',
                        showConfirmButton: false,
                        timer: 3000
                    }).then(function() {
                        window.location.href = friendlyURL("?module=login");
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Error seting new password',
                        showConfirmButton: false,
                        timer: 3000
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