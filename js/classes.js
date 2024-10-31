window.addEventListener("load", function () {
  class artista {
    constructor(nombre, edad, estilo) {
      this.nombre = nombre;
      this.edad = edad;
      this.estilo = estilo;
    }
  }

  class exposicion {
    constructor(titulo, fecha, descripcion, artista, a) {
      this.titulo = titulo;
      this.titulo = fecha;
      this.descripcion = descripcion;
      this.artistas = [];
    }
  }

  class sistema {
    constructor() {
      this.listaArtista = []
      this.listaExpo = [];
      this.visitas = [];
    }
  }
});
