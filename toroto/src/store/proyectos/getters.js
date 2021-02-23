export function getProyectos (state) {
    return state.proyectos
  }
  
  export const getProyectosPorEstado = (state) => (estado) => {
    console.log(estado)
    return state.proyectos.filter(proyecto => {
      return proyecto.location.toLowerCase().startsWith(estado.toLowerCase())
    })
  }

  export function getStatusCargandoProyectos (state) {
    return state.cargandoProyectos
  }
  
  export function getStatusErrorProyectos (state) {
    return state.errorCargaProyectos
  }
  