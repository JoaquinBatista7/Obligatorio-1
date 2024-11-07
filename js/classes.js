
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

    comprobarArtista(nombre, edad, estilo) {
      
    }

    agregarArtista(nombre, edad, estilo) {
      let nuevoArtista = new artista(nombre, edad, estilo);
      this.listaArtista.push(nuevoArtista);
      const select = document.getElementById("artistas-expo");
      let nuevaOpcion = document.createElement("option");
      nuevaOpcion.text = nombre;
      select.add(nuevaOpcion);
    }

    existePersona(nombre) {
      let existe = false;
      for(let i = 0; i < this.listaArtista.length && !existe; i++){
        let objArtista = this.listaArtista[i];
        if(objArtista.nombre === nombre){
          existe = true;
        }
      }
      return existe;

    }


  }

