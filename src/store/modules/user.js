import { login } from '@/api/login'
import { getUserInfo } from '@/api/user'
export default {
  namespaced: true,
  state: {
    token: null,
    userInfo: {}
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    // 设置用户信息
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
    },
    // 删除用户信息
    RMOVE_USER_INFO(state) {
      state.userInfo = {}
    }
  },
  actions: {
    async loginAction({ commit }, loginData) {
      const data = await login(loginData)
      commit('SET_TOKEN', data)
    },
    async getUserInfo({ commit }) {
      // 接口请求
      const res = await getUserInfo()
      commit('SET_USER_INFO', res)
      return JSON.parse(JSON.stringify(res))
    }
  }
}
