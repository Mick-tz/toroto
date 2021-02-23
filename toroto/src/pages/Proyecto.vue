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
                            opacity: 0.65 + (1 - scope.percentScrolled) * 0.55,
                            top: (scope.percentScrolled * 10) + '%',
                            left: '10px',
                        }"
                    >
                        <img v-for="stakeholder in proyecto.mainStakeHolders" :key="stakeholder.logo" :src="stakeholder.logo" style="width: 80px; height: 80px; object-position: center; object-fit: cover;" class="q-ma-md animacion-fade">
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
                      <div class="col-12 col-sm-4" :class="{'q-pa-lg bg-grey-2': $q.screen.lt.sm}" style="min-height: 480px">
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
                                <div class="text-h4 text-uppercase text-yellow-8">But Leave no marks!</div>
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
                                <q-fab
                                    v-else
                                    v-model="detailsFab"
                                    external-label
                                    color="primary"
                                    icon="leaderboard"
                                    direction="right"
                                >
                                    <q-fab-action class="q-mx-xs" external-label label-position="top" color="primary" @click="onClick" icon="engineering" label="Detalles" />
                                    <q-fab-action class="q-mx-xs" external-label label-position="top" color="primary" @click="onClick" icon="park" label="Beneficios" />
                                    <q-fab-action class="q-mx-xs" v-if="proyecto.flora.length" external-label label-position="top" color="primary" @click="onClick" icon="fab fas fa-frog" label="Fauna" />
                                </q-fab>
                                <!-- tarjetas detalles  -->
                                <q-dialog v-model="tarjetaDetalles">
                                    <q-card >
                                        <q-list>
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
                                    </q-card>
                                </q-dialog>
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
      <section class="contadores">
          <div class="row">
              <div class="col-12 q-my-md">
                  <div class="row justify-evenly q-col-gutter-xl q-pa-md">
                      <div class="col-sm-4 col-12 q-mt-xl">
                          <q-card flat class="q-pa-lg">
                            <img src="~assets/img/hands_green.jpg">
                            <q-card-section>
                                <div class="text-h5 text-left">{{proyecto.totalOffsets}} toneladas de CO2 removidas de la atmósfera.</div>
                                <div class="text-justity text-subtitle1 text-grey-8 q-pt-xs">
                                El equivalente al CO2 generado por {{parseInt(proyecto.totalOffsets / 16)}} personas durante un año.</div>
                            </q-card-section>
                            <q-card-section class="q-px-md q-pt-none">
                                <q-icon class="q-mx-xs" v-for="i in getPersonas()" :key="'smog-' + i" name="fab fas fa-smog" :color="colorSmog(i)"/>
                            </q-card-section>
                            <q-card-section class="q-pt-sm text-center">
                                <div class="text-grey-8 text-h6 cursor-pointer">Reducir mi huella</div>
                            </q-card-section>
                          </q-card>
                      </div>
                      <div class="col-sm-4 col-12">
                          <q-card v-intersection="onIntersection" flat class="q-pa-lg">
                            <img src="~assets/img/smile.jpg">
                            <q-card-section>
                                <div class="text-h5 text-left">{{proyecto.jobsGenerated}} empleos encauzados hacia el desarrollo sustentable.
                                </div>
                            </q-card-section>
                            <q-card-section class="q-px-md q-pt-none">
                                <q-icon v-for="i in getPersonas()" :key="'person-' + i" name="fab fas fa-child" color="primary"/>
                            </q-card-section>
                            <q-card-section class="q-pt-sm text-center">
                                <div class="text-grey-8 text-h6 cursor-pointer">Reducir mi huella</div>
                            </q-card-section>
                          </q-card>
                          <div class="row">
                              <div class="col-12 text-center q-mt-md">
                                  <div class="text-h4">Este proyecto ha sido certificado por <span class="text-primary">{{proyecto.verifier}}</span></div>
                                  <div class="text-subtitle1 q-mt-md text-grey-8">Visita nuestros enlaces para conocer más</div>
                                  <q-btn label="Leer mas" color="primary" rounded padding="sm lg" class="q-mt-md"></q-btn>
                              </div>
                          </div>
                      </div>
                      <div class="col-sm-4 col-12 q-mt-xl">
                          <q-card flat class="q-pa-lg">
                            <img src="~assets/img/proteger.jpg">
                            <q-card-section>
                                <!-- TODO: Agregar filtro para que cambie este mensaje dependiendo del tipo de proyecto.  -->
                                <div class="text-h5 text-left">
                                    {{proyecto.area.split(' ')[0]}} hectáreas de zona boscosa protegida.
                                </div>
                            </q-card-section>
                            <q-card-section class="q-px-md q-pt-none">
                                <q-icon v-for="i in getHectareas()" :key="'tree-' + i" name="park" color="green-8"/>
                            </q-card-section>
                            <q-card-section class="q-pt-sm text-center">
                                <div class="text-grey-8 text-h6 cursor-pointer">Reducir mi huella</div>
                            </q-card-section>
                          </q-card>
                      </div>
                  </div>
              </div>
          </div>
      </section>
      <section class="stakeholders">
          <div class="row q-pt-xl">
              <div class="col-12 q-pt-md">
                  <div class="row">
                      
                  </div>
              </div>
          </div>
      </section>
    <div class="fixed-bottom-right q-ma-xl">
        <div ref="refFab" class="bg-yellow-8 fixed-bottom-right q-ma-xl" style="border-radius:50%; height:1px; width:1px;"/>
            <q-btn
                class="q-mb-md"
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
            tarjetaDetalles: false,
            detailsFab: true,
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
            this.bonosCardAsSticky = entry.isIntersecting
            this.morphTarjetaBonos(!entry.isIntersecting)
        },
        comprobarBonos(bonos) {
            if (this.proyecto.availableOffsets < this.bonosPorComprar) {
                this.bonosPorComprar = this.proyecto.availableOffsets   
            }
        },
        onClick() {
            this.tarjetaDetalles = true
        },
        getPersonas() {
            return Math.min(parseInt(this.proyecto.totalOffsets / 16*1500), 100)
        },
        getHectareas() {
            return Math.min(parseInt(parseInt(this.proyecto.area.split(' ')[0]) / 2), 100)
        },
        colorSmog(index) {
            if (index < 15) {
                return 'grey-8'
            } else if (index < 30) {
                return 'grey-7'
            } else if (index < 45) {
                return 'grey-6'
            } else if (index <= 60) {
                return 'grey-5'
            } else if (index < 75) {
                return 'grey-4'
            } else if (index < 90) {
                return 'grey-3'
            } else if (index <= 100) {
                return 'grey-2'
            } else {
                return 'black'
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