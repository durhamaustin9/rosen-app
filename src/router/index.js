import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    meta: {
      authRequired: true
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: require('@/views/home').default,
    meta: {
      authRequired: true,
      navbar: true
    }
  },
  {
    path: '/signin',
    name: 'Sign in',
    component: require('@/views/signin').default,
    meta: {
      authRequired: false,
      navbar: false
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.fullPath === '/' && token) {
    next({ path: '/home' })
  } else if (to.matched.some(route => route.meta.authRequired && !token)) {
    next({ path: '/signin' })
  } else {
    next()
  }
})

export default router
