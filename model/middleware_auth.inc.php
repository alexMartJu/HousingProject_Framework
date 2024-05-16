<?php
class middleware{
    public static function decode_access_token($token){
        $jwt = parse_ini_file(UTILS . "jwt.ini");
        $secret = $jwt['JWT_SECRET_ACCESS'];
    
        $JWT = new JWT;
        $token_dec = $JWT->decode($token, $secret);
        $rt_token = json_decode($token_dec, TRUE);
        return $rt_token;
    }
    
    public static function decode_refresh_token($token){
        $jwt = parse_ini_file(UTILS . "jwt.ini");
        $secret = $jwt['JWT_SECRET_REFRESH'];
    
        $JWT = new JWT;
        $token_dec = $JWT->decode($token, $secret);
        $rt_token = json_decode($token_dec, TRUE);
        return $rt_token;
    }
    
    public static function create_access_token($username){
        $jwt = parse_ini_file(UTILS . "jwt.ini");
        $header = $jwt['JWT_HEADER'];
        $secret = $jwt['JWT_SECRET_ACCESS'];
        $payload = '{"iat":"' . time() . '","exp":"' . (time() + $jwt['JWT_EXP_ACCESS']) . '","username":"' . $username . '"}';
    
        $JWT = new JWT;
        $token = $JWT->encode($header, $payload, $secret);
        return $token;
    }
    
    public static function create_refresh_token($username){
        $jwt = parse_ini_file(UTILS . "jwt.ini");
        $header = $jwt['JWT_HEADER'];
        $secret = $jwt['JWT_SECRET_REFRESH'];
        $payload = '{"iat":"' . time() . '","exp":"' . (time() + $jwt['JWT_EXP_REFRESH']) . '","username":"' . $username . '"}';
    
        $JWT = new JWT;
        $token = $JWT->encode($header, $payload, $secret);
        return $token;
    }
    
}