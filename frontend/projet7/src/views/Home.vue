<template>
  <div class="home">
    <NewPost></NewPost>
    <PostCard></PostCard>
  </div>
</template>
<script>
import PostCard from "@/components/PostCard";
import NewPost from "@/components/NewPost";

export default {
  name: 'Profil',
  components: {
    PostCard,
    NewPost
  }
}
</script>
<style scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 25px;
}

</style>