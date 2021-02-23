<template>
  <q-page>
      <section class="principal">
          <div class="row">
              <div class="col-12 text-center q-my-lg restringido-lg">
                  <h2 class="font-weigth-bold"> {{this.proyecto.name}}</h2>
              </div>
          </div>
          <div class="row">
              <div class="col-12">
                <q-parallax class="animacion-apertura">
                <template v-slot:media>
                    <img :src="proyecto.img">
                </template>

                <template v-slot:content="scope">
                    <div
                        class="absolute row items-left"
                        :style="{
                            top: '5px',
                            left: '10px'
                        }"    
                    >
                        <p class="text-body1 font-weigth-bold text-white">Principales patrocinadores*</p>
                    </div>
                    <div
                        class="absolute row items-left"
                        :style="{
                            opacity: 0.45 + (1 - scope.percentScrolled) * 0.55,
                            top: (scope.percentScrolled * 10) + '%',
                            left: '10px',
                        }"
                    >
                        <img v-for="numero in 3" :key="numero" src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" style="width: 80px; height: 80px" class="q-ma-md animacion-fade">
                    </div>
                </template>
                </q-parallax>
              </div>
          </div>
      </section>
      <section class="seccion-descripccion">
          <div class="row">
              <div class="col-12 q-mt-xl">
                  <div class="row restringido-lg q-mt-xl">
                      <!-- columnas de la descripccion  -->
                      <div class="col-sm-8 col-12" :class="{'q-pb-xl': $q.screen.gt.xs}">
                        <article>
                            <p class="descripcion text-center text-grey-8 text-h6 q-px-lg">
                            {{this.proyecto.description}}
                            </p>
                        </article>
                      </div>
                      <!-- tarjeta de compra de bonos  -->
                      <div class="col-12 col-sm-4" :class="{'q-pa-lg bg-grey-2': $q.screen.lt.sm}">
                        <q-card
                            class="q-mx-sm"
                            :class="{'fixed-top-right sticky-card': bonosCardAsSticky, '': !bonosCardAsSticky}"
                            v-if="toggleBonosCard"
                            ref="refCard"
                            :flat="!bonosCardAsSticky"
                        >
                            <!-- header tarjeta compra de bonos  -->
                            <q-card-section>
                                <div class="row">
                                    <div class="col">
                                        <div class="text-h4 text-uppercase">Get on track,</div>
                                        </div>
                                        <div v-if="bonosCardAsSticky" class="col-auto">
                                            <q-btn flat icon="minimize" size="lg" color="grey-8" class="q-mr-2" @click="morphTarjetaBonos(false)" />
                                        </div>
                                </div>
                                <div class="text-h4 text-uppercase text-yellow-8">But Leave no tracks!</div>
                            </q-card-section>
                            <!-- input de compra de bonos  -->
                            <q-card-section>
                                <q-input
                                @input="comprobarBonos"
                                bottom-slots
                                v-model.number="bonosPorComprar"
                                color="grey-3"
                                label-color="yellow-8"
                                class="text-h5"
                                outlined
                                >
                                    <template v-slot:hint>
                                        <p class="text-red"> Ultimos {{proyecto.availableOffsets}} bonos disponibles.</p>
                                    </template>
                                    <template v-slot:append>
                                        <p :class="{'text-subtitle': $q.screen.gt.xs, 'text-body2': $q.screen.lt.sm}" class="text-grey-6 q-pt-md">toneladas de carbono</p>
                                        <q-icon name="eco" color="yellow-8"/>
                                    </template>
                                </q-input>
                            </q-card-section>
                            <!-- seccion precio individual bono  -->
                            <q-card-section class="q-pt-sm q-ml-sm text-subtitle1 text-grey-8">
                                {{proyecto.offsetPrice | formatoPrecio}} por tonelada de carbono removida.
                            </q-card-section>
                            <!-- seccion display precio total  -->
                            <q-card-section class="text-h5 q-pt-none q-ml-sm">
                                Total: {{this.precioTotalBonos | formatoPrecio}} USD
                            </q-card-section>
                            <!-- boton comprar bonos  -->
                            <q-card-section class="text-center q-pt-md">
                                <q-btn unelevated rounded color="yellow-8" text-color="dark" label="Comprar bonos" padding="md xl" icon-right="eco" />
                            </q-card-section>
                        </q-card>
                      </div>
                  </div>
              </div>
          </div>
      </section>
      <section class="seccion-ventajas">
        <mapa-mexico v-bind:estado="getSlugEstado()"></mapa-mexico>
        <!-- detalles adicionales proyecto  -->
        <div class="row">
            <div class="col-12">
                <div class="row restringido-lg">
                    <div class="col-6 q-my-lg q-pa-lg full-height">
                    </div>
                    <div class="col-6">
                        <div class="col-12" :class="{'q-pa-lg q-my-lg': $q.screen.gt.xs}">
                            <!-- tarjeta datos generales  -->
                        <q-card flat class="bg-transparent">
                            <q-card-section class="text-center q-pa-none q-ma-none">
                                <h5 class="q-my-md text-white">{{this.proyecto.location}}</h5>
                            </q-card-section>
                            <div class="row">
                                <div class="col-sm-6 col-12">
                                </div>
                                <div class="col-sm-6 col-12 q-pa-md">
                                    <q-list dark bordered separator v-if="$q.screen.gt.sm">
                                    <q-item clickable v-ripple>
                                        <q-item-section>
                                            <q-item-label overline>Tipo:</q-item-label>
                                            <q-item-label class="q-ml-md text-body1 font-weight-bold">{{this.proyecto.type}}</q-item-label>
                                        </q-item-section>
                                    </q-item>

                                    <q-item clickable v-ripple>
                                        <q-item-section>
                                        <q-item-label overline>Desarrollado por:</q-item-label>
                                        <q-item-label class="q-ml-md text-body1 font-weight-bold">{{this.proyecto.developer}}</q-item-label>
                                        </q-item-section>
                                    </q-item>

                                    <q-item clickable v-ripple>
                                        <q-item-section>
                                        <q-item-label overline>Area protegida:</q-item-label>
                                        <q-item-label class="q-ml-md text-body1 font-weight-bold">{{this.proyecto.area}}</q-item-label>
                                        </q-item-section>
                                    </q-item>
                                    </q-list>
                                </div>
                            </div>
                        </q-card>
                        </div>
                    </div>
                </div>
                <div class="row restringido">
                    <div class="col-6 q-mt-md">
                        <div class="row">
                            <div class="col-6" :class="{'text-center full-height q-mt-xl q-pt-lg': $q.screen.lt.md}">
                                <!-- lista beneficios adicionales  -->
                                <q-list dark v-if="$q.screen.gt.sm">
                                    <q-item>
                                        <q-item-section>
                                        <q-item-label class="text-font-bold text-body1">{{this.proyecto.jobsGenerated}} nuevos trabajado generados</q-item-label>
                                        </q-item-section>

                                        <q-item-section side top>
                                        <q-icon size="lg" name="engineering" />
                                        </q-item-section>
                                    </q-item>

                                    <q-separator spaced inset color="white"/>
                                    <div class="" v-for="beneficio in this.proyecto.coBenefits" :key="beneficio">
                                        <q-item>
                                            <q-item-section>
                                            <q-item-label class="text-font-bold text-body1">{{beneficio}}</q-item-label>
                                            </q-item-section>

                                            <q-item-section side top>
                                            <q-icon name="park" size="lg"/>
                                            </q-item-section>
                                        </q-item>

                                        <q-separator spaced inset color="white"/>
                                    </div>
                                </q-list>
                                <q-btn v-else unelevated round color="dark" icon="my_location" />
                            </div>
                            <div class="col"></div>
                        </div>
                    </div>
                    <div class="col-6">
                    </div>
                </div>
            </div>
        </div>
      </section>
      <section>
          <div class="extra" v-intersection="onIntersection"></div>
      </section>
    <div class="fixed-bottom-right q-ma-xl">
        <div ref="refFab" class="bg-yellow-8 fixed-bottom-right q-ma-xl" style="border-radius:50%; height:1px; width:1px;"/>
            <q-btn
                v-if="!toggleBonosCard"
                @click="morphTarjetaBonos(true)"
                color="yellow-8"
                icon="eco"
                text-color="green-8"
            />
    </div>
  </q-page>
</template>

<script>
import MapaMexico from '../components/MapaMexico'
import { morph } from 'quasar'

export default {
    name: 'Proyecto',
    components: { MapaMexico }, 
    data() {
        return {
            toggleBonosCard: true,
            bonosCardAsSticky: false,
            proyecto: this.$store.getters['proyectos/getProyectos'][this.$route.params.id],
            bonosPorComprar: 1000
        }
    },
    methods: {
        getSlugEstado () {
            let location = this.proyecto.location
            let estado = location.split(",")[0].toLowerCase()
            estado = estado.replace(/\W+/g, '-')
            return estado
        },
        morphTarjetaBonos (state) {
            if (state !== this.toggleBonosCard) {
                const getFab = () => this.$refs.refFab
                const getCard = () => this.$refs.refCard ? this.$refs.refCard.$el : void 0

                morph({
                    from: this.toggleBonosCard === true ? getCard : getFab,
                    to: this.toggleBonosCard === true ? getFab : getCard,
                    onToggle: () => {
                        this.toggleBonosCard = state
                    },
                    duration: 500
                })
            }
        },
        onIntersection (entry) {
            console.log(entry)
            this.bonosCardAsSticky = entry.isIntersecting
            this.morphTarjetaBonos(!entry.isIntersecting)
        },
        comprobarBonos(bonos) {
            if (this.proyecto.availableOffsets < this.bonosPorComprar) {
                this.bonosPorComprar = this.proyecto.availableOffsets   
            }
        }
    },
    filters: {
        formatoPrecio(precio) {
            return `$ ${precio}`
        }
    },
    computed: {
        precioTotalBonos() {
            let precio = parseFloat(this.proyecto.offsetPrice.split(' ')[0])
            return this.bonosPorComprar * precio
        }
    }
}
</script>

<style lang="scss" scoped>
    .animacion-apertura {
        animation: apertura 3s ease-in;
        animation-fill-mode: forwards;
        @media (max-width: $breakpoint-xs-max) {
            animation-duration: 1s!important;
        }
        // transform-origin: right;
        // transform-box: fill-box;
        // box-sizing: border-box;
    }
    .animacion-fade {
        animation: fade-in 5s ease-in-out;
    }
    @keyframes apertura {
        from {
            transform: translateX(40%);
            width: 20%;
        }
        to {
            transform: translateX(0%);
            width: 100%;
        }
    }
    @keyframes fade-in {
        from {
            opacity: 0%;
        }
        to {
            opacity: 100%;
        }
    }
    .seccion-ventajas {
        height: calc(100vh - 122px);
    }
    .sticky-card {
        z-index: 2;
        top: 160px;
        @media (min-width: $breakpoint-sm-min) {
            right: 150px;
        }
    }
    .extra {
        min-height: 100vh;
    }
</style>