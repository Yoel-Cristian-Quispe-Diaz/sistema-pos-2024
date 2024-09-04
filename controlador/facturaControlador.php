<?php

$ruta = parse_url($_SERVER["REQUEST_URI"]);

if (isset($ruta["query"])) {

    if (

        $ruta["query"] == "ctrNumFactura" ||



        $ruta["query"] == "ctrRegFactura" ||
        $ruta["query"] == "ctrEditFactura" ||
        $ruta["query"] == "ctrNuevoCufd" ||
        $ruta["query"]=="ctrUltimoCufd" ||
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


    static function ctrEliFactura()
    {
        require "../modelo/facturaModelo.php";
        $id = $_POST["id"];

        $respuesta = ModeloFactura::mdlEliFactura($id);
        echo $respuesta;
    }

    static function ctrNumFactura()
    {
        require "../modelo/facturaModelo.php";
        $respuesta = ModeloFactura::mdlNumFactura();
        if ($respuesta[0] == null) {
            echo "1";
        }else{
            echo $respuesta[0]+1;
        }
    }
    static public function ctrNuevoCufd(){
        require "../modelo/facturaModelo.php";
        $data=array(
            "cufd"=>$_POST["cufd"],
            "fechaVigCufd"=>$_POST["fechaVigCufd"],
            "codControlCufd"=>$_POST["codControlCufd"]
        );
        echo ModeloFactura::mdlNuevoCufd($data);
    }
    static public function ctrUltimoCufd(){
        require "../modelo/facturaModelo.php";
        
        $respuesta=ModeloFactura::mdlUltimoCufd();
        echo json_encode($respuesta);
    }
}
