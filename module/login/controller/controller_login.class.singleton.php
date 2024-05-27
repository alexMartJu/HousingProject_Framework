<?php
    class controller_login {
        static $_instance;

        function __construct() {
		}
        
        public static function getInstance() {  
            if (!(self::$_instance instanceof self)) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }
        
        function view() {
            // echo 'Entro al controller_login --> view';
            common::load_view('top_page_login.html', VIEW_PATH_LOGIN . 'login_register.html');
        }

        function recover_view() {
            // echo 'Entro al controller_login --> recover_view';
            common::load_view('top_page_login.html', VIEW_PATH_LOGIN . 'recover_pass.html');
        }

        function register() {
            // echo 'Entro al controller_login --> register';
            echo json_encode(common::load_model('login_model', 'get_register', [$_POST['username_reg'], $_POST['email_reg'], $_POST['password1_reg']]));
        }

        function verify_email() {
            // echo 'Entro al controller_login --> verify_email';
            echo json_encode(common::load_model('login_model', 'get_verify_email', $_POST['token_email']));
        }

        function login() {
            // echo 'Entro al controller_login --> login';
            echo json_encode(common::load_model('login_model', 'get_login', [$_POST['username_log'], $_POST['passwd_log']]));
        }

        function send_recover_email() {
            // echo 'Entro al controller_login --> send_recover_email';
            echo json_encode(common::load_model('login_model', 'get_send_recover_email', $_POST['email_forg']));
        }

        function verify_token() {
            // echo 'Entro al controller_login --> verify_token';
            echo json_encode(common::load_model('login_model', 'get_verify_token', $_POST['token_email']));
        }

        function new_password() {
            // echo 'Entro al controller_login --> new_password';
            echo json_encode(common::load_model('login_model', 'get_new_password', [$_POST['token_email'], $_POST['password']]));
        }
        
        function logout() {
            // echo 'Entro al controller_login --> logout';
            echo json_encode(common::load_model('login_model', 'get_logout'));
        }
        
        function data_user() {
            // echo 'Entro al controller_login --> data_user';
            echo json_encode(common::load_model('login_model', 'get_data_user', $_POST['access_token']));
        }

        function actividad() {
            // echo 'Entro al controller_login --> actividad';
            echo json_encode(common::load_model('login_model', 'get_actividad'));
        }

        function controluser() {
            // echo 'Entro al controller_login --> controluser';
            echo json_encode(common::load_model('login_model', 'get_controluser', [$_POST['access_token'], $_POST['refresh_token']]));
        }

        function refresh_cookie() {
            // echo 'Entro al controller_login --> refresh_cookie';
            echo json_encode(common::load_model('login_model', 'get_refresh_cookie'));
        }

        function intro_Otp() {
            // echo 'Entro al controller_login --> intro_Otp';
            echo json_encode(common::load_model('login_model', 'get_intro_Otp', [$_POST['username'], $_POST['otp']]));
        }
    }
?>