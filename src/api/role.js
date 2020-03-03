import request from '@/utils/request'
// 获取当前用户拥有菜单树的对象
export function getCurrentUserRoutes(token) {
  return request({
    url: '/eoms/role/getCurrentUserRoutes?token=' + token,
    // headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    method: 'post'
  })
}
