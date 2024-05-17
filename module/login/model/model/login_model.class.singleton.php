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
    }
?>