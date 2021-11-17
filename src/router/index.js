import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Post from '../views/Post.vue'
// import Register from '../views/Register.vue'
import Support from '../views/Support.vue'
// import Page from '../views/Page.vue'
import Register from "../views/Register";
import Contact from '../views/Contact.vue';
import Survey from '../views/Survey.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register-ru',
    name: 'register-ru',
    component: Register,
  },
  {
    path: '/contact-ru',
    name: 'contact-ru',
    component: Contact
  },
  {
    path: '/survey',
    name: 'survey',
    component: Survey
  },
   {
    path: '/supportus-ru',
    name: 'supportus-ru',
    component: Support
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/post/:postId',
    name: 'post',
    component: Post
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
