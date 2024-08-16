<?php
require_once "conexion.php";
class ModeloFactura
{



    static public function mdlInfoFacturas()
    {
        $stmt = Conexion::conectar()->prepare("select * from factura");
        $stmt->execute();
        return $stmt->fetchAll();
    }



    static public function mdlRegFactura($data)
    {
        $razon_social_factura = $data["razon_social_factura"];
        $nit_ci_factura = $data["nit_ci_factura"];
        $direccion_factura = $data["direccion_factura"];
        $nombre_factura = $data["nombre_factura"];
        $telefono_factura = $data["telefono_factura"];
        $email_factura = $data["email_factura"];

        var_dump($data);
        //creamos la consulta para insertar los datos

        $stmt = Conexion::conectar()->prepare("insert into factura(razon_social_factura, nit_ci_factura, direccion_factura, nombre_factura, telefono_factura, email_factura) values('$razon_social_factura', '$nit_ci_factura', '$direccion_factura', '$nombre_factura', '$telefono_factura', '$email_factura')");
        if ($stmt->execute()) {
            return "ok";
        } else {
            return "error";
        }
    }

    static public function mdlInfoFactura($id)
    {
        $stmt = Conexion::conectar()->prepare("select * from factura where id_factura=$id");
        $stmt->execute();

        // $result = $stmt->fetch(PDO::FETCH_ASSOC);
        // var_dump($result); 
        $result = $stmt->fetch();

        return $result;
    }

    static public function mdlEditFactura($data)
    {

        // id_factura	razon_social_factura	nit_ci_factura	direccion_factura	nombre_factura	telefono_factura	email_factura
        $razon_social_factura = $data["razon_social_factura"];
        $nit_ci_factura = $data["nit_ci_factura"];
        $direccion_factura = $data["direccion_factura"];
        $nombre_factura = $data["nombre_factura"];
        $telefono_factura = $data["telefono_factura"];
        $email_factura = $data["email_factura"];
        $id = $data["id_factura"];

        //consulta para actualizar datos
        $stmt = Conexion::conectar()->prepare("update factura set razon_social_factura='$razon_social_factura', nit_ci_factura='$nit_ci_factura', direccion_factura='$direccion_factura', nombre_factura='$nombre_factura', telefono_factura='$telefono_factura', email_factura='$email_factura' where id_factura=$id");
        if ($stmt->execute()) {
            return "ok";
        } else {
            return "error";
        }
    }

    static public function mdlEliFactura($id)
    {

        $stmt = Conexion::conectar()->prepare("delete from factura where id_factura=$id");

        if ($stmt->execute()) {
            return "ok";
        } else {
            return "error";
        }
    }
}