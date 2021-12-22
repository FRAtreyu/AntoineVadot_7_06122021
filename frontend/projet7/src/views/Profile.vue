<template>
  <div class="profile">
    <div class="user__info">Nom:{{ userInfo.lastname }} {{userInfo.firstname}}</div>
    <div class="user__info">Pseudo:{{ userInfo.pseudo }}</div>
    <div class="user__info">Email:{{ userInfo.email }}</div>
    <v-btn
        v-if="userRole==='admin'&&this.$route.params.pseudo!=='admin_pseudo'"
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
      <PostCard v-for="post in postList" v-bind:post="post" :key="post.id" @update-like="setUserPosts"
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
    userRole: localStorage.getItem('role')
  }),
  methods: {
    getUserInfos() {
      return fetch(`http://localhost:4200/api/user/${this.$route.params.pseudo}`,
          {
            method: 'GET',
            headers: {
              'authorization': 'bearer ' + localStorage.getItem('token')
            }
          }).then(res => res.json())
    },

    async setUserInfos() {
      this.userInfo = await this.getUserInfos()
      console.log(this.userInfo)
    },

    getUserPosts() {
      return fetch(`http://localhost:4200/api/user/${this.userInfo.id}/post`,
          {
            method: 'GET',
            headers: {
              'authorization': 'bearer ' + localStorage.getItem('token')
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
                'authorization': 'bearer ' + localStorage.getItem('token')
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
  }
}

</script>

<style scoped>

</style>