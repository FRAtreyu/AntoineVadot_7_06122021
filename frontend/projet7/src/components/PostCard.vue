<template>
  <div class="post">
    <v-lazy class="v-card__post">
      <v-card elevation="6" shaped>
        <router-link :to="{name: 'Profile', params: {pseudo: post.user.pseudo}}">
          <v-card-title class="post__card__title">
            <Avatar :avatar_url="post.user.avatar_url"></Avatar>
            {{ post.user.pseudo }}
          </v-card-title>
        </router-link>
        <v-card-subtitle>Le {{ postDate }} à {{ postTime }}</v-card-subtitle>
        <v-card-text class="post_text">{{ post.post_message }}</v-card-text>
        <div class="v-card__actions">
          <v-card-actions class="actions__icons">
            <v-btn
                class="mx-2 like__btn"
                fab
                small
                color=#68AB68
                @click="likePost"
            >
              <v-icon>
                mdi-plus
              </v-icon>
            </v-btn>
            <div class="likes">{{ countLikes }}</div>
          </v-card-actions>
          <v-card-actions class="actions__icons">
            <v-btn
                class="mx-2"
                fab
                small
                color=#AB6868
                @click="dislikePost"
            >
              <v-icon>
                mdi-minus
              </v-icon>
            </v-btn>
            <div class="dislikes">{{ countDislikes }}</div>
          </v-card-actions>
          <v-card-actions v-if="getRole==='admin' || userId===Number(post.user.id)" class="actions__icons">
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
        <v-expansion-panels>
          <v-expansion-panel class="comment__panel">
            <v-expansion-panel-header
                disable-icon-rotate
                hide-actions
                class="comment__panel">
              Voir les {{ commentList.length }} commentaires
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <NewComment :post_id="post.id" @new-comment="setCommentList"></NewComment>
              <v-divider></v-divider>
              <ul v-for="comment in commentList" :key="comment.id">
                <v-card elevation="5" shaped class="comment">
                  <router-link :to="{name: 'Profile', params: {pseudo: post.user.pseudo}}">
                    <v-card-title class="post__card__title">
                      <Avatar :avatar_url="comment.user.avatar_url"></Avatar>
                      {{ comment.user.pseudo }}
                    </v-card-title>
                  </router-link>
                  <v-card-subtitle>le {{ commentDate(comment) }} à {{ commentTime(comment) }}</v-card-subtitle>
                  <v-card-text class="post_text">{{ comment.comment_message }}</v-card-text>
                  <v-card-actions v-if="getRole==='admin'|| userId===Number(comment.user.id)" class="actions__icons">
                    <v-btn
                        class="mx-2 delete"
                        fab
                        small
                        color="red"
                        @click="deleteComment(comment.id)"
                    >
                      <v-icon>
                        mdi-delete
                      </v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
                <v-divider></v-divider>
              </ul>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card>
    </v-lazy>
  </div>
</template>

<script>
import NewComment from "@/components/NewComment";

import Avatar from "@/components/Avatar";

export default {
  name: "PostCard",
  components: {
    Avatar,
    NewComment
  },
  props: ['post'],
  data: () => ({
    userId: Number(localStorage.getItem('userId')),
    likes: 0,
    dislikes: 0,
    commentList: [],
  }),
  computed: {
    countLikes() {
      let likesArray = this.post.likes;
      let totalLikes = 0;
      for (const likesArrayElement of likesArray) {
        if (likesArrayElement.like_value === 1) totalLikes++;
      }
      return totalLikes;

    },
    countDislikes() {
      let likesArray = this.post.likes;
      let totalDislikes = 0;
      for (const likes of likesArray) {
        if (likes.like_value === -1) totalDislikes++;
      }
      return totalDislikes;
    },
    postDate() {
      let date = this.post.createdAt;
      return new Date(date).toLocaleDateString('fr')
    },
    postTime() {
      let time = this.post.createdAt;
      return new Date(time).toLocaleTimeString('fr')
    },
    getRole() {
      return this.$cookies.get('role')
    }


  },
  methods: {
    deletePost() {
      (async () => {
        const deleteResponse = await fetch(`http://localhost:4200/api/post/${this.post.id}`,
            {
              method: 'DELETE',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': 'bearer ' + this.$cookies.get('token')
              }
            });
        this.$emit('delete-post');
        return deleteResponse
      })();

    },
    deleteComment(commentId) {
      (async () => {
        const deleteResponse = await fetch(`http://localhost:4200/api/post/comment/${commentId}`,
            {
              method: 'DELETE',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': 'bearer ' + this.$cookies.get('token')
              }
            });
        await this.setCommentList();
        return deleteResponse
      })();
    },
    likePost() {
      (async () => {
        const likeResponse = await fetch(`http://localhost:4200/api/post/${this.post.id}/like`,
            {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': 'bearer ' + this.$cookies.get('token')
              },
              body: JSON.stringify({
                like_value: 1
              })
            }
        );
        this.$emit('update-like')
        return likeResponse.json()
      })();
    },
    dislikePost() {
      (async () => {
        const dislikeResponse = await fetch(`http://localhost:4200/api/post/${this.post.id}/like`,
            {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': 'bearer ' + this.$cookies.get('token')
              },
              body: JSON.stringify({
                like_value: -1
              })
            }
        );
        this.$emit('update-like')
        return dislikeResponse.json()
      })();
    },

    setLikes() {
      this.likes = this.countLikes;
      this.dislikes = this.countDislikes
    },

    async setCommentList() {
      this.commentList = await fetch(`http://localhost:4200/api/post/${this.post.id}/comment`,
          {
            method: 'GET',
            headers: {
              'authorization': 'bearer ' + this.$cookies.get('token')
            }
          }).then(res => res.json())
    },
    commentDate(comment) {
      let date = comment.createdAt;
      return new Date(date).toLocaleDateString('fr')
    },
    commentTime(comment) {
      let time = comment.createdAt;
      return new Date(time).toLocaleTimeString('fr')
    }

  },

  created() {
    this.setLikes()
    this.setCommentList()
  },

}


</script>

<style scoped lang="scss">
@import "src/styles/variables";

.v-card__post {
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;

}

.post {
  width: 90%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  padding-top: 15px;
}

.v-card__actions, {
  display: flex;
  padding: 10px 0;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
}

.v-expansion-panels, .v-expansion-panel, .v-expansion-panel-header, .v-expansion-panel-content {
  display: flex;
  flex-direction: column;
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

.comment {
  margin: 5px;
}

.post_text {
  color: black !important;
  font-size: large;
}

.post__card__title {
  background-color: $primary-color;
  color: #FCEA67;
  border-radius: 15px 0 15px 0;
}

.comment__panel {
  background-color: #d9d9ea;
  border-radius: 15px 0 15px 0;
}
</style>