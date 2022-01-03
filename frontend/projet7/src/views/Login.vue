<template>
  <div id="bloc">
    <v-text-field type="email" v-model="email" name="email" placeholder="E-mail"></v-text-field>
    <v-text-field type="password" v-model="password" name="password" placeholder="Mot de passe"></v-text-field>
    <v-btn @click="send()">Login</v-btn>
  </div>
</template>

<script>

export default {
  name: "Login",
  data: () => ({
    email: '',
    password: ''
  }),
  computed: {},
  methods: {
    //connecte l'utilisateur et enregistre les données de connections dans des cookies et dans le localStorage
    send() {
      (async () => {
        const rawResponse = await fetch('http://localhost:4200/api/auth/login/',
            {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                email: this.email,
                password: this.password,
              })
            })
        const content = await rawResponse.json();
        console.log(content);
        if (content.userId) {
          location.replace('/post')
          localStorage.setItem('userId', content.userId);
          localStorage.setItem('userPseudo', content.pseudo);
          this.$cookies.set('token', content.token, Infinity);
          this.$cookies.set('role', content.role, Infinity)
        } else alert(content.error)

      })();
    },
    //si utilisateur connecté définie la page d'accueil sur post et plus sur login
    checkConnected() {
      if (this.$cookies.get('token')) location.replace('/post')
    }
  },
  beforeMount() {
    this.checkConnected();
  }
}
</script>

<style scoped lang="scss">

#bloc {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &v-text-field {
    width: 70%;
  }
}

</style>