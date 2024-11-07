
  class Artista {
    constructor(nombre, edad, estilo) {
      this.nombre = nombre;
      this.edad = edad;
      this.estilo = estilo;
    }
  }

  class Exposicion {
    constructor(titulo, fecha, descripcion, artista, a) {
      this.titulo = titulo;
      this.titulo = fecha;
      this.descripcion = descripcion;
      this.artistas = [];
    }
  }

  class Sistema {
    constructor() {
      this.listaArtista = [];
      this.listaExpo = [];
      this.visitas = [];
    }



    agregarArtista(nombre, edad, estilo) {
      let nuevoArtista = new Artista(nombre, edad, estilo);
      this.listaArtista.push(nuevoArtista);
      const select = document.getElementById("artistas-expo");
      let nuevaOpcion = document.createElement("option");
      nuevaOpcion.text = nombre;
      select.add(nuevaOpcion);
    }

    existeArtista(nombre) {
      for (let i = 0; i < this.listaArtista.length; i++) {
        if (this.listaArtista[i].nombre === nombre) {
          return true;
        }
      }
      return false;
    }

    obtenerPersonas() { 
      return this.listaArtista; 
    }
  }

