<template>
  <v-lazy class="v-card__post">
    <v-card elevation="6" shaped>
      <v-card-title>{{ user_pseudo }}</v-card-title>
      <v-card-subtitle>{{ user_name }}</v-card-subtitle>
      <v-card-text>{{ post_message }}</v-card-text>
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
        <v-card-actions v-if="user_role==='admin'">
          <v-btn
              class="mx-2 delete"
              fab
              small
              color="primary"
              @click="deletePost"
          >
            <v-icon>
              mdi-delete
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
  props: ['user_id','post_message', 'post_id'],
  data: () => ({
    user_name: 'user_name',
    user_pseudo: 'user_pseudo',
    userId: '',
    user_role: localStorage.getItem('role')
  }),
  computed: {
    getUserId() {
     return  Number(this.user_id);
    }
  },
  methods: {
    setUserId () {
      this.userId = this.getUserId;
    },
    getUserInfos (fetchUrl) {
      return fetch(fetchUrl,{
        method: 'GET',
        headers: {
          'authorization' : 'bearer '+localStorage.getItem('token')
        }
      }).then( (res) => res.json())
    },
    async setUserInfos() {
      let userId = this.getUserId;
      let fetchUrl = 'http://localhost:4200/api/user/'+userId;
      let userInfos = await this.getUserInfos(fetchUrl);
      console.log(userInfos);
      this.user_name= userInfos.firstname+' '+userInfos.lastname;
      this.user_pseudo=userInfos.pseudo;

    },
    deletePost () {
      ( async () => {
        const deleteResponse = await fetch(`http://localhost:4200/api/post/${this.post_id}`,
            {
              method: 'DELETE',
              headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization' : 'bearer '+localStorage.getItem('token')
              }
            });
        this.$emit('delete-post');
        return deleteResponse
      }) ();

    },

    getPostLikes() {


    },

    like() {

    }

  },
  beforeMount() {
    this.setUserInfos();
  }
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