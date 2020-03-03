import { constantRouterMap } from '@/router'
import { getCurrentUserRoutes } from '@/api/role'
import Layout from '@/views/layout/Layout'
import { getToken } from '@/utils/auth'

function generateNewRouterMap(roleRoutes) {
  const res = []
  for (const router of roleRoutes) {
    router.hidden = false
    if (router.component.indexOf('Layout') >= 0) {
      router.component = Layout
    } else {
      const p = router.component
      router.component = () => import(`@/views${p}`)
    }
    if (router.children) {
      generateNewRouterMap(router.children)
    }
    if (!(router.children == null || router.children === '' || router.children.length === 0)) {
      res.push(router)
    }
  }
  return res
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }) {
      return new Promise(resolve => {
        getCurrentUserRoutes(getToken()).then(response => {
          commit('SET_ROUTERS', generateNewRouterMap(response.data.data))
          resolve()
        })
      })
    }
  }
}

export default permission
