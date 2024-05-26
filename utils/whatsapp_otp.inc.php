<?php
    require_once ('vendor/autoload.php'); // if you use Composer
    
    class whatsapp_otp {
        public static function send_otp($whatsapp) {
            switch ($whatsapp['type']) {
                case 'attempts_more_3':
                    $whatsapp['body'] = 'Tu código OTP es: ' . $whatsapp['token_otp'];
                    break;
            }
            return self::send_whatsapp_otp($whatsapp);
        }

        public static function send_whatsapp_otp($values){
            $config_otp = parse_ini_file('whatsapp_otp.ini');
            $phone_number=$config_otp['phone_number'];
            $token=$config_otp['token'];
            $instance=$config_otp['instance'];

            $ultramsg_token=$token; // Ultramsg.com token
            $instance_id=$instance; // Ultramsg.com instance id
            $client = new UltraMsg\WhatsAppApi($ultramsg_token,$instance_id);

            $to=$phone_number; 
            $body=$values['body']; 
            $api=$client->sendChatMessage($to,$body);

            $api_response = json_decode(json_encode($api), true);

            // Registrar la respuesta completa para depuración
            error_log("Respuesta completa de UltraMsg: " . json_encode($api_response));

            // Determinar el estado basado en las claves disponibles
            if (isset($api_response['sent']) && $api_response['sent'] === "true" && isset($api_response['message']) && $api_response['message'] === "ok") {
                $api_response['status'] = 'success';
            } else {
                $api_response['status'] = 'error';
                if (!isset($api_response['message'])) {
                    $api_response['message'] = 'Unexpected error';
                }
            }

            return $api_response;
        }
    }