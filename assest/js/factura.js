// variable globales
var host = "http://localhost:5000/";

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
      // console.log(data);
      if (data["transaccion"] == true) {
        document.getElementById("comunicacionSIAT").innerHTML = "Conectado";
        document.getElementById("comunicacionSIAT").className =
          "badge badge-success";
      }
    },
  }).fail(function (jqXHR, textStatus, errorThrown) {
    if (jqXHR.status == 0) {
      document.getElementById("comunicacionSIAT").innerHTML = "Desconectado";
      document.getElementById("comunicacionSIAT").className =
        "badge badge-danger";
    }
  });
}
setInterval(verificarComunicacion, 5000);



codigoActividad();
function codigoActividad() {
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
      var codigosActiviades=document.getElementById("actEconomica");
      for (var i = 0; i < data["listaCodigos"].length; i++) {

        var option = document.createElement("option");
        option.value = data["listaCodigos"][i]["codigoActividad"];
        option.textContent=data["listaCodigos"][i]["codigoActividad"];
        codigosActiviades.appendChild(option);
      }
    },
  });
}



function busCliente() {
  let nitCliente = document.getElementById("nitCliente").value;
  // console.log(nitCliente)
  var obj = {
    nitCliente: nitCliente,
  };
  $.ajax({
    type: "POST",
    url: "controlador/clienteControlador.php?ctrBusCliente",
    data: obj,
    dataType: "json",
    success: function (data) {
      console.log(data);
      if (data["email_cliente" == ""]) {
        document.getElementById("emailCliente").value = "";
      } else {
        document.getElementById("emailCliente").value = data["email_cliente"];
      }

      document.getElementById("rsCliente").value = data["razon_social_cliente"];
      emitirFactura();
    },
  });
}

/* ===========
generar factura
=========== */
function emitirFactura() {
  console.log("emitir factura");
  let obj = ""; // No se está enviando ningún dato en 'obj', lo cual está bien si no se necesita.

  $.ajax({
    type: "POST",
    url: "controlador/facturaControlador.php?ctrNumFactura",
    data: obj, // Si no necesitas enviar datos, puedes omitir esta línea.
    success: function (data) {
      document.getElementById("numFactura").value = data;
      console.log("Respuesta recibida:", data); // Verifica que esta línea se esté ejecutando
    },
    error: function (xhr, status, error) {
      console.error("Error en la solicitud:", status, error); // Captura y muestra cualquier error
      console.error("Respuesta del servidor:", xhr.responseText); // Muestra la respuesta completa del servidor si hay un error
    },
  });
}

/* ==========
Rellenar datos de  Producto
========== */

function datosProducto() {
  let codProducto = document.getElementById("codProducto").value;
  var obj = {
    codProducto: codProducto,
  };
  // console.log(obj);
  $.ajax({
    type: "POST",
    url: "controlador/productoControlador.php?ctrDatosProducto",
    data: obj,
    dataType: "json",
    success: function (data) {
      console.log(data);
      document.getElementById("conceptoPro").value = data["nombre_producto"];
      document.getElementById("uniMedida").value = data["unidad_medida"];
      document.getElementById("preUnitario").value = data["precio_producto"];

      document.getElementById("uniMedidaSin").value = data["unidad_medida_sin"];
      document.getElementById("codProductoSin").value =
        data["cod_producto_sin"];
    },
  });
}
function calculartotal() {
  var cantidad = document.getElementById("cantProducto").value;
  var precio = document.getElementById("preUnitario").value;
  var descuento = document.getElementById("descProducto").value;
  cantidad = parseInt(cantidad);
  precio = parseFloat(precio);

  /* =========
mi formulario tiene un campo de descuento que puede ser en porcentaje o en cantidad
========== */
  if (descuento.includes("%")) {
    descuento = descuento.replace(/%/g, "");
    descuento = parseInt(descuento);
    descuento = descuento / 100;
    precio = precio * descuento;
  } else {
    descuento = parseFloat(descuento);
    precio = precio - descuento;
  }
  var total = cantidad * precio;
  document.getElementById("preTotal").value = total;
}

/* ==========
  arreglo para el carrito
  ============= */
var arregloCarrito = [];
var listaDetalle = document.getElementById("listaDetalle");
function agregarCarrito() {
  let actEconomica = document.getElementById("actEconomica").value;

  let codProducto = document.getElementById("codProducto").value;
  let conceptoPro = document.getElementById("conceptoPro").value;
  let uniMedida = document.getElementById("uniMedida").value;
  let cantProducto = parseInt(document.getElementById("cantProducto").value);
  let preUnitario = document.getElementById("preUnitario").value;
  let descProducto = parseFloat(document.getElementById("descProducto").value);
  let preTotal = parseFloat(document.getElementById("preTotal").value);

  let codProductoSin = parseInt(
    document.getElementById("codProductoSin").value
  );
  let uniMedidaSin = parseInt(document.getElementById("uniMedidaSin").value);

  let obj = {
    actividadEconomica: actEconomica,
    codigoProductoSin: codProductoSin,
    codigoProducto: codProducto,
    descripcion: conceptoPro,
    cantidad: cantProducto,
    unidadMedida: uniMedida,
    unidadMedidaSin: uniMedidaSin,
    precioUnitario: preUnitario,
    montoDescuento: descProducto,
    subTotal: preTotal,
  };
  console.log(obj);
  arregloCarrito.push(obj);
  dibujarTablaCarrito();




  /* =====
  vaciar el formulario de carrito
  ===== */
  
  document.getElementById("codProducto").value="";
  document.getElementById("conceptoPro").value="";
  document.getElementById("uniMedida").value="";
  document.getElementById("cantProducto").value="0";
  document.getElementById("preUnitario").value="";
  document.getElementById("descProducto").value="0.0";
  document.getElementById("preTotal").value="0.0";
}

function dibujarTablaCarrito() {
  listaDetalle.innerHTML = "";
  arregloCarrito.forEach((detalle) => {
    let fila = document.createElement("tr");
    fila.innerHTML = `
    <td>${detalle.descripcion}</td>
    <td>${detalle.cantidad}</td>
    <td>${detalle.precioUnitario}</td>
    <td>${detalle.montoDescuento}</td>
    <td>${detalle.subTotal}</td>
    `;

    let tdEliminar = document.createElement("td");
    let btnEliminar = document.createElement("button");
    btnEliminar.className = "btn btn-danger";
    btnEliminar.innerHTML = "<i class='fas fa-trash-alt'></i>";
    btnEliminar.onclick = function () {
      eliminarDetalle(detalle.codigoProducto);
    };
    tdEliminar.appendChild(btnEliminar);
    fila.appendChild(tdEliminar);
    listaDetalle.appendChild(fila);
  });
}

function eliminarDetalle(codigoProducto) {
  arregloCarrito = arregloCarrito.filter((detalle) => {
    if (detalle.codigoProducto != codigoProducto) {
      return detalle;
    }
  });
  dibujarTablaCarrito();
}
