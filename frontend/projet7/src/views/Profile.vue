<template>
  <div class="profile">
    <div class="user__info"><span class="userInfos">Nom</span> : {{ userInfo.firstname }} {{ userInfo.lastname }}</div>
    <div class="user__info"><span class="userInfos">Pseudo</span> : {{ userInfo.pseudo }}</div>
    <div class="user__info"><span class="userInfos">Email</span> : {{ userInfo.email }}</div>
    <div class="user__info"><span class="userInfos">Nombre de posts</span> : {{ postNumber }}</div>
    <div class="user__info"><span class="userInfos">Inscrit depuis le</span> : {{ inscriptionDate }}</div>
    <v-form id="avatar_form" name="avatar_form">
      <v-file-input
          id="avatar"
          v-if="userInfo.id===userId"
          class="avatar__input"
          :rules="rules"
          accept="image/png, image/jpeg, image/bmp, image/jpg"
          placeholder="Pick an avatar"
          prepend-icon="mdi-camera"
          label="avatar"
          name="avatar"
      ></v-file-input>
    </v-form>
    <v-btn @click="setAvatar" v-if="userInfo.id===userId" class="send_avatar">Envoyer</v-btn>
    <div class="delete__user"
         v-if="this.$cookies.get('role')==='admin'&&this.$route.params.pseudo!=='admin' || userInfo.id===userId&&this.$route.params.pseudo!=='admin'">
      <v-dialog
          v-model="dialog"
          persistent
          max-width="290"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
          >
            Supprimer le compte
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="text-sm-h6">
            Désactiver ce compte ?
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="green darken-1"
                text
                @click="dialog = false"
            >
              Retour
            </v-btn>
            <v-btn
                class="mx-2 delete"
                fab
                small
                color="red"
                @click="deleteUser"
            >
              <v-icon>
                mdi-delete
              </v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </div>
    <ul class="user__posts">
      <PostCard v-for="post in postList" :key="post.id" v-bind:post="post" @update-like="setUserPosts"
                @delete-post="setUserPosts"
      ></PostCard>
    </ul>
  </div>
</template>

<script>
import PostCard from "@/components/PostCard";


export default {
  name: "Profile",
  components: {PostCard},
  props: ['pseudo'],
  data: () => ({
    userInfo: {},
    postList: [],
    rules: [
      value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
    ],
    userId: '',
    userPseudo: '',
    dialog: false
  }),

  computed: {
    postNumber() {
      return this.postList.length
    },
    inscriptionDate() {
      let date = this.userInfo.createdAt;
      return new Date(date).toLocaleDateString('fr')
    },
  },
  methods: {
    getUserInfos() {
      return fetch(`http://localhost:4200/api/user/${this.$route.params.pseudo}`,
          {
            method: 'GET',
            headers: {
              'authorization': 'bearer ' + this.$cookies.get('token')
            }
          }).then(res => res.json())
    },

    async setUserInfos() {
      this.userInfo = await this.getUserInfos();
      console.log(this.userInfo)

    },

    getUserPosts() {
      return fetch(`http://localhost:4200/api/user/${this.userInfo.id}/post`,
          {
            method: 'GET',
            headers: {
              'authorization': 'bearer ' + this.$cookies.get('token')
            }
          }).then(res => res.json())
    },
    async setUserPosts() {
      let list = await this.getUserPosts();
      this.postList = list.reverse();
      console.log(this.postList)
    },
    deleteUser() {
      (async () => {
        let deleteResponse = await fetch(`http://localhost:4200/api/user/${this.userInfo.id}`,
            {
              method: 'DELETE',
              headers: {
                'authorization': 'bearer ' + this.$cookies.get('token')
              }
            })
          localStorage.clear();
          this.$cookies.remove('token');
          this.$cookies.remove('role');
          this.$router.push({name: 'Login'});
        location.reload();
        return deleteResponse
      })();
    },

    setAvatar() {
      let avatarForm = document.getElementById('avatar_form');
      let formData = new FormData(avatarForm);
      console.log(formData);
      (async () => {
        const putResponse = await fetch(`http://localhost:4200/api/user/${this.userInfo.id}/upload`,
            {
              method: 'PUT',
              headers: {
                'authorization': 'bearer ' + this.$cookies.get('token')
              },
              body: formData
            }).then(res => res.json());
        location.reload();
        return putResponse;
      })();

    }

  },
  async created() {
    this.userPseudo = this.$route.params.pseudo;
    await this.setUserInfos()
    await this.setUserPosts()
    this.userId = Number(localStorage.getItem('userId'))
  },

  async mounted() {
    this.userPseudo = this.$route.params.pseudo;
    await this.setUserInfos()
    await this.setUserPosts()
    this.userId = Number(localStorage.getItem('userId'))
  }


}

</script>

<style scoped>
.avatar__input {
  width: 200px;
}

.profile {
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.user__posts {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
}

.send_avatar {
  width: 90px;
}

.userInfos {
  color: black !important;
  text-decoration: underline;
  font-size: large;
}

.delete__user {
  margin-top: 50px;
  font-weight: bold;
}

</style>