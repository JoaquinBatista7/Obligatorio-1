window.addEventListener("DOMContentLoaded", function () {

    let isColorChanged = false; // Variable para rastrear el estado del color
    let artistas = [nombre]


    document.getElementById("btn-cambiar-colores").addEventListener("click", botonColores);
    document.getElementById("btn-agregar-artista").addEventListener("click", agregarArtista);



    function botonColores() {

        // Color que se usará
        const newColor = '#8DB58E';
        const originalColor = '#98FC98';

        document.getElementById("encabezado").style.backgroundColor = isColorChanged ? originalColor : newColor;
        document.getElementById("seccion-ingresos").style.backgroundColor = isColorChanged ? originalColor : newColor;
        document.getElementById("seccion-informacion-general").style.backgroundColor = isColorChanged ? originalColor : newColor;



        // Alternar el estado
        isColorChanged = !isColorChanged; // Cambiar el estado
    }


    function agregarArtista() {

        // Supongamos que el ID del select es "artistas-expo"
        const select = document.getElementById("artistas-expo");
        const nombre = document.getElementById("nombre-artista").value;
       
        // Crear un nuevo elemento <option>
        const nuevaOpcion = document.createElement("option");
        nuevaOpcion.text = nombre; // El texto que se mostrará

        // Agregar el nuevo <option> al <select>
        select.add(nuevaOpcion);

    }



});