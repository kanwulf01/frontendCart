<template>
  <v-card
    max-width="1200"
    class="mx-auto"
    style="margin-left:20%;"
  >
    <v-system-bar
      color="pink darken-2"
      dark
    >

    
    </v-system-bar>

    <v-app-bar
      dark
      color="pink"
    >

      <v-toolbar-title>Carrito de Compras</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn @click="ComprarTodo()">
       Comprar Todo
      </v-btn>
    </v-app-bar>

    <v-container>
      <v-row dense>
        <v-col cols="12">
          <v-card
            color="#385F73"
            dark
          >
            <v-card-title class="headline">Carrito de Compras</v-card-title>

            <v-card-subtitle>Tu Carrito de Compras Online</v-card-subtitle>

            <v-card-actions>
              <v-btn text></v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col
          v-for="(item, i) in getCarrito()"
          :key="i"
          cols="12"
        >
          <v-card
            dark
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title
                  class="headline"
                  v-text="item.nombre"
                ></v-card-title>

                <v-card-subtitle v-text="item.descripcion"></v-card-subtitle>
              </div>

               <v-card-actions>
              <v-btn text>cantidad: {{getCantidad()}} {{cantidad}}</v-btn>
              <v-btn text>Precio: {{item.precio_unidad}}</v-btn>
              <v-btn @click="eliminarProducto(item)" text>Eliminar Articulo</v-btn>
            </v-card-actions>

              <v-avatar
                class="ma-2"
                size="150"
                tile
                style="margin-left:87%;"
              >
                <v-img :src="item.images[0].image"></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template> 

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
    data() {
        return{
            carrito:[],
            items: [
        {
          color: '#1F7087',
          src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          title: 'Supermodel',
          artist: 'Foster the People',
        },
        {
          color: '#952175',
          src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
          title: 'Halcyon Days',
          artist: 'Ellie Goulding',
        },
      ],
      cantidad:0,
        }
    },
    methods:{
        ...mapGetters([
            'getCarrito',
            'getCantidadesAgregadas',
            'getUser',
        ]),
        ...mapMutations([
          "setProducts",
          "deleteProducto",
          "setCarrito"
        ]),
        getProductosUpdateados() {
            this.$store.dispatch('api_getProducts')
            .then(response => {
                this.setProducts(response.data)

            })
        },
        getCantidad(id) {
          this.getCantidadesAgregadas().forEach(element => {
            if(element.id == id) {
              this.cantidad = element.cantidad;
            }
          });
        },
        eliminarProducto(articulo) {
          //restaurar en la cantidad en la BD
          //elimnar el articulo del carrito de compras
          this.deleteProducto(articulo);
          
          
          let object = {
                         pk:articulo.id,
                         cantidad:this.cantidad,
                     }
                     this.$store.dispatch('restauraCantidad',object)
                     .then(response=>{
                         console.log(response)
                         alert(response)
                        
                     }).catch(error=>{
                         console.log(error)
                     })
                     

        },
        ComprarTodo() {
          //que se reinicie el proceso
          if(this.getCarrito() != 0){alert("Compra Satisfactoria" || this.getUser() != '')
          this.setCarrito([])}else{alert("No tiene productos en carrito o No esta logueado")}
          
        }
    },
    created() {
        this.getProductosUpdateados();
    }
}
</script>

<style>

</style>
