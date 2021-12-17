import Vue from 'vue'
import VueRouter from 'vue-router'
import Post from '../views/Post.vue'
import Signup from "@/views/Signup";
import Login from "@/views/Login";
import Profile from "@/views/Profile";

Vue.use(VueRouter)

const routes = [
  {
    path: '/post',
    name: 'Post',
    component: Post
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/',
    name: 'Login',
    component: Login
  }


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
