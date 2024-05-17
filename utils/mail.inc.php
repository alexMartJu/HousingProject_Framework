<?php
    // Include Composer autoload file to load Resend SDK classes...
    require __DIR__ . '/vendor/autoload.php';
    
    class mail {
        public static function send_email($email) {
            switch ($email['type']) {
                case 'validate';
                    $email['fromEmail'] = 'onboarding@resend.dev';
                    $email['inputEmail'] = 'onboarding@resend.dev';
                    $email['inputMatter'] = 'Housing Project - Email verification';
                    $email['inputMessage'] = "<h2>Email verification.</h2><a href='http://localhost/Framework/HousingProject_Framework/login/verify/$email[token]'>Click here for verify your email.</a>";
                    break;
                case 'recover';
                    $email['fromEmail'] = 'onboarding@resend.dev';
                    $email['inputEmail'] = 'onboarding@resend.dev';
                    $email['inputMatter'] = 'Housing Project - Recover password';
                    $email['inputMessage'] = "<a href='http://localhost/Framework/HousingProject_Framework/login/recover/$email[token]'>Click here for recover your password.</a>";
                    break;
            }
            return self::send_resend($email);
        }

        public static function send_resend($values){
            $resend = parse_ini_file(UTILS . "resend.ini");
            $api_key = $resend['api_key'];

            // Assign a new Resend Client instance to $resend variable, which is automatically autoloaded...
            $resend = Resend::client($api_key);

            try {
                $result = $resend->emails->send([
                    'from' => $values['fromEmail'],
                    'to' => ['alex.mart.juan@gmail.com'],
                    'subject' => $values['inputMatter'],
                    'html' => $values['inputMessage'],
                ]);
            } catch (\Exception $e) {
                exit('Error: ' . $e->getMessage());
            }

            // Show the response of the sent email to be saved in a log...
            return $result->toJson();
        }
    }