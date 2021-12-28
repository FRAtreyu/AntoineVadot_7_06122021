<template>
  <v-app id="inspire">
    <v-app-bar
        app
        color=#6868AB
        flat class="v-app-bar"
    >
      <v-container class="py-0 fill-height logo">
        <img
            src="./assets/icon-left-font-monochrome-black.svg"
            alt="Groupomania logo"
            class="logo"
        >
      </v-container>
    </v-app-bar>

    <v-main class=" main">
      <v-container>
        <v-row>
          <v-col cols="3">
            <v-sheet rounded="lg" class="menu">

              <router-link to="/post">
                <v-btn class="menu__btn" v-if="userConnected">Mur</v-btn>
              </router-link>

              <template v-if="userPseudo">
                <router-link :to="{name: 'Profile', params: {pseudo: userPseudo}}">
                  <v-btn class="menu__btn" v-if="userConnected">Profil</v-btn>
                </router-link>
              </template>


              <v-btn class="menu__btn  disconnect" v-if="userConnected" @click="disconnect">
                <v-icon>mdi-power</v-icon>
              </v-btn>

              <router-link to="/">
                <v-btn class="menu__btn" v-if="!userConnected">Se connecter</v-btn>
              </router-link>

              <v-btn class="menu__btn" v-if="!userConnected">
                <router-link to="/signup">S'inscrire</router-link>
              </v-btn>
            </v-sheet>
          </v-col>

          <v-col>
            <v-sheet
                min-height="70vh"
                rounded="lg"
            >
              <router-view></router-view>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

export default {
  data: () => ({
    userConnected: false,
    userId: localStorage.getItem('userId'),
    userPseudo: localStorage.getItem('userPseudo')
  }),

  components: {},
  computed: {},
  methods: {
    setUserConnected() {
      if (this.$cookies.get('token')) this.userConnected = true;
    },
    disconnect() {
      this.userConnected = false;
      localStorage.clear();
      this.$cookies.remove('token');
      this.$cookies.remove('role')
      this.$router.push({name: 'Login'})
    },

  },
  beforeMount() {
    this.setUserConnected()
  }
}
</script>
<style lang="scss">
.row {
  display: flex;
  flex-direction: column;
}

.col-3 {
  display: flex;
  flex-direction: row;
}

.menu {
  display: flex;
  flex-direction: row;
  background-color: #A1A1CA!important;
}

.menu__btn {
  margin: 5px;
  text-decoration: none;
  display: flex;
}

a {
  text-decoration: none;
  color: black !important;
}

.logo {
  max-height: 100%;
  max-width: 300px;
}

.v-container {
  padding: 0;
}

.disconnect:hover{
  color: white!important;
  background-color: red!important;
}

.main{
  background-color: #A1A1CA!important;
}

</style>