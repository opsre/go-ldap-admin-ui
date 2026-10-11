import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 * hidden: true                   if true, item will not appear in the sidebar (default is false)
 * alwaysShow: true               if true, always show the root menu
 *                                if not set and an item has multiple child routes, it becomes nested; otherwise, the root menu is hidden
 * redirect: noRedirect           if set to noRedirect, no redirect is shown in the breadcrumb
 * name:'router-name'             the name used by <keep-alive> (required)
 * meta : {
    roles: ['admin','editor']    page roles (multiple roles can be set)
    title: 'title'               name shown in the sidebar and breadcrumb (recommended)
    icon: 'svg-name'/'el-icon-x' icon shown in the sidebar
    noCache: true                if true, the page is not cached (default is false)
    affix: true                  if true, the tag is fixed in the tags view
    breadcrumb: false            if false, the item is hidden from the breadcrumb (default is true)
    activeMenu: '/example/list'  path that the sidebar highlights when set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }

    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/changePass',
    name: 'changePass',
    hidden: true,
    meta: { titleKey: 'route.changePass', title: 'Forgot password', icon: 'user', noCache: true },
    component: () => import('@/views/changePassword/index')
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {

    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { titleKey: 'route.dashboard', title: 'Dashboard', icon: 'dashboard', affix: true }
      }

    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { titleKey: 'route.profile', title: 'Profile', icon: 'user', noCache: true }
      }

    ]
  },
  {
    path: '/groupUser',
    component: Layout,
    redirect: '/groupUser/userList/index',
    hidden: true,
    children: [
      {
        path: '/userList',
        component: () => import('@/views/groupUser/userList/index'),
        name: 'userList',
        meta: { titleKey: 'route.userList', title: 'Group members', icon: 'user', noCache: true }
      }
    ]

  }

]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
