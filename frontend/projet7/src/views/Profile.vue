<template>
  <div class="profile">
    <div class="user__info">Nom: {{userInfo.firstname}} {{ userInfo.lastname }} </div>
    <div class="user__info">Pseudo: {{ userInfo.pseudo }}</div>
    <div class="user__info">Email: {{ userInfo.email }}</div>
    <v-file-input
        class="avatar__input"
        :rules="rules"
        accept="image/png, image/jpeg, image/bmp"
        placeholder="Pick an avatar"
        prepend-icon="mdi-camera"
        label="Avatar"
        name="avatar"
    ></v-file-input>
    <v-btn
        v-if="this.$cookies.get('role')==='admin'&&this.$route.params.pseudo!=='admin_pseudo'"
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
    <ul class="user__posts">
      <PostCard v-for="post in postList" v-bind:post="post" :key="post.id" @update-like="setUserPosts" @delete-post="setUserPosts"
      ></PostCard>
    </ul>
  </div>
</template>

<script>
import PostCard from "@/components/PostCard";

export default {
  name: "Profile",
  components: { PostCard},
  props: ['pseudo'],
  data: () => ({
    userInfo: {},
    postList: [],
    rules: [
      value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
    ]
  }),

  computed: {
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
        return await fetch(`http://localhost:4200/api/user/${this.userInfo.id}`,
            {
              method: 'DELETE',
              headers: {
                'authorization': 'bearer ' + this.$cookies.get('token')
              }
            }).then(() => {
          location.assign('/post');
        })
      })();
    }

  },
  async created() {
    console.log(this.$route.params.pseudo)
    await this.setUserInfos()
    await this.setUserPosts()
  },

}

</script>

<style scoped>
.avatar__input{
  width: 200px;
}
</style>