<template>
  <v-form ref="form" v-model="form" class="newPostText">
    <v-textarea
        outlined
        clearable
        counter
        clear-icon="mdi-close-circle"
        name="NewPost"
        value=""
        placeholder="Ecrivez ce que vous avez en tête, mais en 255 caractères"
        :rules="rules"
    ></v-textarea>
    <v-btn>
      Envoyer
    </v-btn>
  </v-form>

</template>

<script>
export default {
  name: "NewPost",
  data: () => ({
    rules: [v => v.length <= 255 || 'Max 255 characters'],
  }),

}
</script>

<style scoped>
.newPostText {
  width: 80%;
}
</style>