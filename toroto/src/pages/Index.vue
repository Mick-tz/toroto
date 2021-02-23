<template>
  <q-page class="pagina-principal">
    <section class="landing">
      <div class="row text-yellow-3 text-center">
        <div class="col-12" :class="{'q-mt-xl': $q.screen.gt.xs, 'q-mt-sm': $q.screen.lt.sm}">
          <h2 class="q-mb-none">Become a <span class="text-weight-bold">Hero</span></h2>
          <h2 class="q-my-sm">by getting to <span class="text-weight-bold">ZERO</span></h2>
          <p class="text-h4 text-white q-my-lg">Empresas evolucionando hacia un mundo sin CO2</p>
          <q-btn :class="{'q-mt-xl': $q.screen.gt.xs, 'q-mt-sm': $q.screen.lt.sm}" unelevated rounded color="yellow-8" text-color="dark" label="APRENDE COMO" padding="md xl" />
        </div>
      </div>
    </section>
    <section class="about">
      <div class="row q-gutter-none">
        <div class="col-6 text-center">
          <h2>
            Image section
          </h2>
        </div>
        <div class="col-6 text-center">
          <h2>
            text section
          </h2>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex'
}
</script>

<style lang="scss">
.pagina-principal {
    background: #70a5daff;
}
.about, .landing {
  height: calc( 100vh - 122px );
  margin: 0;
}
.landing {
    background-image: linear-gradient( rgba(0, 0, 30, 0.5), rgba(0, 0, 30, 0.5) ), url('~assets/img/nature_optimized.svg');
    background-position: center center;
    background-attachment: fixed;
    background-size: cover;
}
// .hero-text-container {
//   height: calc(70%);
//   z-index: 1;
// }
// .svg-container {
//   svg {
//     position: absolute;
//     bottom: 0;
//     left: 0;
//     width: 100%;
//     z-index: 1;
//     overflow: visible;
//   }
//   &::after {
//     content: '';
//     background: black;
//     width: 100%;
//     height: 100%;
//     position: absolute;
//     left: 0;
//     top: 0;
//     opacity: 0.4;
//     z-index: -1;
//   }
// }
</style>

