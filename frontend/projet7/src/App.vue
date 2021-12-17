<template>
  <v-app id="inspire">
    <v-app-bar
        app
        color="white"
        flat class="v-app-bar"
    >
      <v-container class="py-0 fill-height">
        <v-avatar>
          <img
              src="https://cdn.vuetifyjs.com/images/john.jpg"
              alt="John"
          >
        </v-avatar>
        <v-spacer></v-spacer>

        <v-responsive max-width="260">
          <v-text-field
              dense
              flat
              hide-details
              rounded
              solo-inverted
              placeholder="User search"
          ></v-text-field>
        </v-responsive>
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg" class="menu grey lighten-3">
              <v-btn class="menu__btn" v-if="userConnected">
                <router-link to="/post">Mur</router-link>
              </v-btn>
              <v-btn class="menu__btn" v-if="!userConnected">
                <router-link to="/">Se connecter</router-link>
              </v-btn>
              <v-btn class="menu__btn" v-if="!userConnected">
                <router-link to="/signup">S'inscrire</router-link>
              </v-btn>
              <v-btn class="menu__btn" v-if="userConnected" @click="disconnect">
                Se déconnecter
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
import {mapState, mapActions} from 'vuex'

export default {
  components: {},
  computed: {
  ...mapState(['userConnected'])
  },
  methods:{
    ...mapActions(['disconnectUser']),
    disconnect() {
      this.disconnectUser();
      this.$router.push({name:'Login'})
    }

  }
}
</script>
<style lang="scss">
.menu {
  display: flex;
  flex-direction: column;
}

.menu__btn {
  margin-bottom: 25px;
  text-decoration: none;
}

a {
  text-decoration: none;
  color: black !important;
}


</style>