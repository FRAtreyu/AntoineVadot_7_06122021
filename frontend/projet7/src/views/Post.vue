<template>
  <div class="home">
    <NewPost></NewPost>
    <ul v-if="postList.length!==0">
      <li v-for="post in postList" :key="post.id">
        <PostCard :user_id="post.user_id"
                  :post_message="post.post_message"
        ></PostCard>
      </li>
    </ul>
  </div>
</template>
<script>
import PostCard from "@/components/PostCard";
import NewPost from "@/components/NewPost";

export default {
  name: 'Post',
  data: () => ({
    postList: []
  }),
  components: {
    PostCard,
    NewPost
  },
  methods: {
    getAllPosts() {
      return fetch('http://localhost:4200/api/post/', {
        method: 'GET',
        headers: {
          'authorization': 'bearer ' + localStorage.getItem('token')
        }
      })
          .then(
              res => res.json()
          )
    },

    async setPostList() {
      this.postList = await this.getAllPosts();
      console.log(this.postList);
    }

  },
  created() {
    this.setPostList()
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
  width: 100%;
}

ul {
  list-style-type: none;
  min-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

li {
  width: 100%;
  display: flex;
  justify-content: center;
}


</style>