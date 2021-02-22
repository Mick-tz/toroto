// const qs = require('qs')
import axios from 'axios'

export function getProyectos (context) {
    const url = `${process.env.APIROOT}/projects`
    context.commit('setStatusCargandoProyectos', true)
    axios.get(url).then(response => {
        context.commit('setProyectosFromBackend', response.data)
        context.commit('setStatusCargandoProyectos', false)
    }).catch(error => {
        console.log(error)
        context.commit('setStatusErrorCargaProyectos', true)
        context.commit('setStatusCargandoProyectos', false)
    })

}
