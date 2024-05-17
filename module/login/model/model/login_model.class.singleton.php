<?php
    class login_model {

        private $bll;
        static $_instance;
        
        function __construct() {
        }

        public static function getInstance() {
            // return 'Entro a shop_model --> getInstance';
            if (!(self::$_instance instanceof self)) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function get_register() {
            return 'Entro a login_model --> get_register';
        }
    }
?>