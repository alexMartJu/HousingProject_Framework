<?php
    class controller_home {
        function view() {
            // echo 'Entro al controller_home --> view';
            common::load_view('top_page_home.html', VIEW_PATH_HOME . 'home.html');
        }

        function Carrousel_Automation() {
            // echo 'Entro al controller_home --> Carrousel_Automation';
            echo json_encode(common::load_model('home_model', 'get_Carrousel_Automation'));
        }

        function Carrousel_Type() {
            // echo 'Entro al controller_home --> Carrousel_Type';
            echo json_encode(common::load_model('home_model', 'get_Carrousel_Type'));
        }
        
        function homePageCategory() {
            // echo 'Entro al controller_home --> homePageCategory';
            echo json_encode(common::load_model('home_model', 'get_homePageCategory'));
        }

        function homePageOperation() {
            // echo 'Entro al controller_home --> homePageOperation';
            echo json_encode(common::load_model('home_model', 'get_homePageOperation'));
        }

        function homePageCity() {
            // echo 'Entro al controller_home --> homePageCity';
            echo json_encode(common::load_model('home_model', 'get_homePageCity'));
        }

        function homePageRecommendations() {
            // echo 'Entro al controller_home --> homePageRecommendations';
            echo json_encode(common::load_model('home_model', 'get_homePageRecommendations'));
        }

        function homePageMostVisited() {
            // echo 'Entro al controller_home --> homePageMostVisited';
            echo json_encode(common::load_model('home_model', 'get_homePageMostVisited'));
        }
    }
?>