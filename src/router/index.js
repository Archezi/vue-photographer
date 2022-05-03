import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

// auth guard

// import projectAuth from '@/firebase/projectAuth'

// const requireAuth = (to, from, next) => {
//   let user = projectAuth.currentUser
//   if (!user) {
//     next({
//       name: 'login'
//     })
//   } else {
//     next()
//   }
// }

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/auth/Login.vue')
  },
  {
    path: '/weddings',
    name: 'Weddings',
    component: () => import('../views/weddings/Weddings.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
