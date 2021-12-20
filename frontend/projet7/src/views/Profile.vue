<template>
  <div class="profile">
    <div class="user__info">{{user_name}}</div>
    <div class="user__info">{{user_pseudo}}</div>
    <div class="user__info">{{ user_mail }}</div>
    <ul class="user__posts">
    </ul>
  </div>
</template>

<script>


export default {
  name: "Profile",
  props: ['id'],
  data: () => ({
    user_name: '',
    user_pseudo: '',
    user_mail: ''
  }),
  methods: {
    getUserInfos() {
        return fetch(`http://localhost:4200/api/user/${this.id}`,
            {
              method: 'GET',
              headers: {
                'authorization': 'bearer ' + localStorage.getItem('token')
              }
            })
    },
    async setUserInfo(){
      let userInfo = await this.getUserInfos();
      console.log(userInfo);
      this.user_name=userInfo.firstname+' '+userInfo.lastname;
      this.user_pseudo= userInfo.pseudo;
      this.user_mail=userInfo.email
    },

    getUserPosts() {
      (async () => {
        return await fetch(`http://localhost:4200/api/user/${this.id}/post`,
            {
              method: 'GET',
              headers: {
                'authorization': 'bearer ' + localStorage.getItem('token')
              }
            })
      })();
    }
  },
  mounted() {
    this.setUserInfo();
  }
}
</script>

<style scoped>

</style>