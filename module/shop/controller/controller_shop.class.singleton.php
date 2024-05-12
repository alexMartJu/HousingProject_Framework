<?php
    class controller_shop {
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
            // echo 'Entro al controller_shop --> view';
            common::load_view('top_page_shop.html', VIEW_PATH_SHOP . 'shop.html');
        }

        function all_housings() {
            // echo 'Entro al controller_shop --> all_housings';
            echo json_encode(common::load_model('shop_model', 'get_all_housings', [$_POST['offset'], $_POST['items_page']]));
        }

        function details_housing() {
            // echo 'Entro al controller_shop --> all_housings';
            echo json_encode(common::load_model('shop_model', 'get_details_housing', $_POST['id']));
        }

        function filters_home() {
            // echo 'Entro al controller_shop --> filters_home';
            echo json_encode(common::load_model('shop_model', 'get_filters_home', [$_POST['filters'], $_POST['offset'], $_POST['items_page']]));
        }

        function filters_shop() {
            // echo 'Entro al controller_shop --> filters_shop';
            echo json_encode(common::load_model('shop_model', 'get_filters_shop', [$_POST['filters__shop'], $_POST['offset'], $_POST['items_page']]));
        }

        function print_dynamic_filters_shop() {
            // echo 'Entro al controller_shop --> print_dynamic_filters_shop';
            echo json_encode(common::load_model('shop_model', 'get_print_dynamic_filters_shop'));
        }

        function count_filters_home() {
            // echo 'Entro al controller_shop --> count_filters_home';
            echo json_encode(common::load_model('shop_model', 'get_count_filters_home', $_POST['filters']));
        }

        function count_filters_shop() {
            // echo 'Entro al controller_shop --> count_filters_shop';
            echo json_encode(common::load_model('shop_model', 'get_count_filters_shop', $_POST['filters__shop']));
        }

        function count_all() {
            // echo 'Entro al controller_shop --> count_all';
            echo json_encode(common::load_model('shop_model', 'get_count_all'));
        }

        function count_housings_related() {
            // echo 'Entro al controller_shop --> count_housings_related';
            echo json_encode(common::load_model('shop_model', 'get_count_housings_related', [$_POST['housing_type'], $_POST['current_housing_id']]));
        }

        function housings_related() {
            // echo 'Entro al controller_shop --> housings_related';
            echo json_encode(common::load_model('shop_model', 'get_housings_related', [$_POST['housing_type'], $_POST['current_housing_id'], $_POST['current_extras_id'], $_POST['offset_housing'], $_POST['items']]));
        }
    }
?>