<?php

require_once "../../controlador/productoControlador.php";
require_once "../../modelo/productoModelo.php";

$id = $_GET["id"];
$producto = ControladorProducto::ctrInfoProducto($id);

?>

<div class="modal-header bg-success">
    <h4 class="modal-title">Informacion de producto</h4>
    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
</div>

<div class="modal-body">
    <div class="row">
        <div class="col-sm-6">
            <table class="table">
                <tr>
                    <th>Cod. Producto</th>
                    <td><?php echo $producto["cod_producto"]; ?></td>
                </tr>
                <tr>
                    <th>Cod. Producto SIN: </th>
                    <td><?php echo $producto["cod_producto_sin"]; ?></td>
                </tr>
                <tr>
                    <th>Nombre: </th>
                    <td><?php echo $producto["nombre_producto"]; ?></td>
                </tr>
                <tr>
                    <th>Precio: </th>
                    <td><?php echo $producto["precio_producto"]; ?></td>
                </tr>
                <tr>
                    <th>Unidad de Medida</th>
                    <td><?php echo $producto["unidad_medida"]; ?></td>
                </tr>
                <tr>
                    <th>Unidad de Medida SIN</th>
                    <td><?php echo $producto["unidad_medida_sin"]; ?></td>
                </tr>
                <tr>
                    <th>Disponibilidad: </th>
                    <td><?php echo $producto["disponibilidad_producto"]; ?></td>
                </tr>
                <tr>
                    <th>Cod. Producto</th>
                    <td><?php
                        if ($producto["disponibilidad_producto"] == 1) {
                            echo '<span class="badge badge-success">Disponible</span>';
                        } else {
                            echo '<span class="badge badge-danger">No Disponible</span>';
                        }


                        ?></td>
                </tr>
            </table>
        </div>
        <div class="col-sm-6" style="text-align: center;">
            <?php

            if ($producto["imagen_producto"] != "") {
            ?>
                <img src="<?php echo $producto["imagen_producto"] ?>" alt="" style="max-width: 250px;">
            <?php
            } else {
            ?>
                <img src="assest/dist/img/product_defaultpng" alt="" style="max-width: 250px;">
            <?php
            }
            ?>

        </div>
    </div>
</div>

<div class="modal-footer justify-content-between">
    <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>

<div>    <button class="btn-secondary" onclick="MEditProducto(<?php echo $producto["id_producto"]; ?>)">
        <i class="fas fa-edit"></i>
    </button>


    <button class="btn-danger" onclick="MEliProducto(<?php echo $producto["id_producto"]; ?>)">
        <i class="fas fa-trash"></i>
    </button></div>
</div>