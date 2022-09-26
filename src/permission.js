import router from './router'
import store from './store'
const white = ['/404', '/login']

router.beforeEach(async(to, from, next) => {
  if (store.state.user.userInfo.userId) {
    await store.dispatch('user/getUserInfo')
  }
  if (store.getters.token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (white.includes(to.path)) {
      next()
    } else {
      next({ path: '/login' })
    }
  }
})
