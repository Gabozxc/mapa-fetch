class UI {
    constructor() {

        this.api = new Api()

        //Crear los markers con layergroup
        this.marcadores = new L.LayerGroup()

        // Iniciar el mapa
        this.mapa = this.inicializarMapa();

    }

    inicializarMapa() {
        // Inicializar y obtener la propiedad del mapa

        //longitud y latitud del pais        - y este es el pais
        const map = L.map('mapa').setView([19.390519, -99.3739778], 6);
        const enlaceMapa = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
        L.tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; ' + enlaceMapa + ' Contributors',
                maxZoom: 18,
            }).addTo(map);
        return map;

    }

    mostrarEstablecimientos() {

        this.api.obtenerDatos()
            .then(datos => {
                const resultado = datos.respuesta.results

                //ejecutar funcion para mostrar pines

                this.mostrarPines(resultado)

            })

    }

    mostrarPines(datos) {
        //funcion del mapa, limpiar marcadores
        this.marcadores.clearLayers()

        //recorrer establecimientos
        datos.forEach(dato => {

                //Destructuring
                const { calle, regular, premium, latitude, longitude, } = dato


                //crear popup
                const opcionesPopUp = L.popup()
                    .setContent(`
                       <p>Calle: ${calle}</p>
                       <p><b>Regular:</b>${regular}</p>
                       <p><b>premium:</b>${premium}</p>
                   `)
                    //agregar el PIN

                //una funcion que recibe como paramentro un array de latitud y longitud

                const marker = new L.marker([
                        parseFloat(latitude),
                        parseFloat(longitude)
                    ]).bindPopup(opcionesPopUp)
                    // mete los marcadores al layer



                this.marcadores.addLayer(marker)

            })
            //los marcadores se a;aden al mapa desde this.mapa que inicializa el mapa
        this.marcadores.addTo(this.mapa)
    }

    //buscador
    obtenerBusqueda(busqueda) {
        this.api.obtenerDatos()
            .then(datos => {
                //obtener todos los datos

                const resultados = datos.respuesta.results

                //Enviar el JSon y la busqueda para el filtrado

                this.filtrarBusqueda(resultados, busqueda)
            })
    }

    //filtra las sugerencias en base al input

    filtrarBusqueda(resultado, busqueda) {

        //filtrar con .filter
        const filtro = resultado.filter(filtro => filtro.calle.indexOf(busqueda) !== -1)


        //mostrar los pines
        this.mostrarPines(filtro)
    }
}