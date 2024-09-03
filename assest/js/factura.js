/*====================
   variables globales
====================*/
var host = "http://localhost:5000/";
var codSistema = "775FA42BE90F7B78EF98F8F57";
var cuis = "9272DC05";
var nitEmpresa = 338794023;
var rsEmpresa = "NEOMAC SRL";
var telEmpresa = "79422560";
var dirEmpresa =
  "Calle Pucara 129 AVENIDA 7MO ANILLO NRO. 7550 ZONA/BARRIO: TIERRAS NUEVAS UV: 0135 MZA: 007";
var token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJTdXBlcmYyhvMzMiLcjJbZ29TaxNOZW1hIjoINzc1RkE0MkJFOTBGN0I3OEY0bGNTciLCJuaXQiOjIINNHQUFBQUFBQURE0ydG9DM05ERXdNZ1lBOFFXMzNRa0FBQU E9IiwiaWQiOjYxODYwOciZxhWJoxMzNZOTYxNjAwLCJpYXQiOjE3MDI0Tc2NjAsIJ msJniNnNpC3rlbWEiOjJTRkUiFQ.4k_pQUXnIhgI5ymmXoyL43i0pSk3uKCgLMkmQ UX_FNYZWQBYrX6pWld-1w";

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
      var codigosActiviades = document.getElementById("actEconomica");
      for (var i = 0; i < data["listaCodigos"].length; i++) {
        var option = document.createElement("option");
        option.value = data["listaCodigos"][i]["codigoActividad"];
        option.textContent = data["listaCodigos"][i]["codigoActividad"];
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
      numFactura();
    },
  });
}

/* ===========
generar numero de factura
=========== */
function numFactura() {
  let obj = "";

  $.ajax({
    type: "POST",
    url: "controlador/facturaControlador.php?ctrNumFactura",
    data: obj,
    success: function (data) {
      document.getElementById("numFactura").value = data;
      console.log("Respuesta recibida:", data);
    },
    error: function (xhr, status, error) {
      console.error("Error en la solicitud:", status, error);
      console.error("Respuesta del servidor:", xhr.responseText);
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

  document.getElementById("codProducto").value = "";
  document.getElementById("conceptoPro").value = "";
  document.getElementById("uniMedida").value = "";
  document.getElementById("cantProducto").value = "0";
  document.getElementById("preUnitario").value = "";
  document.getElementById("descProducto").value = "0.0";
  document.getElementById("preTotal").value = "0.0";
}

function carritoTotal() {
  let totalCarrito = 0;
  for (var i = 0; i < arregloCarrito.length; i++) {
    totalCarrito += parseFloat(arregloCarrito[i].subTotal);
  }
  document.getElementById("subTotal").value = totalCarrito;
  let descuentoTotal = parseFloat(
    document.getElementById("descAdicional").value
  );
  let totApagar = totalCarrito - descuentoTotal;
  document.getElementById("totApagar").value = totApagar;
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
  carritoTotal();
}

function eliminarDetalle(codigoProducto) {
  arregloCarrito = arregloCarrito.filter((detalle) => {
    if (detalle.codigoProducto != codigoProducto) {
      return detalle;
    }
  });
  dibujarTablaCarrito();
}

function emitirFactura() {
  /*   id_factura	cod_factura	id_cliente	detalle	neto	descuento	total	fecha_emision	cufd	cuf	xml	id_punto_venta	id_usuario	usuario	leyenda	 */
  let date = new Date();
  let numFactura = parseInt(document.getElementById("numFactura").value);
  let fechaFactura = date.toISOString();
  let rsCliente = document.getElementById("rsCliente").value;
  let tpDocumento = parseInt(document.getElementById("tpDocumento").value);
  let nitCliente = document.getElementById("nitCliente").value;
  let metPago = parseInt(document.getElementById("metPago").value);
  let totAPagar = parseFloat(document.getElementById("totApagar").value);
  let descAdicional = parseFloat(document.getElementById("descAdicional").value);
  let subTotal = parseFloat(document.getElementById("subTotal").value);
  let usuarioLogin = document.getElementById("usuarioLogin").innerHTML;

  let actEconomica = document.getElementById("actEconomica").value;
  let emailCliente = document.getElementById("emailCliente").value;

  var obj = {
    codigoAmbiente: 2,
    codigoDocumentoSector: 1,
    codigoEmision: 1,
    codigoModalidad: 2,
    codigoPuntoVenta: 0,
    codigoPuntoVentaSpecified: true,
    codigoSistema: codSistema,
    codigoSucursal: 0,
    cufd: "",
    cuis: cuis,
    nit: nitEmpresa,
    tipoFacturaDocumento: 1,
    archivo: null,
    fechaEnvio: fechaFactura,
    hashArchivo: "",
    codigoControl: "",
    factura: {
      cabecera: {
        nitEmisor: nitEmpresa,
        razonSocialEmisor: rsEmpresa,
        municipio: "Santa Cruz",
        telefono: telEmpresa,
        numeroFactura: numFactura,
        cuf: "String",
        cufd: "",
        codigoSucursal: 0,
        direccion: dirEmpresa,
        codigoPuntoVenta: 0,
        fechaEmision: fechaFactura,
        nombreRazonSocial: rsCliente,
      },
      detalle: {},
    },
  };


  console.log(obj);
  
}
