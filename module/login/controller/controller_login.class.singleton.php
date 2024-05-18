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
    }
?>