<template>
  <v-lazy class="v-card__post" :key="card_key" @like-update="card_key++">
    <v-card elevation="6" shaped>
      <router-link :to="{name: 'Profile', params: {pseudo: post.user.pseudo}}">
        <v-card-title>{{ post.user.pseudo }}</v-card-title>
      </router-link>
      <v-card-subtitle>{{ post.user.lastname }}</v-card-subtitle>
      <v-card-text>{{ post.post_message }}</v-card-text>
      <div class="v-card__actions">
        <v-card-actions class="actions__icons">
          <v-btn
              class="mx-2 like__btn"
              fab
              small
              color="primary"
              @click="updateLikes"
          >
            <v-icon>
              mdi-plus
            </v-icon>
          </v-btn>
          <div class="likes">{{ likes }}</div>
        </v-card-actions>
        <v-card-actions class="actions__icons">
          <v-btn
              class="mx-2"
              fab
              small
              dark
              color="red"
              @click="updateDislikes"
          >
            <v-icon>
              mdi-minus
            </v-icon>
          </v-btn>
          <div class="dislikes">{{ dislikes }}</div>
        </v-card-actions>
        <v-card-actions class="actions__icons">
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
        <v-card-actions v-if="user_role==='admin'" class="actions__icons">
          <v-btn
              class="mx-2 delete"
              fab
              small
              color="red"
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
  props: ['post'],
  data: () => ({
    userId: localStorage.getItem('userId'),
    user_role: localStorage.getItem('role'),
    likes: 0,
    dislikes: 0,
    card_key: 0
  }),
  computed: {},
  methods: {
    deletePost() {
      (async () => {
        const deleteResponse = await fetch(`http://localhost:4200/api/post/${this.post.id}`,
            {
              method: 'DELETE',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': 'bearer ' + localStorage.getItem('token')
              }
            });
        this.$emit('delete-post');
        return deleteResponse
      })();

    },
    likePost() {
      return fetch(`http://localhost:4200/api/post/${this.post.id}/like`,
          {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'authorization': 'bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
              like_value: 1
            })
          }
      ).then(res => res.json())
    },
    dislikePost() {
      return fetch(`http://localhost:4200/api/post/${this.post.id}/like`,
          {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'authorization': 'bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
              like_value: -1
            })
          }
      ).then(res => res.json())
    },
    countLikes() {
      let likesArray = this.post.likes;
      let totalLikes = 0;
      for (const likesArrayElement of likesArray) {
        if (likesArrayElement.like_value === 1) totalLikes++;
      }
      return  totalLikes;

    },
    countDislikes() {
      let likesArray = this.post.likes;
      let totalDislikes = 0;
      for (const likes of likesArray) {
        if (likes.like_value === -1) totalDislikes++;
      }
      return totalDislikes;
    },
    async updateLikes() {
      await this.likePost().then(()=>{
        this.likes = this.countLikes();
      });
      await this.$nextTick(()=> this.$emit('like-update'));
    },
    async updateDislikes(){
      await this.dislikePost().then(async ()=>{
        this.dislikes = await this.countDislikes()
      });
      await this.$nextTick(()=> this.$emit('like-update'));
    }

  },

  created() {
    this.likes = this.countLikes();
    this.dislikes = this.countDislikes();
  },

  updated() {
    this.likes = this.countLikes();
    this.dislikes = this.countDislikes();
  }

}


</script>

<style scoped lang="scss">
.v-card__post {
  width: 90%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  padding-top: 15px;
}

.v-card__actions {
  display: flex;
  padding: 10px 0;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
}

.v-card-actions {
  display: flex;
  flex-direction: row;
  max-width: 15%;
}

.actions__icons {
  max-width: 90px;
}

.likes {
  color: black;
}
</style>