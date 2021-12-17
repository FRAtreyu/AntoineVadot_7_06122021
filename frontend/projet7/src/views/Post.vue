<template>
  <div class="home">
    <NewPost></NewPost>
    <ul>
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


function getAllPosts(){
  return fetch('http://localhost:4200/api/post/',{
    method: 'GET',
    headers: {
      'authorization': 'bearer '+sessionStorage.getItem('token')
    }
  })
      .then(
          res => res.json()
      )
}

export default {
  name: 'Post',
  data: () => ({
    postList: []
  }),
  async beforeCreate() {
      this.postList= await getAllPosts();
      console.log(this.postList);
  },
  components: {
    PostCard,
    NewPost
  },
  methods: {


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
ul{
  list-style-type: none;
   min-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

li{
  width: 100%;
  display: flex;
  justify-content: center;
}


</style>