<?php

$ruta = parse_url($_SERVER["REQUEST_URI"]);

if (isset($ruta["query"])) {

    if (
        $ruta["query"] == "ctrRegCliente" ||
        $ruta["query"] == "ctrEditCliente" ||
        $ruta["query"] == "ctrBusCliente" ||
        $ruta["query"] == "ctrEliCliente"
    ) {
        $metodo = $ruta["query"];
        $Cliente = new ControladorCliente();
        $Cliente->$metodo();
    }
}

class ControladorCliente
{
    static public function ctrInfoClientes()
    {
        $respuesta = ModeloCliente::mdlInfoClientes();
        return $respuesta;
    }

    static public function ctrRegCliente()
    {
        require "../modelo/pacienteModelo.php";

        // id, nombre, apellido, fecha_nacimiento, direccion, telefono, correo
        // Creamos el array de datos
        $data = array(
            "nombre" => $_POST["nombre"],
            "apellido" => $_POST["apellido"],
            "fecha_nacimiento" => $_POST["fecha_nacimiento"],
            "direccion" => $_POST["direccion"],
            "telefono" => $_POST["telefono"],
            "correo" => $_POST["correo"]
        );

        $respuesta = ModeloCliente::mdlRegCliente($data);

        echo $respuesta;
    }

    static public function ctrInfoCliente($id)
    {
        $respuesta = ModeloCliente::mdlInfoCliente($id);
        return $respuesta;
    }

    static public function ctrEditCliente()
    {
        require "../modelo/pacienteModelo.php";

        // Actualizamos los datos del paciente
        $data = array(
            "nombre" => $_POST["nombre"],
            "apellido" => $_POST["apellido"],
            "fecha_nacimiento" => $_POST["fecha_nacimiento"],
            "direccion" => $_POST["direccion"],
            "telefono" => $_POST["telefono"],
            "correo" => $_POST["correo"],
            "id" => $_POST["id"]
        );

        $respuesta = ModeloCliente::mdlEditCliente($data);
        echo $respuesta;
    }

    static public function ctrEliCliente()
    {
        require "../modelo/pacienteModelo.php";
        $id = $_POST["id"];

        $respuesta = ModeloCliente::mdlEliCliente($id);
        echo $respuesta;
    }

    static public function ctrBusCliente()
    {
        require "../modelo/pacienteModelo.php";
        $apellidoCliente = $_POST["apellido"];

        $respuesta = ModeloCliente::mdlBusCliente($apellidoCliente);
        echo json_encode($respuesta);
    }

    static public function ctrCantidadClientes()
    {
        $respuesta = ModeloCliente::mdlCantidadClientes();
        return $respuesta;
    }
}
