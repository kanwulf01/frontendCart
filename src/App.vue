

<template>
  <div>
    <v-app-bar
      color="deep-purple accent-4"
      dense
      dark
    >
   
    
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>TiendaxD</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn icon @click="gotoCarrito()">
        <v-icon>mdi-cart</v-icon>
      </v-btn>
      <v-btn @click="gotoHome()">
        Home
      </v-btn>
      <v-btn v-if="UserExist()" @click="dialog = true">
        Login
      </v-btn>
      <v-menu
        left
        bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
          </v-btn>
        </template>

      </v-menu>

     

    </v-app-bar>
    
    <div data-app>
     <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="500px" max-height="500px">
          <v-card>
            <v-card-title>
              <span class="headline">Login</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field
                    label="Nombre de Usuario"
                    v-model="username"
                    hint="nombre de usuario"
                    :rules="nameRules"
                    required
                  >
                    <i class="mdi mdi-account"></i>
                  </v-text-field>
                  <v-text-field
                    label="Password"
                    hint="contraseña"
                    type="password"
                    v-model="password"
                    required
                    :rules="passwordRules"
                  ></v-text-field>
                </v-form>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
              <v-btn :disabled="!valid" color="blue darken-1" @click="validate">Iniciar Sesion</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
</div>
    <v-content>
<router-view/>
</v-content>

  </div>
  

</template>

<script>

//Componente que se encarga del navbar
import { mapGetters, mapMutations} from 'vuex'

export default {

  
  data(){
    return{
      valid: true,
    alignment: "center",
    justify: "center",
    user: {},
    overlay: false,
    nameRules: [
      v => !!v || "Este campo es obligatorio",
      v =>
        (v && v.length <= 20) || "El valor no debe tener mas de 20 characteres",
      v => /^[a-zA-Z0-9]+$/.test(v) || "Ingrese un valor Valido"
    ],
    passwordRules: [v => !!v || "Password es obligatorio"],
    dialog: false,
    username: "",
    password: "",
    }
  },
  methods:{
    ...mapMutations([
      "setUser",

    ]),
    ...mapGetters([
      'getUsername',
      'getUserImage',
      'getUser',
    ]),
    validate: function() {
      this.$refs.form.validate();
      let send = this.$refs.form.validate();
      // si el refers retorna true es porque todo esta valido
      if (send) {
        //llamar funcion aca
        this.LoginWithNoSocial();
      }
    },

    UserExist(){
      if(this.getUser() != ''){
         console.log('vacio')
        return false}
      else{
       
        return true}
     
    },
    gotoHome() {
       this.$router.push({path:'/'})
    },
    LogOutGoogle(){
    
     // this.setid_Usuario('')
      alert("Cerro Sesion")

      this.$router.push({path:'/'})
    },
    gotoCarrito() {
      this.$router.push({path:'/carrito'})
    },
    LoginWithNoSocial: function() {
      let packages = {
        username: this.username,
        password: this.password
      };

      this.$store
        .dispatch("api_django_Login", packages)
        .then(res => {
          let response = res.data;
          if (response.Type != "Invalid Credentials") {
            alert(response.data)
            window.localStorage.setItem("access_token", response.token.token);
           // this.setToken(response.token.token);
            this.setUser(response)
            this.dialog = false;

          } else {
            alert("Datos incorrectos");
          }
        })
        .catch(error => {
          console.log("error");
        });
    }

  },
  created(){
    //Siempre que se inicie este componente false a algunas variables del state que controlan el dashboard
    //por si alguien le da atras al boton del navegador
  console.log("hola mundo")
  }
}
</script>
