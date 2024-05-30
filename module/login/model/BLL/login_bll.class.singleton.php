<?php
	class login_bll {
		private $dao;
		private $db;
		static $_instance;

		function __construct() {
            $this -> dao = login_dao::getInstance();
            $this -> db = db::getInstance();
		}

		public static function getInstance() {
            // return 'Entro a login_bll --> getInstance';
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}

		public function get_register_BLL($args) {

            $hashed_pass = password_hash($args[2], PASSWORD_DEFAULT, ['cost' => 12]);
            $hashavatar = md5(strtolower(trim($args[1]))); 
            $avatar = "https://i.pravatar.cc/500?u=$hashavatar";

            // Comprobar si el email ya existe
            try {
                $check_email = $this -> dao ->select_email($this -> db, $args[1]);
            } catch (Exception $e) {
                return "error";
            }
        
            // Comprobar si el nombre de usuario ya existe
            try {
                $check_username = $this -> dao ->select_username($this -> db, $args[0]);
            } catch (Exception $e) {
                return "error";
            }
        
            // Si el email existe, devuelve error_email
            if ($check_email) {
                return "error_email";
            }
        
            // Si el nombre de usuario existe, devuelve error_username
            if ($check_username) {
                return "error_username";
            }
        
            // Insertar el nuevo usuario
            try {
                $rdo = $this -> dao ->insert_user($this -> db, $args[0], $args[1], $args[2], $hashed_pass, $avatar);
            } catch (Exception $e) {
                return "error";
            }
        
            // Si no se pudo insertar el usuario, devuelve error_user
            if (!$rdo) {
                return "error_user";
            }
            $token_email=middleware::create_email_token_register($args[0]);
            $message = [ 'type' => 'validate', 
								'token' => $token_email, 
								'toEmail' =>  $args[0]];
			$email = json_decode(mail::send_email($message), true);
            // Si se insertó el usuario correctamente, devuelve ok
            return "ok";	   
		}

        public function get_verify_email_BLL($args) {
            $dec_email_token = middleware::decode_email_token_register($args);
            $username_dec = $dec_email_token['username'];
            if($dec_email_token['exp'] > time()) {
                if($this -> dao -> select_verify_email($this -> db, $username_dec)){
                    $this -> dao -> update_verify_email($this -> db, $username_dec);
                    return 'verify';
                } else {
                    return 'fail';
                }
            } else {
                $token_email=middleware::create_email_token_register($username_dec);
                $message = [ 'type' => 'validate', 
								'token' => $token_email, 
								'toEmail' =>  $args[0]];
			    $email = json_decode(mail::send_email($message), true);
                return 'fail';
            }
		}

        public function get_login_BLL($args) {
            // return 'Entro a login_bll --> get_login_BLL';
			try {
                // Obtener el usuario de la base de datos
                $rdo = $this -> dao ->select_user_nosocial($this -> db, $args[0]);
            
                // Verificar si el usuario no existe
                if (empty($rdo)) {
                    return "error_user";
                } else {
                    // Verificar la contraseña
                    if (password_verify($args[1], $rdo[0]['password'])) {
                        // Verificar si el usuario está activado
                        if ($rdo[0]['activate'] == 1) {
                            // Crear los tokens de acceso y actualización
                            $access_token = middleware::create_access_token($rdo[0]["username"]);
                            $refresh_token = middleware::create_refresh_token($rdo[0]["username"]);
                            // Almacenar los tokens en un array
                            $token['access_token'] = $access_token;
                            $token['refresh_token'] = $refresh_token;
                            // Guardar el usuario y el tiempo en la sesión
                            $_SESSION['username'] = $rdo[0]['username'];
                            $_SESSION['tiempo'] = time();
                            session_regenerate_id(); // Regenerar el ID de la sesión por seguridad

                            // Restablecer los intentos fallidos
                            $this -> dao -> reset_attempts($this -> db, $rdo[0]['username']);
                            // Retornar los tokens en formato JSON
                            return $token;
                        } else if ($rdo[0]['activate'] == 0) {
                            // El usuario no está activado
                            return "activate_error";
                        }
                    } else {
                        $this -> dao ->increment_attempts($this -> db, $rdo[0]['username']);
                        $attempts = $this -> dao ->get_attempts($this -> db, $rdo[0]['username']);
                        $attempt=$attempts[0]['attempts'];
                        if ($attempt >= 3) {
                            // Generar y enviar código OTP por UltraMsg
                            $token_otp = common::generate_token_secure(6); // Genera un OTP de 6 caracteres
                            $message = [
                                'type' => 'attempts_more_3', 
                                'token_otp' => $token_otp
                            ];
                            $whatsapp_otp = whatsapp_otp::send_otp($message); // Enviar OTP
                            // Manejar la respuesta de la API
                            if (isset($whatsapp_otp['status']) && $whatsapp_otp['status'] == "success") {
                                // Guardar el OTP y la marca de tiempo en la base de datos
                                $this -> dao ->store_otp($this -> db, $rdo[0]['username'], $token_otp);
                                
                                return "otp_sent";
                            } else {
                                return "otp_error";
                            }
                        } else {
                            // La contraseña no es correcta
                            return "error_passwd";
                        }
                    }
                }
            } catch (Exception $e) {
                // Captura cualquier excepción y retorna un error genérico
                return "error";
            }
            
		}

        public function get_send_recover_email_BBL($args) {
			$user = $this -> dao -> select_email_recover_password($this->db, $args);
			$token = middleware::create_email_token_recover($user[0]["username"]);

			if (!empty($user)) {
				$this -> dao -> update_email_recover_password($this->db, $args);
                $message = ['type' => 'recover', 
                            'token' => $token, 
                            'toEmail' => $args];
                $email = json_decode(mail::send_email($message), true);
                return 'done';
            }else{
                return 'error';
            }
		}


        public function get_verify_token_BLL($args) {
            $dec_recover_token = middleware::decode_email_token_recover($args);
            $username_dec = $dec_recover_token['username'];
            if($dec_recover_token['exp'] > time()) {
                if($this -> dao -> select_verify_email($this->db, $username_dec)){
                    return 'verify';
                }
                return 'fail';
            } else {
                $token=middleware::create_email_token_recover($username_dec);
                $message = ['type' => 'recover', 
                            'token' => $token, 
                            'toEmail' => $args];
                $email = json_decode(mail::send_email($message), true);
                return 'fail';
            }
		}

        public function get_new_password_BLL($args) {
			$hashed_pass = password_hash($args[1], PASSWORD_DEFAULT, ['cost' => 12]);
            $dec_recover_token = middleware::decode_email_token_recover($args[0]);
            $username_dec = $dec_recover_token['username'];
			if($this -> dao -> update_new_passwoord($this->db, $username_dec, $hashed_pass)){
				return 'done';
			}
			return 'fail';
		}

        public function get_logout_BLL() {
            // return 'Entro a login_bll --> get_logout_BLL';
			unset($_SESSION['username']);
            unset($_SESSION['tiempo']);
            session_destroy();

            return 'Done';
		}

        public function get_data_user_BLL($args) {
            // return 'Entro a login_bll --> get_data_user_BLL';
			$json = middleware::decode_access_token($args);
            $rdo = $this -> dao -> select_data_user($this->db, $json['username']);
            return $rdo;
		}

        public function get_actividad_BLL() {
            // return 'Entro a login_bll --> get_actividad_BLL';
			if (!isset($_SESSION["tiempo"])) {
                return "inactivo";
            } else {
                if ((time() - $_SESSION["tiempo"]) >= 1800) { //1800s=30min
                    return "inactivo";
                } else {
                    return "activo";
                }
            }
		}

        public function get_controluser_BLL($args) {
            // return 'Entro a login_bll --> get_controluser_BLL';
			$dec_access_token = middleware::decode_access_token($args[0]);
            $dec_refresh_token = middleware::decode_refresh_token($args[1]);

            if ($dec_access_token['exp'] < time() && $dec_refresh_token['exp'] > time()) { 
                //Verificamos si el token de acceso ha expirado, pero el token de actualización aún es válido. Si esta condición es verdadera, se genera un nuevo token de acceso y se comprueba si coincide con la sesión actual. 
                $new_access_token = middleware::create_access_token($dec_access_token['username']);
                $new_dec_access_token = middleware::decode_access_token($new_access_token);
                if (isset($_SESSION['username']) && ($_SESSION['username']) == $new_dec_access_token['username'] && ($_SESSION['username']) == $dec_refresh_token['username']) {
                    return $new_access_token;
                } else {
                    return "Wrong_User";
                }
            } else if (($dec_access_token['exp'] > time()) && ($dec_refresh_token['exp'] < time())) {
                // Verificamos si el token de acceso sigue siendo válido, pero el token de actualización ha expirado.
                return "Token_ExpirationTime";
            } else if (($dec_access_token['exp'] < time()) && ($dec_refresh_token['exp'] < time())) {
                // Verificamos si tanto el token de acceso como el de actualización han expirado
                return "Token_ExpirationTime";
            } else if (isset($_SESSION['username']) && ($_SESSION['username']) == $dec_access_token['username'] && ($_SESSION['username']) == $dec_refresh_token['username']){
                // Verificamos si el usuario está autenticado en la sesión y si el nombre de usuario en los tokens de acceso y de actualización coincide con el nombre de usuario de la sesión.
                return "Correct_User";
            } else {
                return "Wrong_User";
            }
		}

        public function get_refresh_cookie_BLL() {
            // return 'Entro a login_bll --> get_refresh_cookie_BLL';
			session_regenerate_id();
            return "Done";
		}

        public function get_intro_Otp_BLL($args) {
            try {
                // Obtener el OTP almacenado y la marca de tiempo
                $result = $this->dao->select_otp($this->db, $args[0]);
        
                if ($result) {
                    $stored_otp = $result[0]['otp_code'];
                    $timestamp = $result[0]['otp_timestamp'];
        
                    // Verificar si el OTP ingresado coincide
                    if ($stored_otp == $args[1]) {
                        // Verificar si el OTP no ha expirado (5 minutos de validez)
                        if ((time() - strtotime($timestamp)) <= 300) {
                            $this->dao->update_activate_attempts_otp($this->db, $args[0]);
                            // OTP válido
                            return "otp_valid";
                        } else { //otp expirado, volvemos a enviar otro
                            $token_otp = common::generate_token_secure(6);
                            $message = [
                                'type' => 'attempts_more_3', 
                                'token_otp' => $token_otp
                            ];
                            $whatsapp_otp = whatsapp_otp::send_otp($message);
                            if (isset($whatsapp_otp['status']) && $whatsapp_otp['status'] == "success") {
                                $this -> dao ->store_otp($this -> db, $args[0], $token_otp);
                                // OTP expirado
                                return "otp_expired";
                            } else {
                                return "otp_error";
                            }
                        }
                    } else {
                        // OTP inválido
                        return "otp_invalid";
                    }
                } else {
                    return "user_not_found";
                }
            } catch (Exception $e) {
                // Captura cualquier excepción y retorna un error genérico
                return "error";
            }
        }

        public function get_social_login_BLL($args) {
            if (!empty($this -> dao -> select_user($this->db, $args[1]))) {
                error_log("Entro aqui");
                $user = $this -> dao -> select_user($this->db, $args[1]);
                $access_token = middleware::create_access_token($user[0]['username']);
                $refresh_token = middleware::create_refresh_token($user[0]['username']);
                // Almacenar los tokens en un array
                $token['access_token'] = $access_token;
                $token['refresh_token'] = $refresh_token;
                // Guardar el usuario y el tiempo en la sesión
                $_SESSION['username'] = $user[0]['username'];
                $_SESSION['tiempo'] = time();
                session_regenerate_id();
                // return json_encode($jwt);
                return $token;
            } else {
                error_log("Entro aqui2");
                 // Derivar el proveedor social del nombre de usuario
                if (strpos($args[1], '_google') !== false) {
                    $login_type = 'social_google';
                    error_log("Entro aqui2, $login_type");
                } elseif (strpos($args[1], '_github') !== false) {
                    $login_type = 'social_github';
                    error_log("Entro aqui2, $login_type");
                }
        
                $this -> dao -> insert_social_login($this->db, $args[1], $args[2], $args[3], $login_type);
                $user = $this -> dao -> select_user($this->db, $args[1]);
                $access_token = middleware::create_access_token($user[0]['username']);
                $refresh_token = middleware::create_refresh_token($user[0]['username']);
                // Almacenar los tokens en un array
                $token['access_token'] = $access_token;
                $token['refresh_token'] = $refresh_token;
                // Guardar el usuario y el tiempo en la sesión
                $_SESSION['username'] = $user[0]['username'];
                $_SESSION['tiempo'] = time();
                session_regenerate_id();
                // return json_encode($jwt);
                return $token;
            }
        }
	}
?>