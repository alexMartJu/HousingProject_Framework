<?php
    class userProfile_dao {
        static $_instance;

        private function __construct() {
        }

        public static function getInstance() {
            // return 'Entro a userProfile_dao_dao --> getInstance';
            if(!(self::$_instance instanceof self)){
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function select_data_user($db, $username){
            $sql = "SELECT u.id_user, u.username, u.email, u.avatar,
            COALESCE(l.likes_count, 0) AS likes_count, 
            COALESCE(p.purchases_count, 0) AS purchases_count 
            FROM users u 
            LEFT JOIN (SELECT id_user, COUNT(*) AS likes_count FROM likes GROUP BY id_user) l ON u.id_user = l.id_user 
            LEFT JOIN (SELECT id_user, COUNT(*) AS purchases_count FROM purchases GROUP BY id_user) p ON u.id_user = p.id_user
            WHERE u.username = '$username';";

            $stmt = $db->ejecutar($sql);
            return $db->listar_object($stmt);
        }
    }
?>