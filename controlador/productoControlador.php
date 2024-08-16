<?php

$ruta = parse_url($_SERVER["REQUEST_URI"]);

if (isset($ruta["query"])) {

    if (
        $ruta["query"] == "ctrRegProducto" ||
        $ruta["query"] == "ctrEditProducto" ||
        $ruta["query"] == "ctrEliProducto"
    ) {
        $metodo = $ruta["query"];
        $Producto = new ControladorProducto();
        $Producto->$metodo();
    }
}

class ControladorProducto
{
    static public function ctrInfoProductos()
    {
        $respuesta = ModeloProducto::mdlInfoProductos();
        return $respuesta;
    }


    static public function ctrRegProducto()
    {
        require "../modelo/productoModelo.php";
        $data = array("razon_social_producto" => $_POST["razon_social"], "nit_ci_producto" => $_POST["nit_ci"], "direccion_producto" => $_POST["direccion"], "nombre_producto" => $_POST["nombre"], "telefono_producto" => $_POST["telefono"], "email_producto" => $_POST["email"]);
        var_dump($data);
        $respuesta = ModeloProducto::mdlRegProducto($data);

        echo $respuesta;
    }

    static public function ctrInfoProducto($id)
    {
        $respuesta = ModeloProducto::mdlInfoProducto($id);
        return $respuesta;
    }






    static function ctrEditProducto()
    {
        require "../modelo/productoModelo.php";

        $data = array("razon_social_producto" => $_POST["razon_social"], "nit_ci_producto" => $_POST["nit_ci"], "direccion_producto" => $_POST["direccion"], "nombre_producto" => $_POST["nombre"], "telefono_producto" => $_POST["telefono"], "email_producto" => $_POST["email"] , "id_producto" => $_POST["id"]);

        $respuesta= ModeloProducto::mdlEditProducto($data);
        echo $respuesta;
    }



    static function ctrEliProducto()
    {
        require "../modelo/productoModelo.php";
        $id = $_POST["id"];

        $respuesta = ModeloProducto::mdlEliProducto($id);
        echo $respuesta;
    }
}//final