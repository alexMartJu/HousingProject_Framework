<?php
    class common {
        public static function load_error() {
            // require_once (VIEW_PATH_INC . 'top_page.html');
            require_once (VIEW_PATH_INC . 'top_page_home.html');
            require_once (VIEW_PATH_INC . 'header.html');
            // require_once (VIEW_PATH_INC . 'error404.html');
            require_once (VIEW_PATH_INC . 'error404.php');
            require_once (VIEW_PATH_INC . 'footer.html');
            require_once (VIEW_PATH_INC . 'bottom_page.html');
        }
        
        public static function load_view($topPage, $view) {
            $topPage = VIEW_PATH_INC . $topPage;
            if ((file_exists($topPage)) && (file_exists($view))) {
                require_once ($topPage);
                // require_once ('C:/xampp/htdocs/Ejercicios/Framework_PHP_OO_MVC/view/inc/header.html');
                require_once (VIEW_PATH_INC . 'header.html');
                require_once ($view);
                require_once (VIEW_PATH_INC . 'footer.html');
                require_once (VIEW_PATH_INC . 'bottom_page.html');
            }else {
                self::load_error();
            }
        }
        
        public static function load_model($model, $function = null, $args = null) {
            $dir = explode('_', $model);
            $path = constant('MODEL_' . strtoupper($dir[0])) .  $model . '.class.singleton.php';
            if (file_exists($path)) {
                require_once ($path);
                if (method_exists($model, $function)) {
                    $obj = $model::getInstance();
                    if ($args != null) {
                        return call_user_func(array($obj, $function), $args);
                    }
                    return call_user_func(array($obj, $function));
                }
            }
            throw new Exception();
        }

        public static function generate_token_secure($longitud){
            if ($longitud < 4) {
                $longitud = 4;
            }
            return bin2hex(openssl_random_pseudo_bytes(($longitud - ($longitud % 2)) / 2));
        }

        function friendlyURL_php($url) {
            $link = "";
            if (URL_FRIENDLY) {
                $url = explode("&", str_replace("?", "", $url));
                foreach ($url as $key => $value) {
                    $aux = explode("=", $value);
                    $link .=  $aux[1]."/";
                }
            } else {
                $link = "index.php?" . $url;
            }
            return SITE_PATH . $link;
        }
    }
?>