<?php

$ruta = parse_url($_SERVER["REQUEST_URI"]);

if (isset($ruta["query"])) {

    if (
        $ruta["query"] == "ctrRegProducto" ||
        $ruta["query"] == "ctrEditProducto" ||
        $ruta["query"] == "ctrDatosProducto" ||
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
        $data = array("codigo_p" => $_POST["codigo_p"], "codigo_p_s" => $_POST["codigo_p_s"], "nombre" => $_POST["nombre"], "precio" => $_POST["precio"], "unidad" => $_POST["unidad"], "unidad_s" => $_POST["unidad_s"], "imagen" => $_FILES["imagen"]["name"], "imagen_temp" => $_FILES["imagen"]["tmp_name"]);
        $respuesta = ModeloProducto::mdlRegProducto($data);
        echo $respuesta;
    }

    static public function ctrInfoProducto($id)
    {
        $respuesta = ModeloProducto::mdlInfoProducto($id);
        return $respuesta;
    }

    static public  function ctrEditProducto()
    {
        require "../modelo/productoModelo.php";
        // se pone una condicional para verificar si se cambio la imagen con respecto a la anterior, en caso de ser null no se actualiza la imagen

        if ($_FILES["imagen"]["name"] == "") {
            $data = array("id" => $_POST["id"], "codigo_p" => $_POST["codigo_p"], "codigo_p_s" => $_POST["codigo_p_s"], "nombre" => $_POST["nombre"], "precio" => $_POST["precio"], "unidad" => $_POST["unidad"], "unidad_s" => $_POST["unidad_s"], "img" => "null", "dis" => $_POST["disponibilidad"]);
        } else {
            $data = array("id" => $_POST["id"], "codigo_p" => $_POST["codigo_p"], "codigo_p_s" => $_POST["codigo_p_s"], "nombre" => $_POST["nombre"], "precio" => $_POST["precio"], "unidad" => $_POST["unidad"], "unidad_s" => $_POST["unidad_s"], "imagen" => $_FILES["imagen"]["name"], "imagen_temp" => $_FILES["imagen"]["tmp_name"], "dis" => $_POST["disponibilidad"]);
        }
        var_dump($data);
        $respuesta = ModeloProducto::mdlEditProducto($data);
        echo $respuesta;
    }



    static public function ctrEliProducto()
    {
        require "../modelo/productoModelo.php";
        $id = $_POST["id"];

        $respuesta = ModeloProducto::mdlEliProducto($id);
        echo $respuesta;
    }

    static public function ctrDatosProducto()
    {
        require "../modelo/productoModelo.php";
        $codProducto = $_POST["codProducto"];
        $respuesta = ModeloProducto::mdlDatosProducto($codProducto);
        echo json_encode($respuesta);
    }

    static public function ctrCantidadProductos()
    {
        $respuesta = ModeloProducto::mdlCantidadProductos();
        return $respuesta;
    }
}
