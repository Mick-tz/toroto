<template>
  <q-layout view="hHh lpR fFf">

    <q-header reveal elevated class="bg-dark text-white" height-hint="98">
      <div class="contenedor-toolbar bg-primary">
        <q-toolbar class="restringido-lg">
          <q-toolbar-title>
              <img src="~assets/logo-blanco.png" class="logo">
          </q-toolbar-title>
          <q-tabs align="right">
            <q-btn unelevated label="Iniciar Sesión"></q-btn>
            <q-btn unelevated outline label="Registrarse"></q-btn>
          </q-tabs>
        </q-toolbar>
      </div>

      <q-tabs align="right" class="restringido-lg">
        <q-route-tab to="/" label="Inicio" />
        <q-route-tab to="/proyectos" label="Proyectos" />
        <q-route-tab to="/clientes" label="Clientes" />
        <q-route-tab to="/acerca" label="Acerca" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- <q-footer bordered class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-footer> -->
    <mobile-footer></mobile-footer>
  </q-layout>
</template>

<script>
import MobileFooter from '../components/MobileFooter'
export default {
  name: 'MainLayout',
  components: { MobileFooter },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.logo {
  width: 150px;
  height: auto;
}
</style>