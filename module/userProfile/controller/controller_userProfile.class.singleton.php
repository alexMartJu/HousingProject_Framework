<?php
    class controller_userProfile {
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
            // echo 'Entro al controller_profile --> view';
            common::load_view('top_page_userProfile.html', VIEW_PATH_USERPROFILE . 'userProfile_info.html');
        }

        function paint_userProfile_data() {
            // echo 'Entro al controller_profile --> paint_userProfile_data';
            echo json_encode(common::load_model('userProfile_model', 'get_paint_userProfile_data', $_POST['access_token']));
        }

        function change_personalInfo() {
            // echo 'Entro al controller_profile --> change_personalInfo';
            echo json_encode(common::load_model('userProfile_model', 'get_change_personalInfo', [$_POST['access_token'], $_POST['firstName'], $_POST['lastName'], $_POST['dob'], $_POST['address'], $_POST['interests']]));
        }

    }
?>