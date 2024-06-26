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

        public function get_modifyQuantity($args) {
            // return 'Entro a cart_model --> get_modifyQuantity'; 
            return $this -> bll -> get_modifyQuantity_BLL($args);
        }

        public function get_delete_line_Cart($args) {
            // return 'Entro a cart_model --> get_delete_line_Cart'; 
            return $this -> bll -> get_delete_line_Cart_BLL($args);
        }

        public function get_removeProduct($args) {
            // return 'Entro a cart_model --> get_removeProduct'; 
            return $this -> bll -> get_removeProduct_BLL($args);
        }

        public function get_paintCheckout($args) {
            // return 'Entro a cart_model --> get_paintCheckout'; 
            return $this -> bll -> get_paintCheckout_BLL($args);
        }

        public function get_finish_buy($args) {
            // return 'Entro a cart_model --> get_finish_buy'; 
            return $this -> bll -> get_finish_buy_BLL($args);
        }
    }
?>