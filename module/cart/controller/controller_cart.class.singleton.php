<?php
    class controller_cart {
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
            // echo 'Entro al controller_cart --> view';
            common::load_view('top_page_cart.html', VIEW_PATH_CART . 'cart.html');
        }

        function add_update_Cart() {
            // echo 'Entro al controller_cart --> add_update_Cart';
            echo json_encode(common::load_model('cart_model', 'get_add_update_Cart', [$_POST['access_token'], $_POST['id']]));
        }

        function updateItemsCart() {
            // echo 'Entro al controller_cart --> updateItemsCart';
            echo json_encode(common::load_model('cart_model', 'get_updateItemsCart', $_POST['access_token']));
        }
    }
?>
