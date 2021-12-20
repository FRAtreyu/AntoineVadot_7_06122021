<template>
<div class="profile">
  <div class="user__info">User Name</div>
  <div class="user__info">User Pseudo</div>
  <div class="user__info">User mail</div>
  <div class="user__info">Number of posts liked</div>
  <div class="user__info">Number of posts commented</div>
  <ul class="user__posts">
    <post-card>
    </post-card>
  </ul>
</div>
</template>

<script>
import PostCard from "@/components/PostCard";

export default {
  name: "Profile",
  components: {PostCard}
}
</script>

<style scoped>

</style>