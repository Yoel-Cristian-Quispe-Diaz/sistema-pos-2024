function MNuevoProducto() {
  $("#modal-producto").modal("show");
  catalogo();
  medidas();

  var obj = "";
  $.ajax({
    type: "POST",
    url: "vista/producto/FNuevoProducto.php",
    data: obj,
    success: function (data) {
      $("#content-producto").html(data);
    },
  });
}

function regProducto() {
  var formData = new FormData($("#FRegProducto")[0]);

  $.ajax({
    type: "POST",
    url: "controlador/productoControlador.php?ctrRegProducto",
    data: formData,
    cache: false,
    contentType: false,
    processData: false,
    success: function (data) {
      if ((data = "ok")) {
        Swal.fire({
          icon: "success",
          title: "Registro Exitoso De Producto",
          showConfirmButton: false,
          timer: 1000,
        });
        setTimeout(function () {
          location.reload();
        }, 1200);
      } else {
        Swal.fire({
          title: "Error de Registro",
          icon: "error",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    },
  });
}

function MEditProducto(id) {
  $("#modal-producto").modal("show");
  catalogo();
  medidas();
  var obj = "";
  $.ajax({
    type: "POST",
    url: "vista/producto/FEditProducto.php?id=" + id,
    data: obj,
    success: function (data) {
      $("#content-producto").html(data);
    },
  });
} //

function editProducto() {
  var formData = new FormData($("#FEditProducto")[0]);
  $.ajax({
    type: "POST",
    url: "controlador/productoControlador.php?ctrEditProducto",
    data: formData,
    cache: false,
    contentType: false,
    processData: false,
    success: function (data) {
      if ((data = "ok")) {
        Swal.fire({
          icon: "success",
          showConfirmButton: false,
          title: "Producto Actualizado",
          timer: 1000,
        });

        setTimeout(function () {
          location.reload();
        }, 1200);
      } else {
        Swal.fire({
          title: "Error",
          icon: "error",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    },
  });
}

function MEliProducto(id) {
  var obj = {
    id: id,
  };

  Swal.fire({
    title: "¿Estás seguro de eliminar este producto?",
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: "Confirmar",
    denyButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        type: "POST",
        url: "controlador/productoControlador.php?ctrEliProducto",
        data: obj,
        success: function (data) {
          if (data == "ok") {
            location.reload();
          } else {
            Swal.fire({
              icon: "error",
              showConfirmButton: false,
              title: "Error",
              text: "El producto no puede ser eliminado",
              timer: 1000,
            });
          }
        },
      });
    }
  });
}

function catalogo() {
  var objeto = {
    codigoAmbiente: 2,
    codigoPuntoVenta: 0,
    codigoPuntoVentaSpecified: true,
    codigoSistema: "775FA42BE90F7B78EF98F57",
    codigoSucursal: 0,
    cuis: "9272DC05",
    nit: 338794023,
  };

  $.ajax({
    type: "POST",
    url: "http://localhost:5000/Sincronizacion/listaproductosservicios?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJTdXBlcmppY2hvMzMiLCJjb2RpZ29TaXN0ZW1hIjoiNzc1RkE0MkJFOTBGN0I3OEVGOThGNTciLCJuaXQiOiJINHNJQUFBQUFBQUFBRE0ydGpDM05ERXdNZ1lBOFFXMzNRa0FBQUE9IiwiaWQiOjYxODYwOCwiZXhwIjoxNzMzOTYxNjAwLCJpYXQiOjE3MDI0OTc2NjAsIm5pdERlbGVnYWRvIjozMzg3OTQwMjMsInN1YnNpc3RlbWEiOiJTRkUifQ.4K_pQUXnIhgI5ymmXoyL43i0pSk3uKCgLMkmQeyl67h7j55GSRsH120AD44pR0aQ1UX_FNYzWQBYrX6pWLd-1w",
    data: JSON.stringify(objeto),
    cache: false,
    contentType: "application/json",
    success: function (data) {
      console.log(data);

      // Limpiar el select antes de llenarlo
      $('#miSelect').empty();
      $('#miSelect').append('<option value="" selected disabled style="color: red;">Seleccione un Codigo Producto SIN</option>');

      // for (var i = 0; i < data["listaCodigos"].length; i++) {
      //   $('#miSelect').append(
      //     '<option value="' + data["listaCodigos"][i]["codigoProducto"] + '">' +
      //     data["listaCodigos"][i]["descripcionProducto"] +
      //     '</option>'
      //   );
      // }
      for (var i = 0; i < data["listaCodigos"].length; i++) {
        $('#miSelect').append(
          '<option value="' + data["listaCodigos"][i]["codigoProducto"] + '"  title ="'+ data["listaCodigos"][i]["descripcionProducto"] + '" >' +
          data["listaCodigos"][i]["codigoProducto"] +
          '</option>'
        );
      }


    },
    error: function (error) {
      console.error('Error al obtener los datos:', error);
    }
  });
}

function medidas() {
  var objeto = {
    codigoAmbiente: 2,
    codigoPuntoVenta: 0,
    codigoPuntoVentaSpecified: true,
    codigoSistema: "775FA42BE90F7B78EF98F57",
    codigoSucursal: 0,
    cuis: "9272DC05",
    nit: 338794023,
  };

  $.ajax({
    type: "POST",
    url: "http://localhost:5000/Sincronizacion/unidadmedida?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJTdXBlcmppY2hvMzMiLCJjb2RpZ29TaXN0ZW1hIjoiNzc1RkE0MkJFOTBGN0I3OEVGOThGNTciLCJuaXQiOiJINHNJQUFBQUFBQUFBRE0ydGpDM05ERXdNZ1lBOFFXMzNRa0FBQUE9IiwiaWQiOjYxODYwOCwiZXhwIjoxNzMzOTYxNjAwLCJpYXQiOjE3MDI0OTc2NjAsIm5pdERlbGVnYWRvIjozMzg3OTQwMjMsInN1YnNpc3RlbWEiOiJTRkUifQ.4K_pQUXnIhgI5ymmXoyL43i0pSk3uKCgLMkmQeyl67h7j55GSRsH120AD44pR0aQ1UX_FNYzWQBYrX6pWLd-1w",
    data: JSON.stringify(objeto),
    cache: false,
    contentType: "application/json",
    success: function (data) {
      console.log(data);
      // Limpiar el select antes de llenarlo
      $('#miSelect_medida').empty();
      $('#miSelect_medida').append('<option value="" selected disabled style="color: red;">Seleccione nueva medida</option>');

      // for (var i = 0; i < data["listaCodigos"].length; i++) {
      //   $('#miSelect').append(
      //     '<option value="' + data["listaCodigos"][i]["codigoProducto"] + '">' +
      //     data["listaCodigos"][i]["descripcionProducto"] +
      //     '</option>'
      //   );
      // }
      for (var i = 0; i < data["listaCodigos"].length; i++) {
        $('#miSelect_medida').append(
          '<option value="' + data["listaCodigos"][i]["codigoClasificador"] + '"  title ="'+ data["listaCodigos"][i]["codigoClasificador"] + '" >' +
          data["listaCodigos"][i]["descripcion"] +
          '</option>'
        );
      }
    },
  });
}





function previsualizar(event) {
  var reader = new FileReader();
  reader.onload = function () {
    var output = document.getElementById("img_pre");
    output.src = reader.result;
  };
  reader.readAsDataURL(event.target.files[0]);
}

function SinCatalogo() {
  var objeto = {
    codigoAmbiente: 2,
    codigoPuntoVenta: 0,
    codigoPuntoVentaSpecified: true,
    codigoSistema: "775FA42BE90F7B78EF98F57",
    codigoSucursal: 0,
    cuis: "9272DC05",
    nit: 338794023,
  };

  $.ajax({
    type: "POST",
    url: "http://localhost:5000/Sincronizacion/listaproductosservicios?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJTdXBlcmppY2hvMzMiLCJjb2RpZ29TaXN0ZW1hIjoiNzc1RkE0MkJFOTBGN0I3OEVGOThGNTciLCJuaXQiOiJINHNJQUFBQUFBQUFBRE0ydGpDM05ERXdNZ1lBOFFXMzNRa0FBQUE9IiwiaWQiOjYxODYwOCwiZXhwIjoxNzMzOTYxNjAwLCJpYXQiOjE3MDI0OTc2NjAsIm5pdERlbGVnYWRvIjozMzg3OTQwMjMsInN1YnNpc3RlbWEiOiJTRkUifQ.4K_pQUXnIhgI5ymmXoyL43i0pSk3uKCgLMkmQeyl67h7j55GSRsH120AD44pR0aQ1UX_FNYzWQBYrX6pWLd-1w",
    data: JSON.stringify(objeto),
    cache: false,
    contentType: "application/json",
    success: function (data) {
      console.log(data);
      for (var i = 0; i < data["listaCodigos"].length; i++) {
        $("#CatProductos").append(
          "<tr> <td> " +
            data["listaCodigos"][i]["codigoActividad"] +
            "</td> <td>" +
            data["listaCodigos"][i]["codigoProducto"] +
            "</td>  <td>" +
            data["listaCodigos"][i]["descripcionProducto"] +
            "</td> <td></td></tr>"
        );
      }
    },
  });
}

function unidadesMedidas() {
  var objeto = {
    codigoAmbiente: 2,
    codigoPuntoVenta: 0,
    codigoPuntoVentaSpecified: true,
    codigoSistema: "775FA42BE90F7B78EF98F57",
    codigoSucursal: 0,
    cuis: "9272DC05",
    nit: 338794023,
  };

  $.ajax({
    type: "POST",
    url: "http://localhost:5000/Sincronizacion/unidadmedida?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJTdXBlcmppY2hvMzMiLCJjb2RpZ29TaXN0ZW1hIjoiNzc1RkE0MkJFOTBGN0I3OEVGOThGNTciLCJuaXQiOiJINHNJQUFBQUFBQUFBRE0ydGpDM05ERXdNZ1lBOFFXMzNRa0FBQUE9IiwiaWQiOjYxODYwOCwiZXhwIjoxNzMzOTYxNjAwLCJpYXQiOjE3MDI0OTc2NjAsIm5pdERlbGVnYWRvIjozMzg3OTQwMjMsInN1YnNpc3RlbWEiOiJTRkUifQ.4K_pQUXnIhgI5ymmXoyL43i0pSk3uKCgLMkmQeyl67h7j55GSRsH120AD44pR0aQ1UX_FNYzWQBYrX6pWLd-1w",
    data: JSON.stringify(objeto),
    cache: false,
    contentType: "application/json",
    success: function (data) {
      console.log(data);
      // for (var i = 0; i < data["listaCodigos"].length; i++) {
      //   $("#CatProductos").append(
      //     "<tr> <td> " +
      //       data["listaCodigos"][i]["codigoActividad"] +
      //       "</td> <td>" +
      //       data["listaCodigos"][i]["codigoProducto"] +
      //       "</td>  <td>" +
      //       data["listaCodigos"][i]["descripcionProducto"] +
      //       "</td> <td></td></tr>"
      //   );
      // }
    },
  });
}


function MVerProducto(id) {
  $("#modal-producto").modal("show");
  var obj = "";
  $.ajax({
    type: "POST",
    url: "vista/producto/MVerProducto.php?id=" + id,
    data: obj,
    success: function (data) {
      $("#content-producto").html(data);
    },
  });
}













// function SinCatalogo() {
//   var objeto = {
//     codigoAmbiente: 2,
//     codigoPuntoVenta: 0,
//     codigoPuntoVentaSpecified: true,
//     codigoSistema: "775FA42BE90F7B78EF98F57",
//     codigoSucursal: 0,
//     cuis: "9272DC05",
//     nit: 338794023,
//   };

//   $.ajax({
//     type: "POST",
//     url: "http://localhost:5000/Sincronizacion/listaproductosservicios?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJTdXBlcmppY2hvMzMiLCJjb2RpZ29TaXN0ZW1hIjoiNzc1RkE0MkJFOTBGN0I3OEVGOThGNTciLCJuaXQiOiJINHNJQUFBQUFBQUFBRE0ydGpDM05ERXdNZ1lBOFFXMzNRa0FBQUE9IiwiaWQiOjYxODYwOCwiZXhwIjoxNzMzOTYxNjAwLCJpYXQiOjE3MDI0OTc2NjAsIm5pdERlbGVnYWRvIjozMzg3OTQwMjMsInN1YnNpc3RlbWEiOiJTRkUifQ.4K_pQUXnIhgI5ymmXoyL43i0pSk3uKCgLMkmQeyl67h7j55GSRsH120AD44pR0aQ1UX_FNYzWQBYrX6pWLd-1w",
//     data: JSON.stringify(objeto),
//     cache: false,
//     contentType: "application/json",
//     success: function (data) {
//       console.log(data);
//       for (var i = 0; i < data["listaCodigos"].length; i++) {
//         $("#CatProductos").append(
//           "<tr> <td>" +
//             data["listaCodigos"][i]["codigoActividad"] +
//             "</td> <td>" +
//             data["listaCodigos"][i]["codigoProducto"] +
//             "</td>  <td>" +
//             data["listaCodigos"][i]["descripcionProducto"] +
//             "</td> </tr>"
//         );
//       }
//     },
//   });
// }
