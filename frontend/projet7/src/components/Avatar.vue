<template>
  <div>
  <v-avatar>
    <v-img :src="avatarUrl" alt="avatar"></v-img>
  </v-avatar>
  </div>
</template>

<script>
export default {
  name: "Avatar",
  props: ['avatar_url'],
  data : () =>({
    avatarUrl : ''
  }),

  methods: {
    setAvatarUrl()
    {
      if(this.avatar_url.length===0){
        let avatarUrl = this.avatar_url;
        console.log(avatarUrl);
        let imageUrl = avatarUrl.split('.')[1] + "." + avatarUrl.split('.')[2];
        this.avatarUrl= "http://localhost:4200" + imageUrl;
      } else this.avatar_url="https://www.google.com/url?sa=i&url=https%3A%2F%2Ffindicons.com%2Fsearch%2Favatar&psig=AOvVaw2fmAb58fzI8GPOJyPc2iuA&ust=1640344835563000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJDrkOzm-fQCFQAAAAAdAAAAABAJ"

    }
  },
  created() {
    this.setAvatarUrl()
  },

  updated() {
    this.setAvatarUrl()
  }
}
</script>

<style scoped>

</style>