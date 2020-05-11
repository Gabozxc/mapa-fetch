const userInterfaz = new UI()

document.addEventListener('DOMContentLoaded', () => {
    userInterfaz.mostrarEstablecimientos()
})


//busqueda de establecimientos

const buscador = document.querySelector('#buscar input')

buscador.addEventListener('input', () => {
    if (buscador.value.length > 3) {
        //buscar api
        userInterfaz.obtenerBusqueda(buscador.value)
    } else {
        userInterfaz.mostrarEstablecimientos()
    }
})