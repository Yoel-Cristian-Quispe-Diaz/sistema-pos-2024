<?php
require_once "conexion.php";
class ModeloFactura
{



    static public function mdlInfoFacturas()
    {
        $stmt = Conexion::conectar()->prepare("SELECT id_factura, cod_factura, razon_social_cliente, fecha_emision, total, estado_factura, cuf
        FROM factura JOIN cliente ON cliente.id_cliente=factura.id_cliente");
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
        $stmt = Conexion::conectar()->prepare(
            "SELECT * FROM factura JOIN cliente ON cliente.id_cliente=factura.id_cliente WHERE id_factura=$id"
        );
        $stmt->execute();

        // $result = $stmt->fetch(PDO::FETCH_ASSOC);
        // var_dump($result); 
        $result = $stmt->fetch();

        return $result;
    }


    static public function mdlAnularFactura($cuf)
    {

        $stmt = Conexion::conectar()->prepare("UPDATE factura SET estado_factura=0 WHERE cuf='$cuf'");

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
    static public function mdlLeyenda(){
        $stmt=Conexion::conectar()->prepare("SELECT * FROM leyenda order by rand() limit 1");
        $stmt->execute();
        return $stmt->fetch();
    }

    static public function mdlRegistrarFactura($data){
        
        $codFactura=$data["codFactura"];
        $idCliente=$data["idCliente"];
        $detalle=$data["detalle"];
        $neto=$data["neto"];
        $descuento=$data["descuento"];
        $total=$data["total"];
        $fechaEmision=$data["fechaEmision"];
        $cufd=$data["cufd"];
        $cuf=$data["cuf"];
        $xml=$data["xml"];
        $idUsuario=$data["idUsuario"];
        $usuario=$data["usuario"];
        $leyenda=$data["leyenda"];
        
        $stmt=Conexion::conectar()->prepare("insert into factura(cod_factura, id_cliente, detalle, neto, descuento, total, fecha_emision, cufd, cuf, xml, id_usuario, usuario, leyenda) values('$codFactura','$idCliente','$detalle','$neto','$descuento','$total','$fechaEmision','$cufd','$cuf','$xml','$idUsuario','$usuario','$leyenda')");
        if($stmt->execute()){
            return "ok";        
        }else{
            return "error";
        }
    }

    static public function mdlCantidadVentas(){
        $stmt=Conexion::conectar()->prepare("select count(*) as venta from factura");
        $stmt->execute();
        return $stmt->fetch();

    }


}