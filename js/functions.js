window.addEventListener("load", setup);
let sistema = new Sistema();
function setup() {
  let colorCambiado = false; // Variable para rastrear el estado del color

  document
    .getElementById("btn-cambiar-colores")
    .addEventListener("click", botonColores);
  document
    .getElementById("btn-agregar-artista")
    .addEventListener("click", agregarArtistaBoton);
  document
    .getElementById("btn-agregar-artistas")
    .addEventListener("click", function () {
      moverArtistas("artistas-expo", "artistas-expo2");
    });
  document
    .getElementById("btn-remover-artistas")
    .addEventListener("click", function () {
      moverArtistas("artistas-expo2", "artistas-expo");
    });
  document
    .getElementById("btn-agregar-expo")
    .addEventListener("click", agregarExpoBoton);

  document
    .getElementById("btn-agregar-comentario")
    .addEventListener("click", agregarComentarioBoton);

  document
    .getElementById("selectexpo")
    .addEventListener("change", filtrarComentariosPorExposicion);

  document
    .getElementById("orden-calificacion")
    .addEventListener("click", alternarOrdenCalificacion);

  function botonColores() {
    // Color que se usará
    const newColor = "#8DB58E";

    const originalColor = "#98FC98";

    // Cambiar el color según el estado actual de colorCambiado
    document.getElementById("encabezado").style.backgroundColor = colorCambiado
      ? originalColor
      : newColor;
    document.getElementById("seccion-ingresos").style.backgroundColor =
      colorCambiado ? originalColor : newColor;
    document.getElementById(
      "seccion-informacion-general"
    ).style.backgroundColor = colorCambiado ? originalColor : newColor;

    // Alternar el estado
    colorCambiado = !colorCambiado; // Cambiar el estado
  }

  function agregarArtistaBoton() {
    let form = document.getElementById("form-artistas");
    if (form.reportValidity()) {
      let nombre = document.getElementById("nombre-artista").value;
      let edad = parseInt(document.getElementById("edad-artista").value);
      let estilo = document.getElementById("estilo-artista").value;

      if (sistema.existeArtista(nombre)) {
        alert("El artista ya está en la lista.");
      } else {
        const select = document.getElementById("artistas-expo");
        let nuevaOpcion = document.createElement("option");
        nuevaOpcion.text = nombre;
        select.add(nuevaOpcion);
        ordenarSelectAlfabeticamente("artistas-expo");
        sistema.agregarArtista(nombre, edad, estilo);
        form.reset();
      }
    }
  }
  function moverArtistas(origenId, destinoId) {
    let origen = document.getElementById(origenId);
    let destino = document.getElementById(destinoId);

    let opcionesSeleccionadas = [];
    for (let i = 0; i < origen.options.length; i++) {
      if (origen.options[i].selected) {
        opcionesSeleccionadas.push(origen.options[i]);
      }
    }

    opcionesSeleccionadas.forEach((option) => {
      destino.add(option);
    });
    ordenarSelectAlfabeticamente(destinoId);
  }

  function agregarExpoBoton() {
    let form = document.getElementById("form-expo");
    if (form.reportValidity()) {
      let titulo = document.getElementById("titulo-expo").value;
      let fecha = document.getElementById("fecha-expo").value;
      let descripcion = document.getElementById("descripcion-expo").value;

      //crear array de artista seleccionados para la exposicion y mover los option al expo-1 y eliminarlos del expo 2
      let artistas = [];
      let select = document.getElementById("artistas-expo2");
      for (let i = 0; i < select.options.length; i = i) {
        artistas.push(select.options[i].text);
        let nuevaOpcion = document.createElement("option");
        nuevaOpcion.text = select.options[i].text;
        document.getElementById("artistas-expo").add(nuevaOpcion);
        select.remove(i);
      }
      sistema.agregarExposicion(titulo, fecha, descripcion, artistas);
      actualizarSelectsExposiciones();
      form.reset();
    }
  }

  function agregarComentarioBoton() {
    let form = document.getElementById("form-comentario");
    if (form.reportValidity()) {
      let exposicionTitulo = document.getElementById("expo-visita").value;
      let exposicion = sistema.obtenerExposicionTitulo(exposicionTitulo);

      let nombre = document.getElementById("nombre-visitante").value;
      let comentario = document.getElementById("comentario").value;
      let calificacion = 1;
      let guiada = document.getElementById("visita-guiada").checked;

      // Obtener calificación seleccionada
      let radios = document.getElementsByName("calificacion");
      for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
          calificacion = radios[i].value;
          break;
        }
      }

      // Crear el comentario una sola vez
      let nuevoComentario = new Visitas(
        exposicion,
        nombre,
        comentario,
        calificacion,
        guiada
      );

      // Agregar el comentario al sistema
      sistema.visitas.push(nuevoComentario);

      form.reset(); // Limpia el formulario
      actualizarTablaComentarios(); // Actualiza la tabla
    }
  }

  function ordenarSelectAlfabeticamente(selectId) {
    let select = document.getElementById(selectId);
    let options = select.options;
    let arr = [];
    for (let i = 0; i < options.length; i++) {
      arr.push(options[i].text);
    }
    arr.sort();
    for (let i = 0; i < arr.length; i++) {
      options[i].text = arr[i];
    }
  }

  let ordenCalificacionCreciente = false; // Estado inicial del orden

function actualizarTablaComentarios() {
    const tabla = document
        .getElementById("tabla-comentarios")
        .getElementsByTagName("tbody")[0];
    tabla.innerHTML = ""; // Limpia la tabla

    // Ordenar las visitas según el estado actual (creciente o decreciente)
    let visitasOrdenadas = [...sistema.visitas];
    if (ordenCalificacionCreciente) {
        visitasOrdenadas.sort((a, b) => a.calificacion - b.calificacion); // Orden creciente
    } else {
        visitasOrdenadas.sort((a, b) => b.calificacion - a.calificacion); // Orden decreciente
    }

    for (let i = 0; i < visitasOrdenadas.length; i++) {
        let visita = visitasOrdenadas[i];
        let fila = tabla.insertRow();

        // Crear celdas con contenido
        fila.insertCell().textContent = visita.exposicion.titulo;

        let celdaBoton = fila.insertCell();
        let botonAmpliar = document.createElement("button");
        botonAmpliar.textContent = "Ampliar";
        botonAmpliar.className = "boton"; // Clase CSS para estilo consistente
        botonAmpliar.addEventListener("click", function () {
            mostrarDetallesComentario(visita);
        });
        celdaBoton.appendChild(botonAmpliar);

        fila.insertCell().textContent = visita.nombre;
        fila.insertCell().textContent = visita.comentario;

        let celdaGuiada = fila.insertCell();
        celdaGuiada.textContent = visita.guiada ? "Sí" : "No";

        let celdaCalificacion = fila.insertCell();
        let imgCalificacion = document.createElement("img");
        imgCalificacion.src = `img/${visita.calificacion}.png`;
        imgCalificacion.alt = `${visita.calificacion} estrellas`;
        celdaCalificacion.appendChild(imgCalificacion);
    }

    // Actualizar el texto del botón según el estado actual
    const botonOrden = document.getElementById("orden-calificacion");
    botonOrden.textContent = ordenCalificacionCreciente
        ? "Calificación decreciente"
        : "Calificación creciente";
}


  function alternarOrdenCalificacion() {
    ordenCalificacionCreciente = !ordenCalificacionCreciente; // Cambiar el estado
    actualizarTablaComentarios(); // Actualizar la tabla con el nuevo orden
  }

  function mostrarDetallesComentario(visita) {
    let artistas = "";
    for (let i = 0; i < visita.exposicion.artistas.length; i++) {
      artistas += visita.exposicion.artistas[i].toString() + "\n";
    }

    // Mostrar detalles en formato solicitado
    alert(
      "Información de la exposición:\n" +
        `Fecha: ${visita.exposicion.fecha}\n` +
        `Descripción: ${visita.exposicion.descripcion}\n` +
        `Artistas:\n${artistas}`
    );
  }

  function actualizarSelectsExposiciones() {
    // Referencias a los selects
    const selectComentarios = document.getElementById("expo-visita");
    const selectTabla = document.getElementById("selectexpo");

    // Limpiar las opciones actuales
    selectComentarios.innerHTML = "";
    selectTabla.innerHTML = "<option value=''>Todas</option>"; // "Todas" para el select de la tabla

    // Recorrer las exposiciones del sistema
    for (let i = 0; i < sistema.listaExpo.length; i++) {
      const exposicion = sistema.listaExpo[i];

      // Crear nueva opción para cada exposición
      const opcionComentarios = document.createElement("option");
      opcionComentarios.value = exposicion.titulo;
      opcionComentarios.textContent = exposicion.titulo;

      const opcionTabla = opcionComentarios.cloneNode(true);

      // Agregar opciones a cada select
      selectComentarios.appendChild(opcionComentarios);
      selectTabla.appendChild(opcionTabla);
    }
  }

  function filtrarComentariosPorExposicion() {
    const selectExpo = document.getElementById("selectexpo");
    const tituloSeleccionado = selectExpo.value; // Obtener el valor seleccionado
    const tabla = document
      .getElementById("tabla-comentarios")
      .getElementsByTagName("tbody")[0];
    tabla.innerHTML = ""; // Limpia la tabla

    for (let i = 0; i < sistema.visitas.length; i++) {
      let visita = sistema.visitas[i];

      // Mostrar todas las exposiciones o filtrar por la seleccionada
      if (
        tituloSeleccionado === "" ||
        visita.exposicion.titulo === tituloSeleccionado
      ) {
        let fila = tabla.insertRow();

        // Crear celdas con contenido
        fila.insertCell().textContent = visita.exposicion.titulo;

        let celdaBoton = fila.insertCell();
        let botonAmpliar = document.createElement("button");
        botonAmpliar.textContent = "Ampliar";
        botonAmpliar.className = "boton"; // Clase CSS para estilo consistente
        botonAmpliar.addEventListener("click", function () {
          mostrarDetallesComentario(visita);
        });
        celdaBoton.appendChild(botonAmpliar);

        fila.insertCell().textContent = visita.nombre;
        fila.insertCell().textContent = visita.comentario;

        let celdaGuiada = fila.insertCell();
        celdaGuiada.textContent = visita.guiada ? "Sí" : "No";

        let celdaCalificacion = fila.insertCell();
        let imgCalificacion = document.createElement("img");
        imgCalificacion.src = `img/${visita.calificacion}.png`;
        imgCalificacion.alt = `${visita.calificacion} estrellas`;
        celdaCalificacion.appendChild(imgCalificacion);
      }
    }
  }

  function restaurarSelectYActualizarTabla() {
    const selectExpo = document.getElementById("selectexpo");

    // Restaurar a la opción "Todas"
    selectExpo.value = "";

    // Llamar a la función para filtrar y actualizar la tabla (mostrará todos los comentarios)
    filtrarComentariosPorExposicion();
  }
}
