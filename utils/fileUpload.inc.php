<?php
class FileUpload
{
    public static function uploadFile($file)
    {
        // Directorio de carga predeterminado
        $uploadDirectory = STORE_AVATAR;

        // Tipos de archivo permitidos
        $allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

        // Tamaño máximo del archivo (en bytes)
        $maxSize = 5 * 1024 * 1024; // 5MB

        // Verificar si se ha subido un archivo
        if (!isset($file['tmp_name']) || empty($file['tmp_name'])) {
            // return "No file uploaded";
            return false;
        }

        // Verificar errores de subida
        if ($file['error'] !== UPLOAD_ERR_OK) {
            // return "Error uploading file";
            return false;
        }

        // Verificar el tipo de archivo
        $fileType = mime_content_type($file['tmp_name']);
        if (!in_array($fileType, $allowedTypes)) {
            // return "Invalid file type";
            return false;
        }

        // Verificar el tamaño del archivo
        if ($file['size'] > $maxSize) {
            // return "File size exceeds limit";
            return false;
        }

        // Generar un nombre único para el archivo
        $uniqueId = uniqid();
        $originalFileName = basename($file['name']);

        // Truncar el nombre del archivo original si es necesario
        $maxLength = 100 - strlen($uniqueId) - 1; // Restar la longitud del prefijo único y el guión bajo
        if (strlen($originalFileName) > $maxLength) {
            $originalFileName = substr($originalFileName, 0, $maxLength);
        }

        // Concatenar el prefijo único y el nombre del archivo truncado
        $fileName = $uniqueId . '_' . $originalFileName;
        error_log("filename" . $fileName);

        // Ruta completa donde se guardará el archivo
        $destination = $uploadDirectory . $fileName;

        // Mover el archivo a la ubicación final
        if (!move_uploaded_file($file['tmp_name'], $destination)) {
            // return "Error moving file to destination";
            return false;
        }

        // Devolver el nombre del archivo subido
        return 'http://localhost/Framework/HousingProject_Framework/uploads/avatar/' . $fileName;
    }
}
