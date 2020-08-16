<template>
<div class="container">
    <br>
    <h3 style="margin-left:50%;">Producto</h3>
    <br>
  <v-carousel>
    <v-carousel-item
      v-for="(item,i) in getProducto().images"
      :key="i"
      :src="item.image"
      reverse-transition="fade-transition"
      transition="fade-transition"
    ></v-carousel-item>
  </v-carousel>
  <h4>Nombre:       {{getProducto().nombre}}</h4>
  <h4>Descripcion:  {{getProducto().descripcion}}</h4>          
  <h4>Precio Unidad:    ${{getProducto().precio_unidad}}</h4>
  <h4>Cantidad:  {{getCantidaProducto()}}</h4>
  <b-col>
                  <b-card-text>
                             Seleccione Cantidad
                              <input
                                type="number"
                                min="0"
                                step="1"
                                id="n1"
                                v-bind:max="getCantidaProducto()"
                                v-model="cantidadSeleccionada"
                              />
                            </b-card-text>
              </b-col>

  <v-btn large @click="LlevaCarrito()"> Agregar a Carrito de COmpras</v-btn>

  
</div>

</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
    data() {
        return{
            cantidadSeleccionada:0,
        }
    },
    methods:{
        ...mapGetters([
            'getProducto',
            'getCarrito',
            'getProducts',
            'getCantidaProducto',
            
        ]),
        ...mapMutations([
            'setCarrito',
            'addCarrito',
            'setCantidaProducto',
            'restaCantidadProducto',
            'addCantidadesAgregadas',
            
        ]),
        LlevaCarrito() {
            let validaID = true;
            //1.validar la extiencia del productos
            //descontar en lka base de datos
            if(this.getCantidaProducto() >= 0 && this.cantidadSeleccionada <= this.getCantidaProducto() && this.cantidadSeleccionada !=0) {

                this.getCarrito().forEach((producto)=>{
                    if(this.getProducto().id == producto.id) {
                        validaID = false;
                        
                        
                    }
                })
                
                if(validaID) {
                     //this.setCarrito(this.getProducto())
                     this.addCarrito(this.getProducto())
                     this.restaCantidadProducto(this.cantidadSeleccionada);
                     //mandar post con cantidad descontada
                     let object = {
                         pk:this.getProducto().id,
                         cantidad:this.cantidadSeleccionada,
                     }
                     this.$store.dispatch('Resta_STock',object)
                     .then(response=>{
                         console.log(response)
                         alert(response)
                         this.cantidadSeleccionada = 0;
                         this.addCantidadesAgregadas(object);
                     }).catch(error=>{
                         console.log(error)
                     })

                alert("Producto agregado al carrito")
                }else{
                    alert("Ya agrego este producto");
                }
               ;
            }

        },
        getProductosUpdateados() {
            this.$store.dispatch('api_getProducts')
            .then(response => {
                this.setProducts(response.data)


            })
        },
    },
    created() {
    //Busar el id que esta en el store y pintar el producto
    console.log(this.getProducto().images)

    }
}
</script>

<style>

</style>