function botonColores() {
    const sections = document.getElementsByTagName('section');
    const headers = document.getElementsByTagName('header');

    // Cambiar el color de fondo de todas las secciones
    for (let i = 0; i < sections.length; i++) {
        sections[i].style.backgroundColor = '#98FC98';
    }

  headers.style.backgroundColor = '#98FC98'
}

