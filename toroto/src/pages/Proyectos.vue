<template>
  <q-page>
    <section class="eye-candy">
      <div class="row q-pt-xl justify-center">
        <div class="col">
        </div>
        <div class="col-auto  items-center">
            <q-avatar size="150px">
              <img src="~assets/img/eye_candy.svg" class="candy-container">
            </q-avatar>
        </div>
        <div class="col"></div>
      </div>
    </section>
    <section class="proyectos">
      <div class="row q-py-md">
        <div class="col-12 q-pt-xl">
          <div class="row justify-center q-col-gutter-lg restringido">
            <div v-for="(proyecto, index) in this.$store.getters['proyectos/getProyectos']" class="col-md-auto col-sm-4 col-12 q-pa-md" :key="index">
              <q-card flat class="tarjeta-proyecto">
                <q-img :src="proyecto.img" class="imagen-tarjeta rounded-borders clickable" @click="irAProyecto(index)"/>
                <q-item class="q-pa-sm">
                  <q-item-section>
                    <q-item-label class="text-h6 clickable" :lines="2" @click="irAProyecto(index)">{{proyecto.name}}</q-item-label>
                  </q-item-section>
                </q-item>
              <q-item class="q-pa-xs">
                <q-item-section>
                  <q-item-label class="q-ma-xs text-justify text-grey-8 clickable text-body1" :lines="5" @click="irAPost">{{proyecto.description}}</q-item-label>
                </q-item-section>
              </q-item>
              <q-card-section horizontal>
                <q-card-section class="q-mt-xs">
                  <p class="text-subtitle1 font-weight-bold">Bonos disponibles: </p>
                </q-card-section>
                <q-card-section>
                      <q-btn
                        padding="sm"
                        class="boton-bonos"
                        color="yellow-8"
                        :text-color="colorTextoBotonBonos(proyecto.availableOffsets, proyecto.totalOffsets)"
                        :label="proyecto.availableOffsets"
                      >
                        <q-icon class="q-ml-xs text-green-10" name="eco" />
                        <q-tooltip>
                          Comprar bonos
                        </q-tooltip>
                      </q-btn>
                </q-card-section>
              </q-card-section>
              <q-card-section class="text-center q-pa-none">
                <q-btn unelevated rounded color="primary" label="Ver detalles" :to="`/proyecto/${index}`" />
              </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
      </div>
      <div class="row post-promovido restringido-lg">
        <div class="col-12 q-my-lg">
          <div class="col">
            <q-separator></q-separator>
          </div>
        </div>
        <div class="col-12">
          <div class="row q-my-lg">
            <div class="col-sm-8 col-xs-12 q-pa-md">
                <q-img
                  class="rounded-borders"
                  src="~assets/img/confidence.png"
                />
            </div>
            <div class="col-sm-4 col-xs-12">
              <q-card class="tarjeta-post q-pa-xs clickable" @click="irAPost(10)" flat>
                <q-card-section class="q-pa-xs q-pb-none">
                  <q-item>
                    <q-item-section>
                      <q-item-label class="text-h5">Este es el titulo de un hermoso post acerca de como podemos salvar la naturaleza</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-item-label class="text-subtitle1 text-grey-7">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde ducimus itaque illum ab dolores doloremque labore impedit, neque, ad officia, alias veritatis earum culpa. Quia repellat tempora incidunt omnis aliquam.
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-card-section>
                <q-card-section horizontal class="justify-center">
                  <q-card-section class="q-mt-sm">
                    <q-avatar>
                      <img src="~assets/img/david-camhi-de-la-tejera.png" alt="avatar" size="xl">
                    </q-avatar>
                  </q-card-section>
                  <q-card-section class="q-ml-xs">
                    <div class="text-h6">David Camhi de la Tejera</div>
                    <div class="text-subtitle1">Mensaje de nuestro CTO</div>
                  </q-card-section>
                </q-card-section>

              </q-card>
            </div>
          </div>
        </div>
      </div>
      <!-- segunda seccion de posts -->
      <div class="row">
        <div class="col-12 q-my-lg">
          <div class="row restringido-lg q-col-gutter-md">
            <div v-for="(proyecto, index) in this.$store.getters['proyectos/getProyectos']" class="col-md-4 col-sm-6 col-12 q-pa-sm" :key="index">
              <q-card class="tarjeta-proyecto" flat>
                <q-img :src="proyecto.img" class="imagen-tarjeta"/>

                <q-card-section>
                  <div class="text-h6">{{proyecto.name}}</div>
                </q-card-section>
                <q-item-section>
                  <q-item-label class="q-ma-xs text-justify text-grey-8 clickable text-body1" :lines="5">
                    {{proyecto.description}}
                  </q-item-label>
                </q-item-section>
                <q-card-section horizontal>
                  <q-card-section class="q-mt-xs">
                    <p class="text-subtitle1 font-weight-bold">Bonos disponibles: </p>
                  </q-card-section>
                  <q-card-section>
                        <q-btn
                          padding="sm"
                          class="boton-bonos"
                          color="yellow-8"
                          text-color="dark"
                          :label="proyecto.availableOffsets"
                        >
                          <q-icon class="q-ml-xs text-green-10" name="eco" />
                          <q-tooltip>
                            Comprar bonos
                          </q-tooltip>
                        </q-btn>
                  </q-card-section>
                </q-card-section>
                <q-card-section class="text-center q-pa-none">
                  <q-btn unelevated rounded color="primary" label="Ver detalles" :to="`/proyecto/${index}`"/>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12 q-my-xl">
        </div>
      </div>
    </section>
  </q-page>
</template>

<script>
export default {
  name: 'Proyectos',
  methods: {
    irAProyecto(id) {
      console.log(id)
    },
    irAPost() {
      console.log('click en boton de post')
    },
    colorTextoBotonBonos(bonosDisponibles, bonosTotales) {
      return (bonosDisponibles / bonosTotales < 0.06) ? 'red' : 'black'
    }
  }
}
</script>

<style lang="scss" scoped>
.candy-container {
  margin: 10px auto;
}
.tarjeta-proyecto {
  width: 100%;
  @media (min-width: $breakpoint-md-min) {
    max-width: 330px;
  }
}
.imagen-tarjeta {
  width: 100%;
  height: 180px;
}
</style>
