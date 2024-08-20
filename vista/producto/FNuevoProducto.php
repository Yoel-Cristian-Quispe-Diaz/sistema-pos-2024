<form action="" id="FRegProducto">
  <div class="modal-header">
    <h4 class="modal-title">Registro Nuevo Producto</h4>
    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <div class="form-group">
      <label for="">Codigo De Producto</label>
      <input type="text" class="form-control" name="codigo_p" id="codigo_p">
    </div>
    <div class="form-group">
      <label for="">Codigo SIN</label>
      <input type="text" class="form-control" name="codigo_p_s" id="codigo_p_s">
    </div>
    <div class="form-group">
      <label for="">Nombre</label>
      <input type="text" class="form-control" name="nombre" id="nombre">
    </div>
    <div class="form-group">
      <label for="">Precio</label>
      <input type="text" class="form-control" name="precio" id="precio">
    </div>
    <div class="form-group">
      <label for="">Unidad de Medida</label>
      <input type="text" class="form-control" name="unidad" id="unidad">
    </div>
    <div class="form-group">
      <label for="">Unidad SIN</label>
      <input type="text" class="form-control" name="unidad_s" id="unidad_s">
    </div>
    <div class="form-group">
      <label for="">Imagen</label>
      <input type="file" class="form-control" name="imagen" id="imagen" onchange="previewImage(event)">      
<center>
<img id="preview" src="#" alt="Vista previa de la imagen" style="display: none; max-width: 150px; margin-top: 20px ;">
</center>

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
    reader.onload = function() {
      var output = document.getElementById('preview');
      output.src = reader.result;
      output.style.display = 'block';
    };
    reader.readAsDataURL(event.target.files[0]);
  }


  $(function() {
    $.validator.setDefaults({
      submitHandler: function() {
        regProducto()
      }
    });
    $('#FRegProducto').validate({
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