import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios';
import createPersistedState from 'vuex-persistedstate';
'https://kanwulf01.pythonanywhere.com/'
'http://localhost:8000/'
const URLdefault = 'https://kanwulf01.pythonanywhere.com/';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    User:'',
    Productos:[],
    Producto:{},
    Id:0,
    Carrito:[],
    CantidadesAgregadas:[],//arreglo con id del producto y la cantidad que quiere comprar
    CantidadesEliminadas:[],//arreglo que contiene id y la cantidad que quiere quitar del carrito
    ProducoCantidadActual:0,
    IdsCantidades:[],
    CantidaProducto:0,   
  },
  getters:{
    

    
    getUser:state => {
      return state.User
    }
    ,
    getCantidadesAgregadas:state => {
      return state.CantidadesAgregadas;
    },
    getCantidaProducto:state => {
      return state.CantidaProducto;
    },
    getCarrito:state => {
      return state.Carrito;},
    getProducto:state => {
      return state.Producto;},
    getProducts:state => {
      return state.Productos;
    }},
  mutations: {
    setUser:(state,value) =>{
      state.User = value;
    }
    ,
    addCantidadesAgregadas:(state,value) =>{
      state.CantidadesAgregadas.push(value);},
    setCantidaProducto:(state,value) => {
      state.CantidaProducto = value;},
    restaCantidadProducto:(state, value) => {
      state.CantidaProducto = state.CantidaProducto - value;
    },
    addCarrito:(state, value) => {
      state.Carrito.push(value);
    },
    modificaCnatidadProducto:(state,value) => {
      state.Producto.cantidad = state.Producto.cantidad - value;
    }, 
    deleteProducto:(state,value) => {
      state.Carrito.splice(value,1);
    },
    setProducto:(state, value) => {
      state.Producto = value;
    },
   setProducts:(state,value) => {
     state.Productos = value;
   },
   setCarrito:(state, value) => {
     state.Carrito = value;
   }
  },
  actions: {//Trae Productos
  api_getProducts:(context, credentials) => {

      return new Promise((resolve, reject) => {
        Axios.get(URLdefault+'products/listaProductos/')
        .then(repsonse => {
          resolve(repsonse)
        }).catch(error=>{
          console.log(error)
        })
      })

    },

    Resta_STock:(context,credentials) =>{//resta cantidades
      return new Promise((resolve)=>{
        Axios.patch(URLdefault+'products/edita/'+credentials.pk+'/'+credentials.cantidad+'/')
        .then(res=>{
          resolve(res)
        }).catch(err=>{
          console.log(err)
        })
      })
    },
    restauraCantidad:(context,credentials)=>{//suma cantidades
      return new Promise((resolve)=>{
        Axios.patch(URLdefault+'products/restaura/'+credentials.pk+'/'+credentials.cantidad+'/')
        .then(res=>{
          resolve(res)
        }).catch(err=>{
          console.log(err)
        })
      })
    },



    //login Normal 
    api_django_Login:(context, credentials) =>{
      return new Promise((resolve,reject)=>{
        Axios.post(URLdefault+'users/token/',credentials)
      .then(response=>{
        //alert(response.data.user)
        resolve(response);
      }).catch(error=>{
        console.log(error)
      })
    })
  },
  api_django_get_productos: (context, credentials) => {
    
    Axios.defaults.headers = {
      "Content-Type": "application/json",
      
    };
    return new Promise((resolve, reject) => {
      Axios.get(
        URLdefault+`products/testpagination/${credentials.pagespagination}/${credentials.page}/`
      )
        .then(res => {
          console.log(res.data);
          resolve(res);
        })
        .catch(error => {
          console.log(error);
        });
    });
  },
  api_django_getNumberCantidadbyProducts: (context) => {
    
    Axios.defaults.headers = {
      "Content-Type": "application/json",
     
    };
    ///MODIFICADO AHORA
    return new Promise((resolve, reject) => {
      Axios.get(URLdefault+'products/getCantidadTaskbyCat/')
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          console.log(error);
        });
    });
  },
  },

  modules: {
  },
  //plugins: [createPersistedState()]
})
