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
    const select = document.getElementById("artistas-expo");
    let nombre = document.getElementById("nombre-artista").value;
    let edad = parseInt(document.getElementById("edad-artista").value);
    let estilo = document.getElementById("estilo-artista").value;

    if(sistema.existePersona(nombre)){

      alert("El artista ya existe");
    }else{
      sistema.agregarArtista(nombre, edad, estilo);
    }

    console.log(nombre, edad, estilo);
    form.reset();
    }
    
  }

 /*Este e un ejemplo de cargar tabla pero lo tengo que ajustar a lo que yo necesito agregar
  function cargarTabla() {  
    let listaTabla = sistema.obtenerPersonas();

    let texto = "";

    for (let i = 0; i < lista.length; i++) {
      let obj = lista[i];
      texto += `<tr>
                  <td>${obj.nombre}</td>
                  <td>${obj.edad}</td>
                  <td>${obj.estilo}</td>
                </tr>`;       
    }

    document.getElementById("tabla-artistas").innerHTML = texto;

  } */

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
}
