// Aplicar estilos dinámicos al fondo y botones
document.addEventListener("DOMContentLoaded", () => {
    // Cambiar la imagen de fondo para usar la imagen local
    document.body.style.backgroundImage = "url('assets/Amistad.jpg')"; // Ruta local a la imagen
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundAttachment = "fixed";

    // Estilizar los botones
    document.querySelectorAll("button").forEach(button => {
        button.style.backgroundColor = "#ff6347";
        button.style.color = "white";
        button.style.border = "none";
        button.style.padding = "10px 20px";
        button.style.margin = "10px";
        button.style.cursor = "pointer";
        button.style.borderRadius = "5px";
        button.style.fontSize = "16px";

        button.addEventListener("mouseover", () => {
            button.style.backgroundColor = "#ff4500";
        });

        button.addEventListener("mouseout", () => {
            button.style.backgroundColor = "#ff6347";
        });
    });
});
// Array para almacenar los participantes
let participantes = [];

// Función para agregar un participante
function agregarParticipante() {
    const nombreInput = document.getElementById("nombre");
    const nombre = nombreInput.value.trim();
    
    if (nombre && !participantes.includes(nombre)) {
        participantes.push(nombre);
        actualizarLista();
        nombreInput.value = "";
    } else {
        alert("Nombre inválido o ya ingresado.");
    }
}

// Función para actualizar la lista de participantes en la interfaz
// Función para actualizar la lista de participantes en la interfaz
function actualizarLista() {
    const lista = document.getElementById("lista-participantes");
    lista.innerHTML = ""; // Limpia la lista actual

    participantes.forEach((nombre, index) => {
        const item = document.createElement("li");
        const texto = document.createElement("span");
        texto.textContent = nombre;

        const botonEliminar = document.createElement("button");
        botonEliminar.innerHTML = `<img src="assets/Eliminar.png" alt="Eliminar" class="icono">`;
        botonEliminar.classList.add("eliminar-btn");
        botonEliminar.onclick = () => eliminarParticipante(index);

        item.appendChild(texto);
        item.appendChild(botonEliminar);
        lista.appendChild(item);
    });
}

// Función para eliminar un participante
function eliminarParticipante(index) {
    participantes.splice(index, 1); // Elimina el participante del array
    actualizarLista(); // Refresca la lista
}

function refrescarPantalla() {
    location.reload(); // Recarga la página
}

// Función para sortear los amigos secretos
function sortearAmigoSecreto() {
    if (participantes.length < 2) {
        alert("Se necesitan al menos 2 participantes.");
        return;
    }
    
    let asignaciones = {};
    let disponibles = [...participantes];
    
    for (let participante of participantes) {
        let posibles = disponibles.filter(p => p !== participante);
        if (posibles.length === 0) {
            alert("No se puede completar el sorteo. Inténtalo de nuevo.");
            return;
        }
        let elegido = posibles[Math.floor(Math.random() * posibles.length)];
        asignaciones[participante] = elegido;
        disponibles = disponibles.filter(p => p !== elegido);
    }
    
    mostrarResultado(asignaciones);
}

// Función para mostrar los resultados del sorteo
// Función para mostrar los resultados del sorteo en una tabla
function mostrarResultado(asignaciones) {
    const tablaBody = document.querySelector("#resultado-tabla tbody");
    tablaBody.innerHTML = ""; // Limpia los resultados anteriores

    for (let [participante, amigo] of Object.entries(asignaciones)) {
        const fila = document.createElement("tr");
        const celdaParticipante = document.createElement("td");
        const celdaAmigo = document.createElement("td");

        celdaParticipante.textContent = participante;
        celdaAmigo.textContent = amigo;

        fila.appendChild(celdaParticipante);
        fila.appendChild(celdaAmigo);
        tablaBody.appendChild(fila);
    }
}
