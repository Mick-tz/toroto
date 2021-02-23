<template>
    <q-footer class="bg-white" bordered v-if="$q.screen.lt.sm">
        <q-tabs
          class="text-grey-10"
          align="justify"
          indicator-color="transparent"
          active-color="primary"
        >
          <q-route-tab v-if="isLoggedIn"
            to="/proyectos"
            icon="eco"
            name="Proyectos"
            key="Proyectos"
          />
          <q-route-tab v-if="isLoggedIn"
            to="/"
            icon="analytics"
            name="Inicio"
            key="Inicio"
          />

          <q-route-tab v-if="!isLoggedIn"
            to = "/proyectos"
            icon="eco"
            name="Inicio"
            key="Inicio"
          />
          <q-route-tab v-if="!isLoggedIn"
            to="/"
            icon="analytics"
            name="Login"
            key="Login"
          />
        </q-tabs>
    </q-footer>
</template>

<script>
export default {
  name: 'MobileFooter',
  data() {
    return {
      isLoggedIn: false,
      login: this.$store.getters['login/getLogin'],
      username: ''
    }
  },
  methods: {
    showLogin() {
      this.$q.dialog({
        title: 'Iniciar sesión',
        message: 'password',
        prompt: {
          model: '',
          type: 'text'
        },
        cancel: true,
      }).onOk(data => {
        this.$store.dispatch('login/login')
        setTimeout(() => {
          this.isLoggedIn = true
        },1000)
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    }
  }
}
</script>
