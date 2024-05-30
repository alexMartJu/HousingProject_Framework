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

        public function select_email($db, $email_reg) {
            // return 'Entro a login_dao --> select_email';
            $sql = "SELECT email FROM users WHERE email='$email_reg'";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar_object($stmt);
        }

        public function select_username($db, $username_reg) {
            // return 'Entro a login_dao --> select_username';
            $sql = "SELECT username FROM users WHERE username='$username_reg'";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar_object($stmt);
        }

        public function insert_user($db, $username_reg, $email_reg, $password1_reg, $hashed_pass, $avatar) {
            // return 'Entro a login_dao --> insert_user';

            $sql = "INSERT INTO `users`(`username`, `password`, `email`, `type_user`, `avatar`, `activate`, `attempts_password`, `otp_code`, `otp_timestamp`, `login_type`) 
            VALUES ('$username_reg','$hashed_pass','$email_reg','client','$avatar',0,0,NULL,NULL,'Local')";

            return $stmt = $db->ejecutar($sql);
        }

        public function select_verify_email($db, $username_dec) {
            // return 'Entro a login_dao --> select_verify_email';
            $sql = "SELECT username FROM users WHERE username = '$username_dec'";

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function update_verify_email($db, $username_dec) {
            // return 'Entro a login_dao --> update_verify_email';

            $sql = "UPDATE users SET activate = 1 WHERE username = '$username_dec'";

            return $stmt = $db->ejecutar($sql);
        }

        public function select_user($db, $username_log) {
            // return 'Entro a login_dao --> update_verify_email';

            $sql = "SELECT `username`, `password`, `email`, `type_user`, `avatar`, `activate` FROM `users` WHERE username='$username_log'";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function select_email_recover_password($db, $email_forg, $username_forg){
			$sql = "SELECT `email`, `username`
            FROM `users` 
            WHERE email = '$email_forg' AND password NOT LIKE ('') AND username= '$username_forg' AND login_type='Local'";

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function update_email_recover_password($db, $email_forg, $username_forg){
			$sql = "UPDATE `users` 
            SET `activate` = 0 
            WHERE `email` = '$email_forg' AND username='$username_forg'";

            return $stmt = $db->ejecutar($sql);
        }

        public function update_new_passwoord($db, $username_dec, $password){
            $sql = "UPDATE `users` 
            SET `password`= '$password', `activate` = 1
            WHERE `username` = '$username_dec'";

            return $stmt = $db->ejecutar($sql);
        }

        public function select_data_user($db, $username){
            $sql = "SELECT * FROM users WHERE username='$username'";

            $stmt = $db->ejecutar($sql);
            return $db->listar_object($stmt);
        }

        public function increment_attempts($db, $username){
            $sql = "UPDATE users 
            SET attempts_password = attempts_password + 1 
            WHERE username = '$username'";

            return $stmt = $db->ejecutar($sql);
        }

        public function get_attempts($db, $username) {
            $sql = "SELECT attempts_password AS attempts
                    FROM users 
                    WHERE username = '$username'";
        
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function store_otp($db, $username, $token_otp){
            $sql = "UPDATE users 
            SET otp_code = '$token_otp', otp_timestamp = NOW(), activate = 0 
            WHERE username = '$username'";

            return $stmt = $db->ejecutar($sql);
        }

        public function reset_attempts($db, $username){
            $sql = "UPDATE users 
            SET attempts_password = 0 
            WHERE username = '$username'";

            return $stmt = $db->ejecutar($sql);
        }

        public function select_otp($db, $username){
            $sql = "SELECT otp_code, otp_timestamp 
            FROM users 
            WHERE username = '$username'";

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function update_activate_attempts_otp($db, $username){
            $sql = "UPDATE users 
            SET activate = 1,  attempts_password = 0, otp_code = NULL, otp_timestamp = NULL
            WHERE username = '$username'";

            return $stmt = $db->ejecutar($sql);
        }

        public function insert_social_login($db, $username, $email, $avatar, $login_type) {
            // return 'Entro a login_dao --> insert_social_login';
            $sql = "INSERT INTO `users`(`username`, `password`, `email`, `type_user`, `avatar`, `activate`, `attempts_password`, `otp_code`, `otp_timestamp`, `login_type`) 
            VALUES ('$username','','$email','client','$avatar',1,0,NULL,NULL,'$login_type')";

            return $stmt = $db->ejecutar($sql);
        }

        public function select_user_nosocial($db, $username_log) {
            // return 'Entro a login_dao --> update_verify_email';

            $sql = "SELECT `username`, `password`, `email`, `type_user`, `avatar`, `activate` 
            FROM `users` 
            WHERE username='$username_log' AND login_type='Local'";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }
    }
?>