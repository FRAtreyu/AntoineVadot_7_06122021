<template>
  <div class="home">
    <PostCard></PostCard>
  </div>
</template>
<script>
import PostCard from "@/components/PostCard";

export default {
  name: 'Profil',
  components: {
    PostCard
  }
}
</script>
<style scoped>
.home {
  display: flex;
  justify-content: center;
}

</style>