<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <sidebar-item v-for="route in permission_routers" :key="route.name" :item="route" :base-path="route.path"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
// import { getCurrentUserRoutes } from '@/api/role'
// import Layout from '@/views/layout/Layout'
// import { getToken } from '@/utils/auth'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  data() {
    return {
      my_routers: []
    }
  },
  created() {
    // this.getList()
  },
  methods: {
    /* getList() {
      getCurrentUserRoutes(getToken()).then(response => {
        this.my_routers = response.data.data
        this.my_routers = this.generateNewRouterMap(this.my_routers)
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1000)
      })
    },
    generateNewRouterMap(roleRoutes) {
      const res = []
      for (const router of roleRoutes) {
        router.hidden = false
        if (router.component.indexOf('Layout') >= 0) {
          router.component = Layout
        } else {
          router.component = () => import('@' + router.component)
        }
        if (router.children) {
          this.generateNewRouterMap(router.children)
        }
        if (!(router.children == null || router.children === '' || router.children.length === 0)) {
          res.push(router)
        }
      }
      return res
    } */

  }
}
</script>
