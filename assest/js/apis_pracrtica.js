/* =================
Api de dragon ball
================== */

function apiDragonBallNames() {
    $.ajax({
    type: "GET",
    url: "https://dragonball-api.com/api/characters",
    success: function (data) {
      var list = document.getElementById("imagenId");
      var div=document.getElementById("contenedorImagen");
      data.items.forEach(function (element) {
/*         var option = document.createElement("option");
        option.value = element["id"];
        option.textContent = element["name"];
        list.appendChild(option); */


        var divImagen=document.createElement("div");
        var imagen=document.createElement("img");
        var info=document.createElement("p");
        info.innerHTML="Nombre: "+element["name"]+"<br> Ki: "+element["ki"]+" <br>MaxKi: "+element["maxKi"]+" <br>Raza: "+element["race"]+"<br> Genero: "+element["gender"];
        imagen.src=element["image"];
        imagen.style.height="200px";



        divImagen.appendChild(imagen);
        divImagen.appendChild(info);
        divImagen.style.display="inline-block";
        divImagen.style.width="180px";
        divImagen.style.margin="10px";


        div.appendChild(divImagen);



    });
    },
  });
}
apiDragonBallNames();



function apiDragonBallMostrar() {
  var id = document.getElementById("idImagen").value;
  $.ajax({
    type: "GET",
    url: "https://dragonball-api.com/api/characters/" + id,
    success: function (data) {
      console.log(data);
      document.getElementById("imagenPersonaje").src = data["image"];/*  */
    },
    })
}