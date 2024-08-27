<form action="" id="FRegProducto">
  <div class="modal-header">
    <h4 class="modal-title">Registro Nuevo Producto</h4>
    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label for="codigo_p">Codigo De Producto</label>
          <input type="text" class="form-control" name="codigo_p" id="codigo_p">
        </div>
      </div>
      <div class="col-md-6">
        <div class="form-group">
          <label for="miSelect">Codigo de Producto SIN:</label>
          <select id="miSelect" name="codigo_p_s" class="form-control">
            <option value="">Cargando........</option>
          </select>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label for="nombre">Nombre</label>
          <input type="text" class="form-control" name="nombre" id="nombre">
        </div>
      </div>
      <div class="col-md-6">
        <div class="form-group">
          <label for="precio">Precio</label>
          <input type="text" class="form-control" name="precio" id="precio">
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label for="unidad">Unidad de Medida</label>
          <input type="text" class="form-control" name="unidad" id="unidad">
        </div>
      </div>
      <div class="col-md-6">
        <div class="form-group">
          <label for="unidad_s">Unidad de Medida SIN</label>
          <select id="miSelect_medida" name="codigo_p_s" class="form-control">
            <option value="">Cargando........</option>
          </select>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label for="imagen">Imagen</label>
          <input type="file" class="form-control" name="imagen" id="imagen" onchange="previsualizar(event)">
        </div>
      </div>
      <div class="col-md-6" style="text-align: center;">
        <img id="img_pre" src="assest/dist/img/product_default.png" alt="Vista previa de la imagen" style="max-width: 100px; margin: 20px;">
      </div>
    </div>
  </div>

  <div class="modal-footer justify-content-between">
    <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
    <button type="submit" class="btn btn-primary">Guardar</button>
  </div>
</form>


<script>
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