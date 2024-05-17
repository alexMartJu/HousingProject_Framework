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

        public function insert_user($db, $username_reg, $email_reg, $password1_reg, $hashed_pass, $avatar, $token_email) {
            // return 'Entro a login_dao --> insert_user';

            $sql = "INSERT INTO `users`(`username`, `password`, `email`, `type_user`, `avatar`, `token_email`, `activate`) 
            VALUES ('$username_reg','$hashed_pass','$email_reg','client','$avatar','$token_email',0)";

            return $stmt = $db->ejecutar($sql);
        }

        public function select_verify_email($db, $token_email) {
            // return 'Entro a login_dao --> select_verify_email';
            $sql = "SELECT token_email FROM users WHERE token_email = '$token_email'";

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function update_verify_email($db, $token_email) {
            // return 'Entro a login_dao --> update_verify_email';

            $sql = "UPDATE users SET activate = 1, token_email= '' WHERE token_email = '$token_email'";

            return $stmt = $db->ejecutar($sql);
        }
    }
?>