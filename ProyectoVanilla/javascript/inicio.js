//Funcion para aparecer inicio de sesión y eliminar el texto anterior
function changeStyle() {
  const header = document.getElementById("mensaje-inicio");
  header.remove();
  const form = document.getElementById("user");
  form.style.opacity = "1";
}

//Paso al inicio de sesión
document.addEventListener("keydown", function (e) {
  if (e.ctrlKey && e.key === "F10") {
    // Acción al pulsar Ctrl + F10
    changeStyle();
  }
});
var tempUser = setTimeout(() => changeStyle(), 5000);
//Pasamos a la siguiente página
const form = document.getElementById("user");
form.addEventListener("submit", function (e) {
  e.preventDefault(); //Evita que el submit recargue la página como hace de normal
  const emailUser = document.getElementById("email").value;
  localStorage.setItem("username", emailUser); //Almacenamos el email en el LocalStorage para usarlo más adelante
  localStorage.setItem("date", new Date().toLocaleString()); //Se almacena la fecha del momento en que se pulsa el botón
  mover();
});

function mover() {
  window.location.href = "saludo.html"; //Cambio de página
}


