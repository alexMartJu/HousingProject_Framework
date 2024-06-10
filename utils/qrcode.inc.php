<?php

        
class qrcodegenerate
{
    public static function do_qrcode($purchaseId)
    {
        require_once ('phpqrcode/qrlib.php');
        // $url = STORE_DOMPDF . 'factura'

        $url = STORE_DOMPDF . 'factura_' . $purchaseId . '.pdf';

        $content = $url;

        $filename =  STORE_QRCODE . 'qr_' . $purchaseId. '.png';

        // Error correction level ('L' = 7%, 'M' = 15%, 'Q' = 25%, 'H' = 30%)
        $errorCorrectionLevel = 'M';

        // Matrix point size (1 - 10)
        $matrixPointSize = 8;

        // Margin (default is 4)
        $margin = 2;

        // Generate QR code and save to file with custom options
        QRcode::png($content, $filename, $errorCorrectionLevel, $matrixPointSize, $margin);

        return "qrcode_done";

    }
}


