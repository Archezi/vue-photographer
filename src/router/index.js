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
    path: '/navigation',
    name: 'Navigation',
    component: () => import('../views/navigation/Navigation.vue')
  },
  {
    path: '/families',
    name: 'families',
    component: () => import('../views/family/FamiliesCollections.vue')
  },
  {
    path: '/families/:id',
    name: 'Family',
    props: true,
    component: () => import('../views/family/FamilyDetails.vue')
  },
  {
    path: '/portraits',
    name: 'Portraits',
    component: () => import('../views/portraits/PortraitsCollections.vue')
  },
  {
    path: '/portraits/:id',
    name: 'Portrait',
    props: true,
    component: () => import('../views/portraits/PortraitDetails.vue')
  },
  {
    path: '/weddings',
    name: 'Weddings',
    component: () => import('../views/weddings/WeddingsCollections.vue')
  },
  {
    path: '/weddings/:id',
    name: 'Wedding',
    props: true,
    component: () => import('../views/weddings/WeddingsDetails.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/about/About.vue')
  },
  {
    path: '/commercials',
    name: 'Commercials',
    component: () => import('../views/commercial/CommercialsCollections.vue')
  },
  {
    path: '/commercial/:id',
    name: 'Commercial',
    props: true,
    component: () => import('../views/commercial/CommercialDetails.vue')
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
