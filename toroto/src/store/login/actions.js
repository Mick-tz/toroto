
export function login (context) {
    context.commit('setStatusCargandoLogin', true)
    setTimeout(() => {
            context.commit('setIsLoggedIn', true)
            context.commit('setStatusCargandoLogin', false)
        }, 1000)
}
