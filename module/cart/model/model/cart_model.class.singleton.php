<?php
    class cart_model {

        private $bll;
        static $_instance;
        
        function __construct() {
            $this -> bll = cart_bll::getInstance();
        }

        public static function getInstance() {
            // return 'Entro a cart_model --> getInstance';
            if (!(self::$_instance instanceof self)) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function get_add_update_Cart($args) {
            // return 'Entro a cart_model --> get_add_update_Cart'; 
            return $this -> bll -> get_add_update_Cart_BLL($args);
        }

        public function get_updateItemsCart($args) {
            // return 'Entro a cart_model --> get_add_update_Cart'; 
            return $this -> bll -> get_updateItemsCart_BLL($args);
        }

        public function get_paintCart($args) {
            // return 'Entro a cart_model --> get_paintCart'; 
            return $this -> bll -> get_paintCart_BLL($args);
        }
    }
?>