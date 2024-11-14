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

class Visitas {
  constructor(exposicion, nombre, comentario, calificacion, guiada) {
    this.exposicion = exposicion;
    this.nombre = nombre;
    this.comentario = comentario;
    this.calificacion = calificacion;
    this.guiada = guiada;
  }
}

class Sistema {
  constructor() {
    this.listaArtista = [];
    this.listaExpo = [];
    this.visitas = [];
  }

  agregarExposicion(titulo, fecha, descripcion, nombresDeArtistas) {
    let artistas = [];
    for (let i = 0; i < nombresDeArtistas.length; i++) {
      let objArtista = this.obtenerArtistaNombre(nombresDeArtistas[i]);
      artistas.push(objArtista);
    }

    let nuevaExpo = new Exposicion(titulo, fecha, descripcion, artistas);
    this.listaExpo.push(nuevaExpo);
  }

  agregarArtista(nombre, edad, estilo) {
    let nuevoArtista = new Artista(nombre, edad, estilo);
    this.listaArtista.push(nuevoArtista);
  }

  agregarComentario(exposicion, nombre, comentario, calificacion, guiada) {
    let objexposicion;

    for (let i = 0; i < this.listaExpo.length; i++) {
      if (this.listaExpo.titulo === exposicion) {
        objexposicion = this.listaExpo.titulo;
      }

      let nuevoComentario = new Visitas(
        exposicion,
        nombre,
        comentario,
        calificacion,
        guiada
      );
      this.visitas.push(nuevoComentario);
    }
  }

  existeArtista(nombre) {
    for (let i = 0; i < this.listaArtista.length; i++) {
      if (this.listaArtista[i].nombre === nombre) {
        return true;
      }
    }
    return false;
  }

  obtenerArtistaNombre(nombre) {
    let resultado = null;
    for (let i = 0; i < this.listaArtista.length; i++) {
      if (this.listaArtista[i].nombre === nombre) {
        resultado = this.listaArtista[i];
      }
    }
    return resultado;
  }
}
