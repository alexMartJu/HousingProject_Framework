<?php
    class login_dao {
        static $_instance;

        private function __construct() {
        }

        public static function getInstance() {
            // return 'Entro a login_dao --> getInstance';
            if(!(self::$_instance instanceof self)){
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function select_email() {
            return 'Entro a login_dao --> select_email';
        }

        public function select_username() {
            return 'Entro a login_dao --> select_username';
        }

        public function insert_user() {
            return 'Entro a login_dao --> insert_user';
        }

        public function select_verify_email() {
            return 'Entro a login_dao --> select_verify_email';
        }

        public function update_verify_email() {
            return 'Entro a login_dao --> update_verify_email';
        }
    }
?>