window.addEventListener("load", function () {
  let colorCambiado = false; // Variable para rastrear el estado del color

  document
    .getElementById("btn-cambiar-colores")
    .addEventListener("click", botonColores);
  document
    .getElementById("btn-agregar-artista")
    .addEventListener("click", agregarArtista);

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

  function agregarArtista() {
    // Supongamos que el ID del select es "artistas-expo"
    const select = document.getElementById("artistas-expo");
    let nombre = document.getElementById("nombre-artista").value;
    let edad = parseInt(document.getElementById("edad-artista").value);
    let estilo = document.getElementById("estilo-artista").value;
    // Crear un nuevo elemento <option>
    const nuevaOpcion = document.createElement("option");
    nuevaOpcion.text = nombre; // El texto que se mostrará

    // Agregar el nuevo <option> al <select>
    select.add(nuevaOpcion);

    const nuevoArtista = new artista(nombre, edad, estilo);
    sistema.listaArtista.push(nuevoArtista);

    let form = document.getElementById("form-artista");
    if (form.reportValidity()) {
      form.submit();
      
    }
  }

  function agregarExposicion() {
    const select = document.getElementById("artistas-expo2");
    let titulo = document.getElementById("titulo-expo").value;
    let fecha = parseInt(document.getElementById("fecha-expo").value);
    let descripcion = document.getElementById("descripcion-expo").value;
    let artistaSeleccionado = select.value;

    // Buscar el artista seleccionado en el array de artistas
    let artistaEncontrado = sistema.listaArtista.find(
      (artista) => artista.nombre === artistaSeleccionado
    );

    // Crear nueva exposición con el artista encontrado
    const nuevaExposicion = new exposicion(titulo, fecha, descripcion);

    // Agregar la exposición a la lista de exposiciones
    listaExposicion.push(nuevaExposicion);
  }
});
