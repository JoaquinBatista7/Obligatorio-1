class Artista {
  constructor(nombre, edad, estilo) {
    this.nombre = nombre;
    this.edad = edad;
    this.estilo = estilo;
  }
}

class Exposicion {
  constructor(titulo, fecha, descripcion, artistas) {
    this.titulo = titulo;
    this.fecha = fecha;
    this.descripcion = descripcion;
    this.artistas = artistas;
  }
}

class Sistema {
  constructor() {
    this.listaArtista = [];
    this.listaExpo = [];
    this.visitas = [];
  }

  agregarExposicion(titulo, fecha, descripcion, artistas) {
    let nuevaExpo = new Exposicion(titulo, fecha, descripcion, artistas);
    this.listaExpo.push(nuevaExpo);
  }

  agregarArtista(nombre, edad, estilo) {
    let nuevoArtista = new Artista(nombre, edad, estilo);
    this.listaArtista.push(nuevoArtista);
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
