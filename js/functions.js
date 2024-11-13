window.addEventListener("load", setup);

function setup() {
  let sistema = new Sistema();
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
        return;
      }
      const select = document.getElementById("artistas-expo");
      let nuevaOpcion = document.createElement("option");
      nuevaOpcion.text = nombre;
      select.add(nuevaOpcion);
      sistema.agregarArtista(nombre, edad, estilo);
      form.reset();
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
      for (let i = 0; i < select.options.length; i++) {
        artistas.push(select.options[i].text);
        let nuevaOpcion = document.createElement("option");
        nuevaOpcion.text = select.options[i].text;
        document.getElementById("artistas-expo").add(nuevaOpcion);
        select.remove(i);
      }
      sistema.agregarExposicion(titulo, fecha, descripcion, artistas);
      let nuevaOpcion = document.createElement("option");
      nuevaOpcion.text = titulo;
      document.getElementById("expo-visita").add(nuevaOpcion);
      form.reset(); 
    }
  }

function agregarComentarioBoton(){

  
}


}
