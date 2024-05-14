<?php
    class controller_search {
        static $_instance;

        function __construct() {
		}
        
        public static function getInstance() {  
            if (!(self::$_instance instanceof self)) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }
        
        function search_type() {
            // echo 'Entro al controller_search --> search_type';
            echo json_encode(common::load_model('search_model', 'get_search_type'));
        }

        function search_category_null() {
            // echo 'Entro al controller_search --> search_category_null';
            echo json_encode(common::load_model('search_model', 'get_search_category_null'));
        }

        function search_category() {
            // echo 'Entro al controller_search --> search_category';
            echo json_encode(common::load_model('search_model', 'get_search_category', $_POST['h_type']));
        }

        function autocomplete() {
            // echo 'Entro al controller_search --> autocomplete';
            echo json_encode(common::load_model('search_model', 'get_autocomplete', [$_POST['complete'], $_POST['h_type'] , $_POST['category']]));
        }
    }
?>