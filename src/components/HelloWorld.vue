<template>
  <v-container fluid>
    <div>
    
    </div>
    <v-row>
      <v-col cols="12">
        <v-row :align="alignment" :justify="justify" class="grey lighten-5">
          <v-card
            v-for="n in 1"
            :key="n"
            class="ma-3 pa-6"
            outlined
            tile
            width="1200px"
            height="1800"
            style="margin-left:15%;"
          >
            <v-card max-width="1200" class="mx-auto">
              <v-container>
                <v-row dense>
                  <v-col cols="12">
                    <v-card color="#385F73" dark>
                      <v-card-title class="headline">Productos</v-card-title>

                      <v-card-subtitle>Productos</v-card-subtitle>

                      <v-card-actions></v-card-actions>
                    </v-card>
                  </v-col>
                  <v-content>
                    <v-col v-for="(item, i) in products" :key="i" cols="12">
                      <v-card :color="item.color" red>
                        <div class="d-flex flex-no-wrap justify-space-between">
                          <div>
                            <v-card-title class="headline" v-text="item.nombre"></v-card-title>

                            <v-card-subtitle v-text="item.descripcion"></v-card-subtitle>
                            <v-card-actions>
                              <v-btn
                                small
                                color="primary"
                                text
                                @click="DetallesPorId(item)"
                              >Detalles</v-btn>
                            </v-card-actions>
                          </div>

                          <v-avatar
                            class="ma-3"
                            size="125"
                            tile
                          >
                            <v-img v-if="item.images[0]!=undefined" :src="item.images[0].image"></v-img>
                            
                            <v-img v-else src="../assets/noimage.jpeg"></v-img>
                          </v-avatar>
                        </div>
                      </v-card>
                    </v-col>
                  </v-content>
                </v-row>

                <div class="text-center">
                  <v-pagination
                    v-model="page"
                    :length="paginationPages"
                    circle
                  >{{OnChangePickPagination2}}</v-pagination>
                </div>
              </v-container>
            </v-card>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapGetters, mapMutations } from "vuex";


export default {
  name: "HelloWorld",


  data: () => ({
    alignments: ["start", "center", "end"],
    products: [],
    alignment: "center",
    justify: "center",
    user: {},
    page:0,
    pagination:0,
    paginationPages:1,
    newItems:[],
    googleSignInParams: {
      client_id:
        "221560060413-e8mtukv34pe50g5uf9ftcfn3kho2ejnr.apps.googleusercontent.com",
    },
    renderParams: {
      width: 250,
      height: 50,
      longtitle: true,
    },
  }),
  methods: {
    ...mapMutations([
      "setUsername",
      "setToken",
      "setUserImage",
      "setformularioCategoriaGo",
      "getPanelListaCategoria",
      "setid_Usuario",
      "setProducts",
      'setProducto',
      'setCantidaProducto',
    ]),
    ...mapGetters(["getUsername", "getToken"]),

    DetallesPorId(item) {
      this.setProducto(item)
      this.setCantidaProducto(item.cantidad)//toma las cantidades del producto al que se va a detalles
      this.$router.push({ path: "/detalles" });
    },

    llamaProductos() {
      //llama los productos y los guarda en el arreglo products
      this.$store.dispatch("api_getProducts").then((res) => {
        this.products = res.data;
        this.setProducts(res.data);
        console.log(res.data[0]);
      });
    },

    getTemasByIdCategoria(page) {
      //peticion con cantidad de paginas, pagina seleccionada, id_categoria
      let datos = {
        pagespagination: this.paginationPages,
        page: page,

      };
      //   console.log(datos)
      this.$store
        .dispatch("api_django_get_productos", datos)
        .then(res => {
          this.products = res.data;
          this.setProducts(res.data);
          
        })
        .catch(error => {
          console.log(error);
        });
    },
    getSizePaginationsPages() {
     
      this.$store
        .dispatch("api_django_getNumberCantidadbyProducts")
        .then(res => {
          //   console.log(res.data[0])
          let cantidadDeTemas = res.data[0];
          if (cantidadDeTemas <= 6) {
            this.paginationPages = 1;
          } else {
            let pagipages = cantidadDeTemas / 6;
            if (Number.isInteger(pagipages)) {
              this.paginationPages = pagipages;
              //  console.log("numero de paginas en la paginacion entero:"+this.paginationPages)
            } else {
              let contador = 1;
              //   console.log("entro al else")
              for (let i = 1; i <= cantidadDeTemas; i++) {
                if (contador == 6) {
                  this.paginationPages = this.paginationPages + 1;
                  contador = 0;
                }
                contador = contador + 1;
              }
              // console.log("numero de paginas en la paginacion decimal:"+this.paginationPages)
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    


    logOutGoogleSuceess: function (GoogleAuth) {
      GoogleAuth.disconnect();
      alert("Cerro Sesion");
    },

    onGoogleSignInError(error) {
      console.log("OH NOES", error);
    },
    isEmpty(obj) {
      // alert("prueba")
      return Object.keys(obj).length === 0;
    },
    onGoogleSignInError(error) {
      console.log("OH NOES", error);
    },
  },
  created() {
    //Hacer peticion aca de productos
    //this.llamaProductos();
    this.getTemasByIdCategoria(1);
    this.getSizePaginationsPages();
  },
  computed:{
    OnChangePickPagination2() {
      for (let i = 1; i <= this.paginationPages; i++) {
        if (this.page == i) {
          //   console.log("esta es la pagina: " + i)
          this.getTemasByIdCategoria(i);
        } else {
        }
      }
    }
  },
};
</script>


<style scoped>
</style>