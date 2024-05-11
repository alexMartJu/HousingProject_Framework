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
    }
?>