<?php

class dompdf
{
    public static function do_pdf($purchaseDetails, $purchaseLines)
    {
        require_once ('vendor/autoload.php');

        // Datos de la factura
        $factura = array(
            'numero' => $purchaseDetails[0]['purchase_id'],
            'fecha' => $purchaseDetails[0]['purchase_date'],
            'cliente' => $purchaseDetails[0]['username'],
            'productos' => array(),
            'total' => $purchaseDetails[0]['total_price']
        );

        foreach ($purchaseLines as $line) {
            $factura['productos'][] = array(
                'nombre' => $line['name_product'],
                'tipo_ciudad' => $line['name_type'] . ' in ' . $line['name_city'],
                'cantidad' => $line['quantity'],
                'precio' => $line['price_product']
            );
        }

        // Generar el HTML dinámico de la factura
        $html = '<!DOCTYPE html>
                <html lang="es">
                <head>
                    <meta charset="UTF-8">
                    <title>Invoice</title>
                    <style>
                        .no-background {
                            border: none !important;
                        }

                        .invoice-row td:first-child {
                            background-color: #1bb336;
                        }

                        h2 {
                            text-align:center;
                        }

                        .invoice-head {
                            border-collapse: collapse;
                        }

                        .invoice-head th, .invoice-head td {
                            border: 1px solid #000;
                        }

                        .invoice-head td {
                            padding: 8px;
                            text-align: right;
                        }

                        /* Estilo para la dirección */
                        .address {
                            font-style: italic;
                        }

                        /* Estilo para el título */
                        .title {
                            font-size: 24px;
                            font-weight: bold;
                        }

                        /* Estilo para la tabla de productos */
                        .table {
                            width: 100%;
                            border-collapse: collapse;
                        }

                        .table th, .table td {
                            border: 1px solid #000;
                            padding: 8px;
                        }

                        .table th {
                            background-color: #1bb336;
                            font-weight: bold;
                        }

                        /* Estilo para el total */
                        .total-row {
                            background-color: #f2f2f2;
                            font-weight: bold;
                        }

                        /* Estilo para el agradecimiento */
                        .invoice-thank {
                            margin-top: 30px;
                            text-align: center;
                            font-style: italic;
                        }

                        /* Estilo general */
                        body {
                            font-family: Arial, sans-serif;
                            font-size: 12px;
                            line-height: 1.5;
                            margin: 0;
                            padding: 0;
                        }

                        .container {
                            width: 80%;
                            margin: 0 auto;
                            padding-top: 30px;
                        }

                        .logo {
                            font-size: 28px;
                            margin: 0;
                            padding: 0;
                            line-height: 1;
                            font-weight: 700;
                            letter-spacing: 0.5px;
                            text-transform: uppercase;
                        }

                        .logo a {
                            color: #111;
                        }

                        .logo span {
                            color: #1bbd36;
                        }

                        .logo img {
                            max-height: 40px;
                        }

                        .row {
                            margin-bottom: 20px;
                        }

                        .well {
                            background-color: #f9f9f9;
                            border: 1px solid #ccc;
                            padding: 10px;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="row">
                            <div class="span4">
                                <h1 class="logo me-auto"><span>hsng</span>project</h1><br>
                                <address>
                                    <strong>Housing Project SL.</strong><br>
                                    35, Aielo<br>
                                    Gold Avenue, Gold (Spain)
                                </address>
                            </div>
                            <div class="span4 well">
                                <table class="invoice-head">
                                    <tbody>
                                        <tr class="invoice-row">
                                            <td class="pull-right"><strong>Customer #</strong></td>
                                            <td>' . $factura['cliente'] . '</td>
                                        </tr>
                                        <tr class="invoice-row">
                                            <td class="pull-right"><strong>Invoice #</strong></td>
                                            <td>' . $factura['numero'] . '</td>
                                        </tr>
                                        <tr class="invoice-row">
                                            <td class="pull-right"><strong>Date</strong></td>
                                            <td>' . $factura['fecha'] . '</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="row">
                            <div class="span8">
                                <h2>Invoice</h2>
                            </div>
                        </div>
                        <div class="row">
                            <div class="span8 well invoice-body">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Housing</th>
                                            <th>Product</th>
                                            <th>Quantity</th>
                                            <th>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>';

        foreach ($factura['productos'] as $producto) {
            $precio_con_formato = number_format($producto['precio'], 2) . '€';
            $html .= '<tr>
                        <td>' . $producto['tipo_ciudad'] . '</td>
                        <td>' . $producto['nombre'] . '</td>
                        <td>' . $producto['cantidad'] . '</td>
                        <td>' . $precio_con_formato . '</td>
                    </tr>';
        }

        $impuestos = $factura['total'] * 0.21;

        // Actualizar el total para incluir los impuestos
        $total_con_impuestos = $factura['total'] + $impuestos;

        $html .= '<tr>
                    <td class="no-background" colspan="4"></td>
                </tr>
                <tr>
                    <td class="no-background" colspan="1"></td>
                    <td class="no-background" colspan="1"></td>
                    <td>Impuestos (21% IVA)</td>
                    <td>' . number_format($impuestos, 2) . '€</td>
                </tr>
                <tr>
                    <td class="no-background" colspan="1"></td>
                    <td class="no-background" colspan="1">&nbsp;</td>
                    <td><strong>Total</strong></td>
                    <td><strong>' . number_format($total_con_impuestos, 2) . '€</strong></td>
                </tr>
                </tbody>
                </table>
                </div>
                </div>
                <div class="row">
                    <div class="span8 well invoice-thank">
                    <h5 style="text-align:center;">Thank You!</h5>
                    </div>
                </div>
                </div>
                </body>
                </html>';

        $options = new Dompdf\Options();
        $options->set('defaultFont', 'sans-serif');
        $dompdf = new Dompdf\Dompdf($options);

        // Cargar el HTML en DOMPDF
        $dompdf->loadHtml($html);
        $dompdf->setPaper('A4', 'portrait');

        // Renderizar el PDF
        $dompdf->render();

        $pdf_content = $dompdf -> output();

        if($pdf_content){
            $file = STORE_DOMPDF . 'factura_' . $factura['numero'] . '.pdf';
            file_put_contents($file, $pdf_content);
            return "pdf_done";
        } else {
            return "error_pdf";
        }

    }
}