//Obtenemos el email introducido y lo acortamos
const emailUser = localStorage.getItem("username");
var username = emailUser.slice(0, emailUser.lastIndexOf("@"));

//Sacamos la fecha almacenada de la última vez que visitó la
const fecha = localStorage.getItem("date");
if (username) {
  const saludo = document.getElementById("saludo");
  saludo.textContent = `Hola ${username}. Bienvendio de nuevo`;
}
if(fecha) {
  const ultimaSesion = document.getElementById("ultimaSesion");
  ultimaSesion.textContent = `No te veía desde ${fecha}`;
}

function mover() {
  window.location.href = "preguntas.html";
}
