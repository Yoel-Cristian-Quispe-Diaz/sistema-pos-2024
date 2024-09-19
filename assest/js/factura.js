/*====================
   variables globales
====================*/
var host = "http://localhost:5000/";
var codSistema = "775FA42BE90F7B78EF98F57";
var cuis = "9272DC05";
var nitEmpresa = 338794023;
var rsEmpresa = "NEOMAC SRL";
var telEmpresa = "9422560";
var dirEmpresa =
  "Calle Pucara 129 AVENIDA 7MO ANILLO NRO. 7550 ZONA/BARRIO: TIERRAS NUEVAS UV:0135 MZA:007";
var token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJTdXBlcmppY2hvMzMiLCJjb2RpZ29TaXN0ZW1hIjoiNzc1RkE0MkJFOTBGN0I3OEVGOThGNTciLCJuaXQiOiJINHNJQUFBQUFBQUFBRE0ydGpDM05ERXdNZ1lBOFFXMzNRa0FBQUE9IiwiaWQiOjYxODYwOCwiZXhwIjoxNzMzOTYxNjAwLCJpYXQiOjE3MDI0OTc2NjAsIm5pdERlbGVnYWRvIjozMzg3OTQwMjMsInN1YnNpc3RlbWEiOiJTRkUifQ.4K_pQUXnIhgI5ymmXoyL43i0pSk3uKCgLMkmQeyl67h7j55GSRsH120AD44pR0aQ1UX_FNYzWQBYrX6pWLd-1w";

var cufd;
var codControlCufd;
var fechaVigCufd;
var leyenda;

codigoActividad();

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
      if (data["email_cliente" == ""]) {
        document.getElementById("emailCliente").value = "";
      } else {
        document.getElementById("emailCliente").value = data["email_cliente"];
      }

      document.getElementById("rsCliente").value = data["razon_social_cliente"];
      document.getElementById("idCliente").value = data["id_cliente"]

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
      // console.log("Respuesta recibida:", data);
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
  let uniMedida = parseInt(document.getElementById("uniMedida").value);
  let cantProducto = parseInt(document.getElementById("cantProducto").value);
  let preUnitario = parseFloat(document.getElementById("preUnitario").value);
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

/*
funcion obtener CUFD
*/
function solicitudCufd() {
  return new Promise((resolve, reject)=>{
    var obj = {
      codigoAmbiente: 2,
      codigoModalidad: 2,
      codigoPuntoVenta: 0,
      codigoPuntoVentaSpecified: true,
      codigoSistema: codSistema,
      codigoSucursal: 0,
      nit: nitEmpresa,
      cuis: cuis,
    };
  
    $.ajax({
      type: "POST",
      url: host + "api/Codigos/solicitudCufd?token=" + token,
      data: JSON.stringify(obj),
      cache: false,
      contentType: "application/json",
      success: function (data) {
        console.log("soliciotud exito");
        cufd = data["codigo"];
        codControlCufd = data["codigoControl"];
        fechaVigCufd = data["fechaVigencia"];
  
        resolve(cufd);
      },
    });
  });
}

/*============
funcion registrar  CUFD 
============*/
function registrarNuevoCufd() {
  solicitudCufd().then(ok => {
    if (ok != ""  || ok!=null) {
      var obj = {
        cufd: cufd,
        fechaVigCufd: fechaVigCufd,
        codControlCufd: codControlCufd,
      };

      $.ajax({
        type: "POST",
        data: obj,
        url: "controlador/facturaControlador.php?ctrNuevoCufd",
        cache: false,
        success: function (data) {
        console.log("registro exito");


        if (data == "ok") {
          $("#panelInfo").append(
            "<span class='text-primary'>CUFD registrado!!!</span><br>"
          );

          //para que los mensajes se vayan eliminado despues de 2 segundos
          setTimeout(() => {
            $("#panelInfo").empty().append(
              "<span class='text-success'>CUFD Vigente, puede facturar!!!</span><br>"
            );
          }, 3000);


        }else{
          $("#panelInfo").empty().append(
            "<span class='text-danger'>Error de conexión: " + error + "</span><br>"
          );
        }
        },
        error: function (xhr, status, error) {
        },
      });
    }
  });
}
/*============
funcion para verificar vigenciacufd
============*/
function verificarVigenciaCufd() {
  let date = new Date();
  var obj = "";
  $.ajax({
    type: "POST",
    url: "controlador/facturaControlador.php?ctrUltimoCufd",
    data: obj,
    cache: false,
    dataType: "json",
    success: function (data) {
/*       console.log("verificar exito");
      console.log(data); */

      let vigCufdActual = new Date(data["fecha_vigencia"]);
      if (date.getTime() > vigCufdActual.getTime() || data == false) {


        // agregar los mensajes y que despues de unos segundos se borren
        $("#panelInfo").append(
          "<span class='text-warning'>CUFD CADUCADO!!!</span><br>" +
          "<span>Registrando cufd...</span><br>"
        );
        setTimeout(() => {
          $("#panelInfo").empty(); 
        }, 3000);


        registrarNuevoCufd();
      } else {
        $("#panelInfo").append(
          "<span class='text-success'>CUFD Vigente, puede facturar!!!</span><br>"
        );
        cufd=data["codigo_cufd"]
        codControlCufd=data["codigo_control"]
        fechaVigCufd=data["fecha_vigencia"] 
      }
    },
  });
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


/*============
obtener las leyendas
=============== */
function extraerLeyenda(){
  var obj="";
  $.ajax({
    type: "POST",
    url: "controlador/facturaControlador.php?ctrLeyenda",
    data: obj,
    cache: false,
    dataType: "json",
    success: function (data) {
 
      leyenda=data[1];
    },
  });
  
}
/* ===============
Validar datos del formulario
============== */
function validarFormulario(){
  let numFactura = document.getElementById("numFactura").value;
  let nitCliente = document.getElementById("nitCliente").value;
  let rsCliente = document.getElementById("rsCliente").value;
  let emailCliente = document.getElementById("emailCliente").value;

// para todos los datos del formulario
if ( numFactura==null || numFactura.length==0 || nitCliente==null || nitCliente.length==0 || rsCliente==null || rsCliente.length==0 || emailCliente==null || emailCliente.length==0 ) {
  $("#panelInfo").before(
    "<span class='text-danger'>Faltan datos por completar!!!</span><br>"
  );
  return false;
}else{
  return true;
}

}




function emitirFactura() {
  /*   id_factura	cod_factura	id_cliente	detalle	neto	descuento	total	fecha_emision	cufd	cuf	xml	id_punto_venta	id_usuario	usuario	leyenda	 */
if(validarFormulario()==true){
  let date = new Date();
  let numFactura = parseInt(document.getElementById("numFactura").value);
  let fechaFactura = date.toISOString();
  let rsCliente = document.getElementById("rsCliente").value;
  let tpDocumento = parseInt(document.getElementById("tpDocumento").value);
  let nitCliente = document.getElementById("nitCliente").value;
  let metPago = parseInt(document.getElementById("metPago").value);
  let totAPagar = parseFloat(document.getElementById("totApagar").value);
  let descAdicional = parseFloat(
    document.getElementById("descAdicional").value
  );
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
    cufd: cufd,
    cuis: cuis,
    nit: nitEmpresa,
    tipoFacturaDocumento: 1,
    archivo: null,
    fechaEnvio: fechaFactura,
    hashArchivo: "",
    codigoControl: codControlCufd,
    factura: {
      cabecera: {
        nitEmisor: nitEmpresa,
        razonSocialEmisor: rsEmpresa,
        municipio: "Santa Cruz",
        telefono: telEmpresa,
        numeroFactura: numFactura,
        cuf: "String",
        cufd:cufd,
        codigoSucursal: 0,
        direccion: dirEmpresa,
        codigoPuntoVenta: 0,
        fechaEmision: fechaFactura,
        nombreRazonSocial: rsCliente,
        codigoTipoDocumentoIdentidad: tpDocumento,
        numeroDocumento: nitCliente,
        complemento: "",
        codigoCliente: nitCliente,
        codigoMetodoPago: metPago,
        numeroTarjeta: null,
        montoTotal: subTotal,
        montoTotalSujetoIva: totAPagar,
        codigoMoneda: 1,
        tipoCambio:1,
        montoTotalMoneda: totAPagar,
        montoGiftCard: 0,
        descuentoAdicional: descAdicional,
        codigoException: 0,
        cafc: null,
        leyenda: leyenda,
        usuario: usuarioLogin,
        codigoDocumentoSector: 1,
      },
      detalle: arregloCarrito,
    },
  };

  console.log(JSON.stringify(obj));
  $.ajax({
    type: "POST",
    url: host + "api/CompraVenta/recepcion",
    data: JSON.stringify(obj),
    cache: false,
    contentType: "application/json",
    processData: false,
    success: function (data) {
      console.log(data);
/*       document.getElementById("panelInfo").innerHTML =
          "<span class='text-success'>Factura emitida con exito!!!</span><br>"; */
          if(data["codigoResultado"]!=908){
            $("#panelInfo").before("<span class='text-danger'>ERROR FACTURA NO EMITIDA!!!</span><br>")
          }else{
            $("#panelInfo").before("<span>REGISTRANDO FACTURA...</span><br>")
            let datos={
              codigoResultado:data["codigoResultado"],
              codigoRecepcion:data["datoAdicional"]["codigoRecepcion"],
              cuf:data["datoAdicional"]["cuf"],
              sentDate:data["datoAdicional"]["sentDate"],
              xml:data["datoAdicional"]["xml"],
            }
            registrarFactura(datos)
          }

    },
    error: function (xhr, status, error) {
      console.error("Error en la solicitud:", status, error);
      console.error("Respuesta del servidor:", xhr.responseText);
      document.getElementById("panelInfo").innerHTML =
          "<span class='text-danger'>Factura no emitida !!!</span><br>";
    },
  });
}
}

/*==========
transformar fecha a  ISO 8601
==========*/
function transformarFecha(fechaISO){
  let fecha_iso=fechaISO.split("T")
  let hora_iso=fecha_iso[1].split(".")
  let fecha=fecha_iso[0]
  let hora=hora_iso[0]
  let fecha_hora=fecha+" "+hora
  return fecha_hora
}


/*==========
registrar factura en la base de datos
==========*/
function registrarFactura(datos){
  let numFactura=document.getElementById("numFactura").value
  let idCliente=document.getElementById("idCliente").value
  let subTotal=parseFloat(document.getElementById("subTotal").value)
  let descAdicional=parseFloat(document.getElementById("descAdicional").value)
  let totApagar=parseFloat(document.getElementById("totApagar").value)
  let fechaEmision=transformarFecha(datos["sentDate"])
  let idUsuario=document.getElementById("idUsuario").value
  let usuarioLogin=document.getElementById("usuarioLogin").innerHTML
  let obj={
    "codFactura":numFactura,
    "idCliente":idCliente,
    "detalle":JSON.stringify(arregloCarrito),
    "neto":subTotal,
    "descuento":descAdicional,
    "total":totApagar,
    "fechaEmision":fechaEmision,
    "cufd":cufd,
    "cuf":datos["cuf"],
    "xml":datos["xml"],
    "idUsuario":idUsuario,
    "usuario":usuarioLogin,
    "leyenda":leyenda
  }
  $.ajax({
    type:"POST",
    url:"controlador/facturaControlador.php?ctrRegistrarFactura",
    data:obj,
    cache:false,
    success:function(data){
      console.log(data)
      if(data="ok"){
        Swal.fire({
          icon:"success",
          showConfirmButton:false,
          title:"FACTURA REGISTRADA",
          timer:1000
        })
        setTimeout(function(){
          location.reload()
        }, 1000)
      }else{
        Swal.fire({
          icon:"error",
          showConfirmButton:false,
          title:"ERROR EN EL REGISTRO",
          timer:1500
        })
      }
    }
  })
}