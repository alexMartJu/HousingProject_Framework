<?php
    class controller_home {
        function view() {
            // echo 'Entro al controller_home --> view';
            common::load_view('top_page_home.html', VIEW_PATH_HOME . 'home.html');
        }
    }
?>