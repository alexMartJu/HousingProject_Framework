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

        public function get_print_dynamic_filters_shop() {
            // return 'Entro a shop_model --> get_print_dynamic_filters_shop'; 
            return $this -> bll -> get_print_dynamic_filters_shop_BLL();
        }

        public function get_count_filters_home($args) {
            // return 'Entro a shop_model --> get_count_filters_home'; 
            return $this -> bll -> get_count_filters_home_BLL($args);
        }

        public function get_count_filters_shop($args) {
            // return 'Entro a shop_model --> get_count_filters_shop'; 
            return $this -> bll -> get_count_filters_shop_BLL($args);
        }

        public function get_count_all() {
            // return 'Entro a shop_model --> get_count_all'; 
            return $this -> bll -> get_count_all_BLL();
        }

        public function get_count_housings_related($args) {
            // return 'Entro a shop_model --> get_count_housings_related'; 
            return $this -> bll -> get_count_housings_related_BLL($args);
        }

        public function get_housings_related($args) {
            // return 'Entro a shop_model --> get_housings_related'; 
            return $this -> bll -> get_housings_related_BLL($args);
        }

        public function get_load_likes_list($args) {
            // return 'Entro a shop_model --> get_load_likes_list'; 
            return $this -> bll -> get_load_likes_list_BLL($args);
        }
    }
?>