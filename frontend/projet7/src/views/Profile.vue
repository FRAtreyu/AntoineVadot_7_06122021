<template>
  <div class="profile">
    <div class="user__info">{{ userInfo.lastname }}</div>
    <div class="user__info">{{ userInfo.pseudo }}</div>
    <div class="user__info">{{ userInfo.email }}</div>
    <ul class="user__posts">
      <PostCard v-for="post in postList" v-bind:post="post" :key="post.id"
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
        return  fetch(`http://localhost:4200/api/user/${this.userInfo.id}/post`,
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