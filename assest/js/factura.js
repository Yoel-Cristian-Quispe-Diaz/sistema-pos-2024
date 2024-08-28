// variable globales
var host = "http://localhost:5000/";
function MNuevoFactura() {
  $("#modal-default").modal("show");

  var obj = "";
  $.ajax({
    type: "POST",
    url: "vista/factura/FNuevoFactura.php",
    data: obj,
    success: function (data) {
      $("#content-default").html(data);
    },
  });
}

function regFactura() {
  var formData = new FormData($("#FRegFactura")[0]);
  if (formData.get("password") == formData.get("vrPassword")) {
    $.ajax({
      type: "POST",
      url: "controlador/facturaControlador.php?ctrRegFactura",
      data: formData,
      cache: false,
      contentType: false,
      processData: false,
      success: function (data) {
        if ((data = "ok")) {
          Swal.fire({
            icon: "success",
            title: "Registro Exitoso",
            showConfirmButton: false,
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
}

function MEditFactura(id) {
  $("#modal-default").modal("show");

  var obj = "";
  $.ajax({
    type: "POST",
    url: "vista/factura/FEditFactura.php?id=" + id,
    data: obj,
    success: function (data) {
      $("#content-default").html(data);
    },
  });
} //final
function editFactura() {
  var formData = new FormData($("#FEditFactura")[0]);
  if (formData.get("password") == formData.get("vrPassword")) {
    $.ajax({
      type: "POST",
      url: "controlador/facturaControlador.php?ctrEditFactura",
      data: formData,
      cache: false,
      contentType: false,
      processData: false,
      success: function (data) {
        if ((data = "ok")) {
          Swal.fire({
            icon: "success",
            showConfirmButton: false,
            title: "Factura Actualizado",
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
}

function MEliFactura(id) {
  var obj = {
    id: id,
  };

  Swal.fire({
    title: "¿Estás seguro de eliminar este factura?",
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: "Confirmar",
    denyButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        type: "POST",
        url: "controlador/facturaControlador.php?ctrEliFactura",
        data: obj,
        success: function (data) {
          if (data == "ok") {
            location.reload();
          } else {
            Swal.fire({
              icon: "error",
              showConfirmButton: false,
              title: "Error",
              text: "El factura no puede ser eliminado",
              timer: 1000,
            });
          }
        },
      });
    }
  });
}

function verificarComunicacion() {
  var obj = "";
  $.ajax({
    type: "POST",
    url: host + "api/CompraVenta/comunicacion",
    data: obj,
    cache: false,
    contentType: "application/json",
    processData: false,
    success: function (data) {
      console.log(data);
      if (data["transaccion"] == true) {
        document.getElementById("comunicacionSIAT").innerHTML = "Conectado";
        document.getElementById("comunicacionSIAT").className = "badge badge-success";
      }
    },
  }).fail(function (jqXHR, textStatus, errorThrown) {
if (jqXHR.status == 0) {
  document.getElementById("comunicacionSIAT").innerHTML = "Desconectado";
  document.getElementById("comunicacionSIAT").className = "badge badge-danger";}
  });
}
setInterval(verificarComunicacion, 5000);