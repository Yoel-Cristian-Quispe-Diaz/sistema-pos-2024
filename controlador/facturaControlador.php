<?php

$ruta = parse_url($_SERVER["REQUEST_URI"]);

if (isset($ruta["query"])) {

    if (
        $ruta["query"] == "ctrRegFactura" ||
        $ruta["query"] == "ctrEditFactura" ||
        $ruta["query"] == "ctrEliFactura"
    ) {
        $metodo = $ruta["query"];
        $Factura = new ControladorFactura();
        $Factura->$metodo();
    }
}

class ControladorFactura
{
    static public function ctrInfoFacturas()
    {
        $respuesta = ModeloFactura::mdlInfoFacturas();
        return $respuesta;
    }


    static public function ctrRegFactura()
    {
        require "../modelo/facturaModelo.php";

        // id_factura	razon_social_factura	nit_ci_factura	direccion_factura	nombre_factura	telefono_factura	email_factura
        //creamos el array de datos
        $data = array("razon_social_factura" => $_POST["razon_social"], "nit_ci_factura" => $_POST["nit_ci"], "direccion_factura" => $_POST["direccion"], "nombre_factura" => $_POST["nombre"], "telefono_factura" => $_POST["telefono"], "email_factura" => $_POST["email"]);
        var_dump($data);
        $respuesta = ModeloFactura::mdlRegFactura($data);

        echo $respuesta;
    }

    static public function ctrInfoFactura($id)
    {
        $respuesta = ModeloFactura::mdlInfoFactura($id);
        return $respuesta;
    }






    static function ctrEditFactura()
    {
        require "../modelo/facturaModelo.php";

        $data = array("razon_social_factura" => $_POST["razon_social"], "nit_ci_factura" => $_POST["nit_ci"], "direccion_factura" => $_POST["direccion"], "nombre_factura" => $_POST["nombre"], "telefono_factura" => $_POST["telefono"], "email_factura" => $_POST["email"] , "id_factura" => $_POST["id"]);

        $respuesta= ModeloFactura::mdlEditFactura($data);
        echo $respuesta;
    }



    static function ctrEliFactura()
    {
        require "../modelo/facturaModelo.php";
        $id = $_POST["id"];

        $respuesta = ModeloFactura::mdlEliFactura($id);
        echo $respuesta;
    }
}//final