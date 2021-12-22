<template>
  <v-form ref="form"  class="newCommentText">
    <v-textarea
        outlined
        clearable
        counter
        dense
        clear-icon="mdi-close-circle"
        name="NewPost"
        placeholder="Commentaire"
        :rules="rules"
        v-model="comment_message"
    ></v-textarea>
    <v-btn @click="send">
      Envoyer
    </v-btn>
  </v-form>
</template>

<script>
export default {
  name: "NewComment",
  props:['post_id'],
  data: () => ({
    comment_message: '',
    rules: [v => v.length <= 255 || 'Max 255 characters'],
  }),
  methods: {
    send() {
      console.log(this.comment_message);
      (async () => {
        const response = await fetch(`http://localhost:4200/api/post/${this.post_id}/comment`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': 'bearer ' + localStorage.getItem('token')
          },
          body: JSON.stringify({
            comment_message: this.comment_message
          })
        })
        this.comment_message='';
        this.$emit('new-comment')
        return response.json();
      }) ();

    }
  }
}
</script>

<style scoped>
.newCommentText {
  width: 80%;
  margin-bottom: 10px;
}
</style>