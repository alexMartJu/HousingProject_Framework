<?php
    class login_model {

        private $bll;
        static $_instance;
        
        function __construct() {
            $this -> bll = login_bll::getInstance();
        }

        public static function getInstance() {
            // return 'Entro a login_model --> getInstance';
            if (!(self::$_instance instanceof self)) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function get_register($args) {
            // return 'Entro a login_model --> get_register';
            return $this -> bll -> get_register_BLL($args);
        }

        public function get_verify_email($args) {
            // return 'Entro a login_model --> get_verify_email';
            return $this -> bll -> get_verify_email_BLL($args);
        }

        public function get_login($args) {
            // return 'Entro a login_model --> get_login';
            return $this -> bll -> get_login_BLL($args);
        }

        public function get_send_recover_email($args) {
            // return 'Entro a login_model --> get_send_recover_email';
            return $this -> bll -> get_send_recover_email_BBL($args);
        }
    
        public function get_verify_token($args) {
            // return 'Entro a login_model --> get_verify_token';
            return $this -> bll -> get_verify_token_BLL($args);
        }
    
        public function get_new_password($args) {
            // return 'Entro a login_model --> get_new_password';
            return $this -> bll -> get_new_password_BLL($args);
        }
    }
?>