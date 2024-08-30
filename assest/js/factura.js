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
      success: function(data) {
          document.getElementById("numFactura").value = data;
          console.log("Respuesta recibida:", data); // Verifica que esta línea se esté ejecutando
      },
      error: function(xhr, status, error) {
          console.error("Error en la solicitud:", status, error); // Captura y muestra cualquier error
          console.error("Respuesta del servidor:", xhr.responseText); // Muestra la respuesta completa del servidor si hay un error
      }
  });
}



/* ==========
Rellenar datos de  Producto
========== */

function datosProducto(){
  let codProducto=document.getElementById("codProducto").value;
  var obj={
    codProducto:codProducto,
  };
  // console.log(obj);
  $.ajax({
    type:"POST",
    url:"controlador/productoControlador.php?ctrDatosProducto",
    data:obj,
    dataType:"json",
    success:function(data){
      console.log(data);
      document.getElementById("conceptoPro").value=data["nombre_producto"];
      document.getElementById("uniMedida").value=data["unidad_medida"];
      document.getElementById("preUnitario").value=data["precio_producto"];

    }
  });

  }
  function calculartotal(){
    var cantidad=document.getElementById("cantProducto").value;
    var precio=document.getElementById("preUnitario").value; 
    var descuento=document.getElementById("descProducto").value;
    cantidad=parseInt(cantidad);
    precio=parseFloat(precio);

/* =========
mi formulario tiene un campo de descuento que puede ser en porcentaje o en cantidad
========== */
    if (descuento.includes("%")){
      descuento=descuento.replace(/%/g,"");
      descuento=parseInt(descuento);
      descuento=descuento/100;
    precio=precio*descuento;
    }else{
      descuento=parseFloat(descuento);
    precio=precio-descuento;
    }
    var total=cantidad*precio;
    document.getElementById("preTotal").value=total;
  
  }



  /* ==========
  arreglo para el carrito
  ============= */
var arregloCarrito=[];
  function agregarCarrito(){
    var codProducto=document.getElementById("codProducto").value;
    var conceptoPro=document.getElementById("conceptoPro").value;
    var uniMedida=document.getElementById("uniMedida").value;
    var cantProducto=document.getElementById("cantProducto").value;
    var preUnitario=document.getElementById("preUnitario").value;
    var descProducto=document.getElementById("descProducto").value;
    var preTotal=document.getElementById("preTotal").value;

    var obj={
      codProducto:codProducto,
      conceptoPro:conceptoPro,
      uniMedida:uniMedida,
      cantProducto:cantProducto,
      preUnitario:preUnitario,
      descProducto:descProducto,
      preTotal:preTotal
    };
    arregloCarrito.push(obj);
    console.log(arregloCarrito);
    mostrarCarrito();

  }

