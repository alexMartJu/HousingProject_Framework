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
    }
?>