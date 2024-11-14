<?php
require_once "conexion.php";
class ModeloProducto
{



    static public function mdlInfoProductos()
    {
        $stmt = Conexion::conectar()->prepare("select * from producto");
        $stmt->execute();
        return $stmt->fetchAll();
    }



    static public function mdlRegProducto($data)
    {
        // $data = array("codigo_p" => $_POST["codigo_p"], "codigo_p_s" => $_POST["codigo_p_s"], "nombre" => $_POST["nombre"], "precio" => $_POST["precio"], "unidad" => $_POST["unidad"], "unidad_s" => $_POST["unidad_s"], "imagen" => $_POST["imagen"]);

        $codigo_p = $data["codigo_p"];
        $codigo_p_s = $data["codigo_p_s"];
        $nombre = $data["nombre"];
        $precio = $data["precio"];
        $unidad = $data["unidad"];
        $unidad_s = $data["unidad_s"];
        $imagen = $data["imagen"];
        $tpm_name = $data["imagen_temp"];

        if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] === UPLOAD_ERR_OK) {
            $carpeta = "../assest/dist/img/productos/";
            move_uploaded_file($tpm_name, $carpeta . $imagen);
            $ruta_imagen = "assest/dist/img/productos/" . $imagen;
        } else {
            $ruta_imagen = " ";
        }
        $stmt = Conexion::conectar()->prepare("insert into producto (cod_producto, cod_producto_sin, nombre_producto, precio_producto, unidad_medida, unidad_medida_sin, imagen_producto) values ('$codigo_p', '$codigo_p_s', '$nombre', '$precio', '$unidad', '$unidad_s', '$ruta_imagen')");
        if ($stmt->execute()) {
            return "ok";
        } else {
            return "error";
        }
    }

    static public function mdlInfoProducto($id)
    {
        $stmt = Conexion::conectar()->prepare("select * from producto where id_producto=$id");
        $stmt->execute();
        $result = $stmt->fetch();

        return $result;
    }

    static public function mdlEditProducto($data)
    {

        $codigo_p = $data["codigo_p"];
        $codigo_p_s = $data["codigo_p_s"];
        $nombre = $data["nombre"];
        $precio = $data["precio"];
        $unidad = $data["unidad"];
        $unidad_s = $data["unidad_s"];
        $imagen = $data["imagen"];
        $tpm_name = $data["imagen_temp"];
        $disponibilidad = $data["dis"];
        $id = $data["id"];

        //consulta para actualizar datos
        // se pone una condicional para verificar si se cambio la imagen con respecto a la anterior, en caso de ser null no se actualiza la imagen

        if ($data["img"] == "null") {
            $stmt = Conexion::conectar()->prepare("update producto set cod_producto='$codigo_p', cod_producto_sin='$codigo_p_s', nombre_producto='$nombre', precio_producto='$precio', unidad_medida='$unidad', unidad_medida_sin='$unidad_s', disponibilidad_producto='$disponibilidad' where id_producto='$id'");
            if ($stmt->execute()) {
                return "ok";
            } else {
                return "error";
            }
        } else {
            if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] === UPLOAD_ERR_OK) {
                $carpeta = "../assest/dist/img/productos/";
                move_uploaded_file($tpm_name, $carpeta . $imagen);
                $ruta_imagen = "assest/dist/img/productos/" . $imagen;
            } else {
                $ruta_imagen = " ";
            }
            $stmt = Conexion::conectar()->prepare("update producto set cod_producto='$codigo_p', cod_producto_sin='$codigo_p_s', nombre_producto='$nombre', precio_producto='$precio', unidad_medida='$unidad', unidad_medida_sin='$unidad_s', imagen_producto='$ruta_imagen', disponibilidad_producto='$disponibilidad' where id_producto='$id'");
            if ($stmt->execute()) {
                return "ok";
            } else {
                return "error";
            }
        }
    }

    static public function mdlEliProducto($id)
    {

        $stmt = Conexion::conectar()->prepare("delete from producto where id_producto=$id");

        if ($stmt->execute()) {
            return "ok";
        } else {
            return "error";
        }
    }
    static public function mdlDatosProducto($codProducto)
    {
        $stmt = Conexion::conectar()->prepare("select * from producto where cod_producto='$codProducto'");
        $stmt->execute();
        return $stmt->fetch();
    }

    
    static public function mdlCantidadProductos(){
        $stmt=Conexion::conectar()->prepare("select count(*) as producto from producto");
        $stmt->execute();
        return $stmt->fetch();
    }
}
