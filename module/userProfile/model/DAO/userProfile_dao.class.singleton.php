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

        public function checkUserProfile($db, $username) {
            $sql = "SELECT id_profile FROM user_profile WHERE id_user = (SELECT id_user FROM users WHERE username = '$username')";
            $stmt = $db->ejecutar($sql);
            $result = $db->listar($stmt);
            return !empty($result); // Devuelve true si hay al menos un perfil para el usuario, false si no hay ninguno
        }
        
        public function insertUserProfile($db, $username, $firstName, $lastName, $dob, $address, $interests) {
            $sql = "INSERT INTO user_profile (id_user, first_name, last_name, dob, address, interests)
                    VALUES ((SELECT id_user FROM users WHERE username = '$username'), '$firstName', '$lastName', '$dob', '$address', '$interests')";
            return $db->ejecutar($sql);
        }
        
        public function updateUserProfile($db, $username, $firstName, $lastName, $dob, $address, $interests) {
            $sql = "UPDATE user_profile
                    SET first_name = '$firstName', last_name = '$lastName', dob = '$dob', address = '$address', interests = '$interests'
                    WHERE id_user = (SELECT id_user FROM users WHERE username = '$username')";
            return $db->ejecutar($sql);
        }

        public function getLikesDataByUsername($db, $username) {
            $sql = "SELECT likes.id_likes, housings.*, city.name_city, h_type.name_type
            FROM likes
            INNER JOIN housings ON likes.id_housing = housings.id_housing
            INNER JOIN users ON likes.id_user = users.id_user
            INNER JOIN city ON housings.id_city = city.id_city
            INNER JOIN h_type ON housings.id_type = h_type.id_type
            WHERE users.username = '$username';";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function getInvoicesDataByUsername($db, $username) {
            $sql = "SELECT purchase_id, total_price, purchase_date
            FROM purchases
            WHERE id_user = (
                SELECT id_user
                FROM users
                WHERE username = '$username');";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function getLoginTypeByUsername($db, $username) {
            $sql = "SELECT login_type
            FROM users
            WHERE username = '$username';";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function updateAvatar($db, $username, $fileName) {
            $sql = "UPDATE users 
            SET avatar = '$fileName'  
            WHERE username = '$username'";
            return $db->ejecutar($sql);
        }
    }
?>