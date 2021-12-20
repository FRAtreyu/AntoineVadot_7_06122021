<template>
  <v-form ref="form"  class="newPostText">
    <v-textarea
        outlined
        clearable
        counter
        clear-icon="mdi-close-circle"
        name="NewPost"
        placeholder="Ecrivez ce que vous avez en tête, mais en 255 caractères"
        :rules="rules"
        v-model="post_message"
    ></v-textarea>
    <v-btn @click="send">
      Envoyer
    </v-btn>
  </v-form>

</template>

<script>
export default {
  name: "NewPost",
  data: () => ({
    post_message: '',
    rules: [v => v.length <= 255 || 'Max 255 characters'],
  }),
  methods: {
    send() {
      console.log(this.post_message);
      (async () => {
        const response = await fetch('http://localhost:4200/api/post', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': 'bearer ' + localStorage.getItem('token')
          },
          body: JSON.stringify({
            post_message: this.post_message
          })
        })
        this.post_message='';
        this.$emit('new-post');
        return response.json();
      }) ();

    }
  }

}
</script>

<style scoped>
.newPostText {
  width: 80%;
  max-width: 640px;
}
</style>