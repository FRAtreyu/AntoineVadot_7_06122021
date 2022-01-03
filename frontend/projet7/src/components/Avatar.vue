<template>
  <div class="avatar">
    <v-avatar>
      <v-img :src="avatarUrl" alt="avatar"></v-img>
    </v-avatar>
  </div>
</template>

<script>
export default {
  name: "Avatar",
  props: ['avatar_url'],
  data: () => ({
    avatarUrl: ''
  }),

  methods: {
    setAvatarUrl() {
      let avatarUrl = this.avatar_url;
      console.log(avatarUrl);
      let imageUrl = avatarUrl.split('.')[1] + "." + avatarUrl.split('.')[2];
      this.avatarUrl = "http://localhost:4200" + imageUrl;

    }
  },
  created() {
    this.setAvatarUrl()
  },

}
</script>

<style scoped>
.avatar {
  padding-right: 15px;
}
</style>