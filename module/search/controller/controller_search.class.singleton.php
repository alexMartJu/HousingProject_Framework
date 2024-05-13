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
    }
?>