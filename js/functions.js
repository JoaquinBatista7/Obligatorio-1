window.addEventListener("load", setup);
let sistema = new Sistema();

function setup() {

    let colorCambiado = false; // Variable para rastrear el estado del color

    // Eventos para los botones
    document.getElementById("btn-cambiar-colores").addEventListener("click", botonColores);
    document.getElementById("btn-agregar-artista").addEventListener("click", agregarArtistaBoton);
    document.getElementById("btn-agregar-artistas").addEventListener("click", function() {
        moverArtistas("artistas-expo", "artistas-expo2");
    });
    document.getElementById("btn-remover-artistas").addEventListener("click", function() {
        moverArtistas("artistas-expo2", "artistas-expo");
    });
    document.getElementById("btn-agregar-expo").addEventListener("click", agregarExpoBoton);
    document.getElementById("btn-agregar-comentario").addEventListener("click", agregarComentarioBoton);
    document.getElementById("selectexpo").addEventListener("change", filtrarComentariosPorExposicion);
    document.getElementById("orden-calificacion").addEventListener("click", alternarOrdenCalificacion);


    function botonColores() {
        // Colores a usar
        const newColor = "#8DB58E";
        const originalColor = "#98FC98";

        if (colorCambiado) {
            document.getElementById("encabezado").style.backgroundColor = originalColor;
            document.getElementById("seccion-ingresos").style.backgroundColor = originalColor;
            document.getElementById("seccion-informacion-general").style.backgroundColor = originalColor;
        } else {
            document.getElementById("encabezado").style.backgroundColor = newColor;
            document.getElementById("seccion-ingresos").style.backgroundColor = newColor;
            document.getElementById("seccion-informacion-general").style.backgroundColor = newColor;
        }

        // Alternar el estado
        colorCambiado = !colorCambiado;
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

        for (let i = 0; i < origen.options.length; i++) {
            if (origen.options[i].selected) {
                destino.add(origen.options[i]);
                i--; // Se baja el indice para no saltarse opciones
            }
        }

        ordenarSelectAlfabeticamente(destinoId);
    }


    function agregarExpoBoton() {
        let form = document.getElementById("form-expo");
        if (form.reportValidity()) {
            let titulo = document.getElementById("titulo-expo").value;
            let fecha = document.getElementById("fecha-expo").value;
            let descripcion = document.getElementById("descripcion-expo").value;
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
            actualizarInformacionGeneral();
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

           
            let radios = document.getElementsByName("calificacion");
            for (let i = 0; i < radios.length; i++) {
                if (radios[i].checked) {
                    calificacion = radios[i].value;
                    break;
                }
            }

           
            let nuevoComentario = new Visitas(
                exposicion,
                nombre,
                comentario,
                calificacion,
                guiada
            );

            sistema.visitas.push(nuevoComentario);

            form.reset(); 
            actualizarTablaComentarios(); 
         
            actualizarInformacionGeneral();
            restaurarSelectYActualizarTabla();
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
            botonAmpliar.className = "boton"; // Clase CSS para estilo 
            botonAmpliar.addEventListener("click", function() {
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

        if (ordenCalificacionCreciente) {
            botonOrden.textContent = "Calificación decreciente";
        } else {
            botonOrden.textContent = "Calificación creciente";
        }

    }
      
      


    function alternarOrdenCalificacion() {
        ordenCalificacionCreciente = !ordenCalificacionCreciente; // Cambiar el estado
        actualizarTablaComentarios(); // Actualizar la tabla con el nuevo orden
        if (ordenCalificacionCreciente) {
            botonOrden.textContent = "Calificación decreciente";
        } else {
            botonOrden.textContent = "Calificación creciente";
        }
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
        const tituloSeleccionado = selectExpo.value;
        const tabla = document
            .getElementById("tabla-comentarios")
            .getElementsByTagName("tbody")[0];
        tabla.innerHTML = "";

        for (let i = 0; i < sistema.visitas.length; i++) {
            let visita = sistema.visitas[i];


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
                botonAmpliar.className = "boton"; // Clase CSS para
                botonAmpliar.addEventListener("click", function() {
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

      
        filtrarComentariosPorExposicion();
    }

    function actualizarInformacionGeneral() {
      
        const listaExposicionesMasArtistas = document.getElementById("lista-mas-artistas");
        const listaExposicionesSinComentarios = document.getElementById("lista-sin-comentarios");

        // Limpiar listas anteriores
        listaExposicionesMasArtistas.innerHTML = "";
        listaExposicionesSinComentarios.innerHTML = "";

        // Calcular exposiciones con más artistas
        let maxArtistas = 0;
        let exposicionesMasArtistas = [];

        for (let i = 0; i < sistema.listaExpo.length; i++) {
            const exposicion = sistema.listaExpo[i];
            const numArtistas = exposicion.artistas.length;

            if (numArtistas > maxArtistas) {
                maxArtistas = numArtistas;
                exposicionesMasArtistas = [exposicion];
            } else if (numArtistas === maxArtistas) {
                exposicionesMasArtistas.push(exposicion);
            }
        }

        // Agregar las exposiciones con más artistas a la lista
        for (let i = 0; i < exposicionesMasArtistas.length; i++) {
            const li = document.createElement("li");
            li.textContent = exposicionesMasArtistas[i].titulo;
            listaExposicionesMasArtistas.appendChild(li);
        }

        // Calcular exposiciones sin comentarios
        let exposicionesSinComentarios = [];
        for (let i = 0; i < sistema.listaExpo.length; i++) {
            const exposicion = sistema.listaExpo[i];
            let tieneComentarios = false;

            for (let j = 0; j < sistema.visitas.length; j++) {
                if (sistema.visitas[j].exposicion.titulo === exposicion.titulo) {
                    tieneComentarios = true;
                    break;
                }
            }

            if (!tieneComentarios) {
                exposicionesSinComentarios.push(exposicion);
            }
        }

        // Ordenar exposiciones sin comentarios por fecha creciente
        for (let i = 0; i < exposicionesSinComentarios.length - 1; i++) {
            for (let j = 0; j < exposicionesSinComentarios.length - i - 1; j++) {
                const fechaA = new Date(exposicionesSinComentarios[j].fecha);
                const fechaB = new Date(exposicionesSinComentarios[j + 1].fecha);

                if (fechaA > fechaB) {
                    const temp = exposicionesSinComentarios[j];
                    exposicionesSinComentarios[j] = exposicionesSinComentarios[j + 1];
                    exposicionesSinComentarios[j + 1] = temp;
                }
            }
        }

        // Agregar las exposiciones sin comentarios a la lista
        for (let i = 0; i < exposicionesSinComentarios.length; i++) {
            const li = document.createElement("li");
            li.textContent = `${exposicionesSinComentarios[i].titulo} - ${exposicionesSinComentarios[i].fecha}`;
            listaExposicionesSinComentarios.appendChild(li);
        }
    }

}