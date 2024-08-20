<?php

require_once "../../controlador/productoControlador.php";
require_once "../../modelo/productoModelo.php";

$id = $_GET["id"];
$producto = ControladorProducto::ctrInfoProducto($id);

?>

<form action="" id="FEditProducto">
  <div class="modal-header">
    <h4 class="modal-title">Registro Nuevo Producto</h4>
    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>

  <!-- id_producto	cod_producto	cod_producto_sin	nombre_producto	precio_producto	unidad_medida	unidad_medida_sin	imagen_producto	disponibilidad_producto -->
  <div class="modal-body">
    <div class="form-group">
      <label for="">ID De Producto</label>
      <input type="text" class="form-control" name="id" id="id" value="<?php echo $producto["id_producto"]; ?>" readonly>
    </div>
    <div class="form-group">
      <label for="">Codigo De Producto</label>
      <input type="text" class="form-control" name="codigo_p" id="codigo_p" value="<?php echo $producto["cod_producto"]; ?>">
    </div>
    <div class="form-group">
      <label for="">Codigo SIN</label>
      <input type="text" class="form-control" name="codigo_p_s" id="codigo_p_s" value="<?php echo $producto["cod_producto_sin"]; ?>">
    </div>
    <div class="form-group">
      <label for="">Nombre</label>
      <input type="text" class="form-control" name="nombre" id="nombre" value="<?php echo $producto["nombre_producto"]; ?>">
    </div>
    <div class="form-group">
      <label for="">Precio</label>
      <input type="text" class="form-control" name="precio" id="precio" value="<?php echo $producto["precio_producto"]; ?>">
    </div>
    <div class="form-group">
      <label for="">Unidad de Medida</label>
      <input type="text" class="form-control" name="unidad" id="unidad" value="<?php echo $producto["unidad_medida"]; ?>">
    </div>
    <div class="form-group">
      <label for="">Unidad SIN</label>
      <input type="text" class="form-control" name="unidad_s" id="unidad_s" value="<?php echo $producto["unidad_medida_sin"]; ?>">
    </div>
    <div class="form-group">
      <label for="">Imagen</label>
      <input type="file" class="form-control" name="imagen" id="imagen"  onchange="previewImage(event)" value="<?php echo $producto["imagen_producto"]; ?>">
      <center>
        <img id="preview" src="<?php echo $producto["imagen_producto"]; ?>" alt="Vista previa de la imagen" style="display: block; max-width: 150px; margin-top: 20px ;"> </center>
    </div>
    <div class="form-group">
      <label for="">Disponibilidad</label>

      <div class="row">
        <div class="col-sm-6">
          <div class="custom-control custom-radio">
            <input class="custom-control-input" type="radio" id="disp" name="disponibilidad"
              <?php if ($producto["disponibilidad_producto"] == "1"): ?>checked<?php endif; ?> value="1">
            <label for="disp" class="custom-control-label">Disponible</label>
          </div>
        </div>

        <div class="col-sm-6">
          <div class="custom-control custom-radio">
            <input class="custom-control-input" type="radio" id="no_disp" name="disponibilidad"
              <?php if ($producto["disponibilidad_producto"] == "0"): ?>checked<?php endif; ?> value="0">
            <label for="no_disp" class="custom-control-label">No Disponible</label>
          </div>
        </div>
      </div>


    </div>
    <div class="modal-footer justify-content-between">
      <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
      <button type="submit" class="btn btn-primary">Guardar Cambios</button>
    </div>
</form>

<script>

function previewImage(event) {
            var reader = new FileReader();
            reader.onload = function(){
                var output = document.getElementById('preview');
                output.src = reader.result;
            };
            reader.readAsDataURL(event.target.files[0]);
        }


  $(function() {
    $.validator.setDefaults({
      submitHandler: function() {
        editProducto()
      }
    });
    $('#FEditProducto').validate({
      rules: {
        codigo_p: {
          required: true,
          minlength: 3,
        },
        nombre: {
          required: true,
          minlength: 3
        },
        precio: {
          required: true,
          minlength: 1
        },
        unidad: {
          required: true,
          minlength: 1
        },
        unidad_s: {
          required: true,
          minlength: 1
        },
        codigo_p_s: {
          required: true,
          minlength: 1
        },


      },

      errorElement: 'span',
      errorPlacement: function(error, element) {
        error.addClass('invalid-feedback');
        element.closest('.form-group').append(error);
      },
      highlight: function(element, errorClass, va2lidClass) {
        $(element).addClass('is-invalid');
      },
      unhighlight: function(element, errorClass, validClass) {
        $(element).removeClass('is-invalid');
      }
    });
  });
</script>