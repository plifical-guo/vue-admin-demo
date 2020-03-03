import { loginByUsername, logout, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    buttons: null,
    allbuttons: null,
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_BUTTONS: (state, buttons) => {
      state.buttons = buttons
    },
    SET_ALL_BUTTONS: (state, allbuttons) => {
      state.allbuttons = allbuttons
    }
  },

  actions: {
    /* 用户登陆 */
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password)
          .then(response => {
            if (response.data.code === 200) {
              const data = response.data.data
              commit('SET_TOKEN', data.token)
              localStorage.setItem('BUTTONS', JSON.stringify(data.buttonAuthorityMap))
              localStorage.setItem('ALL_BUTTONS', JSON.stringify(data.allButton))

              commit('SET_NAME', data.loginName)
              commit('SET_ROLES', data.roles)
              commit('SET_INTRODUCTION', data.loginName)

              setToken(data.token)
            }
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    /**
     * 动态刷新图标
     */
    DynamicIcon({ commit, state }) {
      commit('SET_AVATAR', 'static/tinymce4.7.5/skins/lightgray/img/f778738c-e4f8-4870-b634-56703b4acafe.gif')
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token)
          .then(() => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          // const data = response.data
          const data = response.data.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          // commit('SET_AVATAR', data.avatar)
          commit('SET_AVATAR', 'static/tinymce4.7.5/skins/lightgray/img/f778738c-e4f8-4870-b634-56703b4acafe.gif')
          commit('SET_INTRODUCTION', data.introduction)
          resolve()
        })
      })
    }
  }
}

export default user
