<template>
  <v-lazy class="v-card__post">
    <v-card elevation="6" shaped >
      <v-card-title>Post User Pseudo</v-card-title>
      <v-card-subtitle>Post User name</v-card-subtitle>
      <v-card-text>Post message</v-card-text>
      <div class="v-card__actions">
        <v-card-actions>
          <v-btn
              class="mx-2 like__btn"
              fab
              small
              color="primary"
              @click="like"
          >
            <v-icon>
              mdi-plus
            </v-icon>
          </v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-btn
              class="mx-2"
              fab
              small
              dark
              color="red"
          >
            <v-icon>
              mdi-minus
            </v-icon>
          </v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-btn
              class="mx-2"
              fab
              small
              color="primary"
          >
            <v-icon>
              mdi-message-text
            </v-icon>
          </v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </v-lazy>
</template>

<script>


export default {
  name: "PostCard",
  data :() =>({

}),
  components: {},

  methods:{
    //like: function (event){
      //fetch(//post like api/post/:id/like value 1, userId,
     // )
    },
    //dislike: function (event){

    //}
 // }
}

</script>

<style scoped>
.v-card__post {
  width: 80%;
  display: flex;
  flex-direction: column;
  padding-top: 15px;
}

.v-card__actions {
  display: flex;

}
</style>