<?php
    class home_dao {
        static $_instance;

        private function __construct() {
        }

        public static function getInstance() {
            // return 'Entro a home_dao --> getInstance';
            if(!(self::$_instance instanceof self)){
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function select_automation() {
            return 'Entro a home_dao --> select_automation';
        }

        public function select_type() {
            return 'Entro a home_dao --> select_type';
        }

        public function select_categories() {
            return 'Entro a home_dao --> select_categories';
        }

        public function select_operation() {
            return 'Entro a home_dao --> select_operation';
        }

        public function select_city() {
            return 'Entro a home_dao --> select_city';
        }

        public function select_recommendations() {
            return 'Entro a home_dao --> select_recommendations';
        }

        public function select_mostVisited() {
            return 'Entro a home_dao --> select_mostVisited';
        }

    }
?>