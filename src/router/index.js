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
    path: '/family',
    name: 'Family',
    component: () => import('../views/family/Family.vue')
  },
  {
    path: '/portraits',
    name: 'Portraits',
    component: () => import('../views/portraits/Portraits.vue')
  },
  {
    path: '/weddings',
    name: 'Weddings',
    component: () => import('../views/weddings/WeddingsCollections.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/about/About.vue')
  },
  {
    path: '/navigation',
    name: 'Navigation',
    component: () => import('../views/navigation/Navigation.vue')
  },
  {
    path: '/commercial',
    name: 'Commercial',
    component: () => import('../views/commercial/Commercial.vue')
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('../views/products/ProductsCollection.vue')
  },
  {
    path: '/products/:id',
    name: 'Product',
    props: true,
    component: () => import('../views/products/ProductDetails.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
