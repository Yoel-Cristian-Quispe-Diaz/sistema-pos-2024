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


    static public function mdlEliFactura($id)
    {

        $stmt = Conexion::conectar()->prepare("delete from factura where id_factura=$id");

        if ($stmt->execute()) {
            return "ok";
        } else {
            return "error";
        }
    }


    static function mdlNumFactura()
    {
        $stmt = Conexion::conectar()->prepare("select max(id_factura) from factura");
        $stmt->execute();
        return $stmt->fetch();;
    }


    static public function mdlNuevoCufd($data){
        $cufd=$data["cufd"];
        $fechaVigCufd=$data["fechaVigCufd"];
        $codControlCufd=$data["codControlCufd"];
        
        $stmt=Conexion::conectar()->prepare("insert into cufd(codigo_cufd,codigo_control,fecha_vigencia)values('$cufd','$codControlCufd','$fechaVigCufd')");

        if($stmt->execute()){
            return "ok";        
        }else{
            return "error";
        }

    }
    static public function mdlUltimoCufd(){
        $stmt=Conexion::conectar()->prepare("SELECT * FROM cufd WHERE id_cufd=(select max(id_cufd) from cufd)");
        $stmt->execute();
        return $stmt->fetch();

    }
}