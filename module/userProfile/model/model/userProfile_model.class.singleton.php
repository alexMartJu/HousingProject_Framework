<?php
    class userProfile_model {

        private $bll;
        static $_instance;
        
        function __construct() {
            $this -> bll = userProfile_bll::getInstance();
        }

        public static function getInstance() {
            // return 'Entro a userProfile_model --> getInstance';
            if (!(self::$_instance instanceof self)) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function get_paint_userProfile_data($args) {
            // return 'Entro a userProfile_model --> get_add_update_Cart'; 
            return $this -> bll -> get_paint_userProfile_data_BLL($args);
        }

        public function get_change_personalInfo($args) {
            // return 'Entro a userProfile_model --> get_change_personalInfo'; 
            return $this -> bll -> get_change_personalInfo_BLL($args);
        }

        public function get_list_likes_user($args) {
            // return 'Entro a userProfile_model --> get_list_likes_user'; 
            return $this -> bll -> get_list_likes_user_BLL($args);
        }

        public function get_list_invoices_user($args) {
            // return 'Entro a userProfile_model --> get_list_invoices_user'; 
            return $this -> bll -> get_list_invoices_user_BLL($args);
        }

        public function get_upload_file_user($args) {
            // return 'Entro a userProfile_model --> get_upload_file_user'; 
            return $this->bll->get_upload_file_user_BLL($args);
        }

    }
?>