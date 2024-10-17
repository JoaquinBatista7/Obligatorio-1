

  function botonColores() {
    const headers = document.getElementsByTagName("header");
    const sections = document.getElementsByTagName("section");

    // Cambiar el color de fondo de todos los elementos <header>
    for (let i = 0; i < headers.length; i++) {
        headers[i].style.backgroundColor = '#8DB58E';
    }

    // Cambiar el color de fondo de todos los elementos <section>
    for (let i = 0; i < sections.length; i++) {
        sections[i].style.backgroundColor = '#8DB58E';
    }
}




