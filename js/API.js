class Api {
    async obtenerDatos() {
        //obtener datos desde la api
        const total = 10018
        const datos = await fetch(`https://api.datos.gob.mx/v1/precio.gasolina.publico`)
        const respuesta = await datos.json()

        return {
            respuesta
        }
    }
}