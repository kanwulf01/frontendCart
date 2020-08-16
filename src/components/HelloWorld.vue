<template>
  <div class="home2">
    <v-app id="inspire">
      <h3 style="margin-left:45%;">PRODUCTOS</h3>
      <v-row class="fill-height" align="center" justify="center">
        <template v-for="(item, i) in this.products">
          <v-col :key="i" cols="12" md="4">
            <v-card class="mx-auto" max-width="300">
              <v-img class="black--text align-end" height="200px" :src="item.images[0].image">
                <v-card-title></v-card-title>
              </v-img>

              <v-card-subtitle class="pb-0">
                <strong>{{item.nombre}}</strong>
              </v-card-subtitle>

              <v-card-text class="text--primary">
                <div>Categorias</div>

                <div>{{ item.descripcion }}</div>
              </v-card-text>

              <v-card-actions>
                <v-btn color="orange" text @click="DetallesPorId(item)">Detalles</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </template>
      </v-row>
    </v-app>
  </div>
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
    this.llamaProductos();
  },
};
</script>


<style scoped>
</style>