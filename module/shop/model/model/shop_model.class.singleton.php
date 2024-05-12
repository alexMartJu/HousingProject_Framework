<?php
    class shop_model {

        private $bll;
        static $_instance;
        
        function __construct() {
            $this -> bll = shop_bll::getInstance();
        }

        public static function getInstance() {
            // return 'Entro a shop_model --> getInstance';
            if (!(self::$_instance instanceof self)) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function get_all_housings($args) {
            // return 'Entro a shop_model --> get_all_housings'; 
            return $this -> bll -> get_all_housings_BLL($args);
        }

        public function get_details_housing($args) {
            // return 'Entro a shop_model --> get_details_housing'; 
            return $this -> bll -> get_details_housing_BLL($args);
        }

        public function get_filters_home($args) {
            // return 'Entro a shop_model --> get_filters_home'; 
            return $this -> bll -> get_filters_home_BLL($args);
        }

        public function get_filters_shop($args) {
            // return 'Entro a shop_model --> get_filters_shop'; 
            return $this -> bll -> get_filters_shop_BLL($args);
        }
    }
?>