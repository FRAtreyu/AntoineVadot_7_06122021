<template>
  <div id="bloc">
    <v-text-field type="email" v-model="email" name="email" placeholder="E-mail"></v-text-field>
    <v-text-field type="password" v-model="password" name="password" placeholder="Mot de passe"></v-text-field>
    <v-btn @click="send()">Login</v-btn>
  </div>
</template>

<script>
import { mapState, mapActions} from 'vuex';

export default {
  name: "Login",
  data: () => ({
    email: '',
    password: ''
  }),
  computed: {
    ...mapState(['userConnected']),

  },
  methods: {
    ...mapActions(['connectUser']),

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
        if(content.userId){
          this.connectUser();
          await this.$router.push({name: 'Post'})
        } else alert('Mot de passe ou identifiant incorrect')

        console.log(this.userConnected);
        sessionStorage.setItem('userId', content.userId);
        sessionStorage.setItem('token', content.token);
      })();
    }
  }
}
</script>

<style scoped lang="scss">

#bloc{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &v-text-field{
    width: 70%;
  }
}

</style>