const emailUser = localStorage.getItem("username");
var username = emailUser.slice(0, emailUser.lastIndexOf("@"));

const usuarios = [];

function agregarUsuario(nombre) {
  usuarios.push({
    nombre: nombre,
    preguntas: [],
  });
}

// Si no existe el usuario, lo agregamos
if (!usuarios.find((u) => u.nombre === username)) {
  agregarUsuario(username);
}

//Crear cookie para almacenar las preguntas
function setCookie(cookieName, cookieValue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}
//Acceder a una cookie
function getCookie(cookieName) {
  var name = cookieName + "=";
  var ca = document.cookie.split(";");
  //Busca de entre todas las cookies segun el nombre de usuario que tengamos y al que queramos acceder
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
//Guardar las preguntas
function guardarPreguntasEnCookie(preguntas) {
  setCookie(username, JSON.stringify(preguntas), 7); //Pasamos el array a string por el formato de las cookies
}

//Obtener todas las pregunatas
function cargarPreguntasDeCookie() {
  const data = getCookie(username);
  if (data !== "") {
    return JSON.parse(data);
  }
  return [];
}

//Inicializar preguntas
let preguntas = cargarPreguntasDeCookie();

//Crear las preguntas
function crearPregunta() {
  const texto = document.getElementById("pregunta").value;
  const valor = document.getElementById("verdadero").checked
    ? "Verdadero"
    : "Falso";
  const puntuacion = document.getElementById("puntuacion").value;

  let estado = "Guardando...";

  const p = {
    pregunta: texto,
    valor: valor,
    puntuacion: puntuacion,
    estado: estado,
  };

  preguntas.push(p);
  guardarPreguntasEnCookie(preguntas);
  actualizarTabla();

  //Cambiar estado tras 5 segundos
  setTimeout(() => {
    p.estado = "OK";
    guardarPreguntasEnCookie(preguntas);
    actualizarTabla();
  }, 5000);
}

function actualizarTabla() {
  const tabla = document.getElementById("tabla-preguntas");

  tabla.innerHTML = `
        <tr>
            <th>Pregunta</th>
            <th>Respuesta</th>
            <th>Puntuación</th>
            <th>Estado</th>
        </tr>
    `;

  preguntas.forEach((p) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
            <td>${p.pregunta}</td>
            <td>${p.valor}</td>
            <td>${p.puntuacion}</td>
            <td>${p.estado}</td>
        `;
    tabla.appendChild(fila);
  });
}

//Evitar que el formulario reinicie toda la página y solo resetee el formulario mismo
const form = document.getElementById("crear-preguntas");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  crearPregunta();
  form.reset();

  function mover() {
    window.location.href = "saludo.html";
  }
});
