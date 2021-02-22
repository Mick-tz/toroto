export function setProyectosFromBackend (state, proyectos) {
    console.log(proyectos)
    state.proyectos = proyectos
}

export function setStatusCargandoProyectos (state, status) {
    state.cargandoProyectos = status
}

export function setStatusErrorCargaProyectos (state, status) {
    state.errorCargaProyectos = status
}