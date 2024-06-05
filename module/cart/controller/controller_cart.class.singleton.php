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

        function paintCart() {
            // echo 'Entro al controller_cart --> paintCart';
            echo json_encode(common::load_model('cart_model', 'get_paintCart', $_POST['access_token']));
        }

        function modifyQuantity() {
            // echo 'Entro al controller_cart --> modifyQuantity';
            echo json_encode(common::load_model('cart_model', 'get_modifyQuantity', [$_POST['access_token'],$_POST['id_product'],$_POST['id_housing'],$_POST['quantity']]));
        }

        function delete_line_Cart() {
            // echo 'Entro al controller_cart --> delete_line_Cart';
            echo json_encode(common::load_model('cart_model', 'get_delete_line_Cart', [$_POST['access_token'],$_POST['id_line']]));
        }

        function removeProduct() {
            // echo 'Entro al controller_cart --> removeProduct';
            echo json_encode(common::load_model('cart_model', 'get_removeProduct', [$_POST['access_token'],$_POST['id_line'],$_POST['id_housing'],$_POST['id_product']]));
        }

        function checkout_view() {
            // echo 'Entro al controller_cart --> view';
            common::load_view('top_page_cart.html', VIEW_PATH_CART . 'checkout.html');
        }

        function paintCheckout() {
            // echo 'Entro al controller_cart --> paintCheckout';
            echo json_encode(common::load_model('cart_model', 'get_paintCheckout', $_POST['access_token']));
        }
    }
?>
