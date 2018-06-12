import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/** note: submenu only apppear when children.length>=1
*   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
**/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },

  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index'),
      name: 'dashboard',
      meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
    }]
  },
  {
    path: '/documentation',
    component: Layout,
    redirect: '/documentation/index',
    children: [{
      path: 'index',
      component: _import('documentation/index'),
      name: 'documentation',
      meta: { title: 'documentation', icon: 'documentation', noCache: true }
    }],
    hidden: true
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/system',
    component: Layout,
    redirect: 'noredirect',
    name: 'system',
    meta: {
      title: 'system',
      icon: 'clipboard',
      roles: ['super_admin', 'common_admin', 'common_admin_child']
    },
    children: [
      { path: 'customer/myaccount', component: _import('customer/myaccount'), name: 'customer-myaccount', meta: { title: 'my_account', icon: 'table', roles: ['super_admin', 'common_admin', 'common_admin_child'] }},
      { path: 'customer/account', component: _import('customer/account'), name: 'customer-account', meta: { title: 'account_list', icon: 'table', roles: ['super_admin'] }},
      { path: 'customer/resource', component: _import('customer/resource'), name: 'customer-resource', meta: { title: 'account_resource', icon: 'clipboard', roles: ['super_admin'] }},
      { path: 'customer/resourcegroup', component: _import('customer/resourcegroup'), name: 'customer-resource-group', meta: { title: 'account_resource_group', icon: 'excel', roles: ['super_admin'] }},
      { path: 'customer/role', component: _import('customer/role'), name: 'customer-role', meta: { title: 'role', icon: 'lock', roles: ['super_admin', 'common_admin'] }}
    ]
  },
  {
    path: '/common',
    component: Layout,
    redirect: 'noredirect',
    name: 'common',
    meta: {
      title: 'common',
      icon: 'clipboard',
      roles: ['super_admin', 'common_admin', 'common_admin_child']
    },
    children: [
      { path: 'common/website', component: _import('common/website'), name: 'common-website', meta: { title: 'common_website', icon: 'international', roles: ['super_admin', 'common_admin', 'common_admin_child'] }},
      { path: 'common/channel', component: _import('common/channel'), name: 'common-channel', meta: { title: 'common_channel', icon: 'table', roles: ['super_admin', 'common_admin', 'common_admin_child'] }},
      { path: 'common/marketgroup', component: _import('common/marketgroup'), name: 'common-marketgroup', meta: { title: 'common_marketgroup', icon: 'peoples', roles: ['super_admin', 'common_admin', 'common_admin_child'] }},
      { path: 'customer/accountchild', component: _import('customer/accountchild'), name: 'customer-account-child', meta: { title: 'customer_account_child', icon: 'people', roles: ['super_admin', 'common_admin', 'common_admin_child'] }}
    ]
  },
  {
    path: '/advertise',
    component: Layout,
    redirect: 'noredirect',
    name: 'advertise',
    meta: {
      title: 'advertise',
      icon: 'clipboard',
      roles: ['super_admin', 'common_admin', 'common_admin_child']
    },
    children: [
      { path: 'advertise/generate', component: _import('advertise/generate'), name: 'advertise-generate', meta: { title: 'advertise_generate', icon: 'form', roles: ['super_admin', 'common_admin', 'common_admin_child'] }},
      { path: 'advertise/mutilgenerate', component: _import('advertise/mutilgenerate'), name: 'advertise-mutilgenerate', meta: { title: 'advertise_mutilgenerate', icon: 'excel', roles: ['super_admin', 'common_admin', 'common_admin_child'] }},
      { path: 'advertise/generatemlink', component: _import('advertise/generatemlink'), name: 'advertise-generatemlink', meta: { title: 'advertise_generatemlink', icon: 'international', roles: ['super_admin', 'common_admin', 'common_admin_child'] }},
      { path: 'advertise/list', component: _import('advertise/list'), name: 'advertise-list', meta: { title: 'advertise_list', icon: 'theme', roles: ['super_admin', 'common_admin', 'common_admin_child'] }}
    ]
  },

  {
    path: '/basestics',
    component: Layout,
    redirect: 'noredirect',
    name: 'basestics',
    meta: {
      title: 'base_statistics',
      icon: 'clipboard',
      roles: ['super_admin', 'common_admin', 'common_admin_child']
    },
    children: [
      // { path: 'basestics/initdata', component: _import('basestics/initdata'), name: 'basestics-initdata', meta: { title: 'basestics_initdata', icon: 'documentation', roles: ['super_admin', 'common_admin', 'common_admin_child'] }},
      { path: 'basestics/site', component: _import('basestics/site'), name: 'basestics-site', meta: { title: 'basestics_site', icon: 'international', roles: ['super_admin', 'common_admin', 'common_admin_child'] }},
      { path: 'basestics/app', component: _import('basestics/app'), name: 'basestics-app', meta: { title: 'basestics_app', icon: 'dashboard', roles: ['super_admin', 'common_admin', 'common_admin_child'] }},
      { path: 'basestics/refer', component: _import('basestics/refer'), name: 'basestics-refer', meta: { title: 'basestics_refer', icon: 'tab', roles: ['super_admin', 'common_admin', 'common_admin_child'] }},
      { path: 'basestics/sku', component: _import('basestics/sku'), name: 'basestics-sku', meta: { title: 'basestics_sku', icon: 'star', roles: ['super_admin', 'common_admin', 'common_admin_child'] }},
      { path: 'basestics/skurefer', component: _import('basestics/skurefer'), name: 'basestics-skurefer', meta: { title: 'basestics_skurefer', icon: 'clipboard', roles: ['super_admin', 'common_admin', 'common_admin_child'] }},
      { path: 'basestics/search', component: _import('basestics/search'), name: 'basestics-search', meta: { title: 'basestics_search', icon: 'eye', roles: ['super_admin', 'common_admin', 'common_admin_child'] }},
      { path: 'basestics/searchlang', component: _import('basestics/searchlang'), name: 'basestics-searchlang', meta: { title: 'basestics_searchlang', icon: 'language', roles: ['super_admin', 'common_admin', 'common_admin_child'] }},
      { path: 'basestics/firsturl', component: _import('basestics/firsturl'), name: 'basestics-firsturl', meta: { title: 'basestics_firsturl', icon: 'international', roles: ['super_admin', 'common_admin', 'common_admin_child'] }},
      { path: 'basestics/url', component: _import('basestics/url'), name: 'basestics-url', meta: { title: 'basestics_url', icon: 'international', roles: ['super_admin', 'common_admin', 'common_admin_child'] }},
      { path: 'basestics/category', component: _import('basestics/category'), name: 'basestics-category', meta: { title: 'basestics_category', icon: 'excel', roles: ['super_admin', 'common_admin', 'common_admin_child'] }},
      { path: 'basestics/device', component: _import('basestics/device'), name: 'basestics-device', meta: { title: 'basestics_device', icon: 'example', roles: ['super_admin', 'common_admin', 'common_admin_child'] }},
      { path: 'basestics/country', component: _import('basestics/country'), name: 'basestics-country', meta: { title: 'basestics_country', icon: 'peoples', roles: ['super_admin', 'common_admin', 'common_admin_child'] }},
      { path: 'basestics/browser', component: _import('basestics/browser'), name: 'basestics-browser', meta: { title: 'basestics_browser', icon: 'international', roles: ['super_admin', 'common_admin', 'common_admin_child'] }}
    ]
  },
  {
    path: '/adsallstics',
    component: Layout,
    redirect: 'noredirect',
    hidden: true,
    name: 'adsallstics',
    meta: {
      title: 'advertics_all_statics',
      icon: 'clipboard',
      roles: ['super_admin', 'common_admin', 'common_admin_child']
    },
    children: [
      { path: 'adsallstics/site', component: _import('adsallstics/site'), name: 'adsallstics-site', meta: { title: 'adsallstics_site', icon: 'international', roles: ['super_admin', 'common_admin', 'common_admin_child'] }},
      { path: 'adsallstics/refer', component: _import('adsallstics/refer'), name: 'adsallstics-refer', meta: { title: 'adsallstics_refer', icon: 'tab', roles: ['super_admin', 'common_admin', 'common_admin_child'] }},
      { path: 'adsallstics/sku', component: _import('adsallstics/sku'), name: 'adsallstics-sku', meta: { title: 'adsallstics_sku', icon: 'star', roles: ['super_admin', 'common_admin', 'common_admin_child'] }},
      { path: 'adsallstics/skurefer', component: _import('adsallstics/skurefer'), name: 'adsallstics-skurefer', meta: { title: 'adsallstics_skurefer', icon: 'clipboard', roles: ['super_admin', 'common_admin', 'common_admin_child'] }},
      { path: 'adsallstics/search', component: _import('adsallstics/search'), name: 'adsallstics-search', meta: { title: 'adsallstics_search', icon: 'eye', roles: ['super_admin', 'common_admin', 'common_admin_child'] }},
      { path: 'adsallstics/searchlang', component: _import('adsallstics/searchlang'), name: 'adsallstics-searchlang', meta: { title: 'adsallstics_searchlang', icon: 'language', roles: ['super_admin', 'common_admin', 'common_admin_child'] }},
      { path: 'adsallstics/firsturl', component: _import('adsallstics/firsturl'), name: 'adsallstics-firsturl', meta: { title: 'adsallstics_firsturl', icon: 'international', roles: ['super_admin', 'common_admin', 'common_admin_child'] }},
      { path: 'adsallstics/url', component: _import('adsallstics/url'), name: 'adsallstics-url', meta: { title: 'adsallstics_url', icon: 'international', roles: ['super_admin', 'common_admin', 'common_admin_child'] }},
      { path: 'adsallstics/category', component: _import('adsallstics/category'), name: 'adsallstics-category', meta: { title: 'adsallstics_category', icon: 'excel', roles: ['super_admin', 'common_admin', 'common_admin_child'] }},
      { path: 'adsallstics/devide', component: _import('adsallstics/devide'), name: 'adsallstics-devide', meta: { title: 'adsallstics_devide', icon: 'example', roles: ['super_admin', 'common_admin', 'common_admin_child'] }},
      { path: 'adsallstics/country', component: _import('adsallstics/country'), name: 'adsallstics-country', meta: { title: 'adsallstics_country', icon: 'peoples', roles: ['super_admin', 'common_admin', 'common_admin_child'] }},
      { path: 'adsallstics/browser', component: _import('adsallstics/browser'), name: 'adsallstics-browser', meta: { title: 'adsallstics_browser', icon: 'international', roles: ['super_admin', 'common_admin', 'common_admin_child'] }}
    ]
  },

  {
    path: '/adsdetailstics',
    component: Layout,
    redirect: 'noredirect',
    name: 'adsdetailstics',
    meta: {
      title: 'advertics_detail_statics',
      icon: 'clipboard',
      roles: ['super_admin', 'common_admin', 'common_admin_child']
    },
    children: [
      { path: 'adsdetailstics/ads', component: _import('adsdetailstics/ads'), name: 'adsdetailstics-ads', meta: { title: 'adsdetailstics_ads', icon: 'shoppingCard', roles: ['super_admin', 'common_admin', 'common_admin_child'] }},
      { path: 'adsdetailstics/person', component: _import('adsdetailstics/person'), name: 'adsdetailstics-person', meta: { title: 'adsdetailstics_person', icon: 'people', roles: ['super_admin', 'common_admin', 'common_admin_child'] }},
      { path: 'adsdetailstics/group', component: _import('adsdetailstics/group'), name: 'adsdetailstics-group', meta: { title: 'adsdetailstics_group', icon: 'peoples', roles: ['super_admin', 'common_admin', 'common_admin_child'] }},
      { path: 'adsdetailstics/imager', component: _import('adsdetailstics/imager'), name: 'adsdetailstics-imager', meta: { title: 'adsdetailstics_imager', icon: 'theme', roles: ['super_admin', 'common_admin', 'common_admin_child'] }},
      { path: 'adsdetailstics/campaign', component: _import('adsdetailstics/campaign'), name: 'adsdetailstics-campaign', meta: { title: 'adsdetailstics_campaign', icon: 'money', roles: ['super_admin', 'common_admin', 'common_admin_child'] }},
      { path: 'adsdetailstics/childchannel', component: _import('adsdetailstics/childchannel'), name: 'adsdetailstics-childchannel', meta: { title: 'adsdetailstics_childchannel', icon: 'icon', roles: ['super_admin', 'common_admin', 'common_admin_child'] }},
      { path: 'adsdetailstics/channel', component: _import('adsdetailstics/channel'), name: 'adsdetailstics-channel', meta: { title: 'adsdetailstics_channel', icon: 'chart', roles: ['super_admin', 'common_admin', 'common_admin_child'] }},
      { path: 'adsdetailstics/edm', component: _import('adsdetailstics/edm'), name: 'adsdetailstics-edm', meta: { title: 'adsdetailstics_edm', icon: 'email', roles: ['super_admin', 'common_admin', 'common_admin_child'] }}
    ]
  },
  {
    path: '/siteadvertise',
    component: Layout,
    redirect: 'noredirect',
    name: 'siteadvertise',
    meta: {
      title: 'user_statistics',
      icon: 'shoppingCard',
      roles: ['super_admin', 'common_admin', 'common_admin_child']
    },
    children: [
      { path: 'siteadvertise/ads', component: _import('siteadvertise/ads'), name: 'siteadvertise-ads', meta: { title: 'siteadvertise_ads', icon: 'shoppingCard', roles: ['super_admin', 'common_admin', 'common_admin_child'] }}
    ]
  },
  {
    path: '/userstics',
    component: Layout,
    redirect: 'noredirect',
    name: 'userstics',
    meta: {
      title: 'user_statistics',
      icon: 'clipboard',
      roles: ['super_admin', 'common_admin', 'common_admin_child']
    },
    children: [
      { path: 'userstics/userdata', component: _import('userstics/userdata'), name: 'userstics-userdata', meta: { title: 'userstics_userdata', icon: 'people', roles: ['super_admin', 'common_admin', 'common_admin_child'] }}
    ]
  },

  {
    path: '/permission',
    component: Layout,
    hidden: true,
    redirect: '/permission/index',
    meta: { roles: ['admin'] }, // you can set roles in root nav
    children: [{
      path: 'index',
      component: _import('permission/index'),
      name: 'permission',
      meta: {
        title: 'permission',
        icon: 'lock',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }]
  },

  {
    path: '/icon',
    component: Layout,
    hidden: true,
    children: [{
      path: 'index',
      component: _import('svg-icons/index'),
      name: 'icons',
      meta: { title: 'icons', icon: 'icon', noCache: true }
    }]
  },

  {
    path: '/components',
    component: Layout,
    redirect: 'noredirect',
    name: 'component-demo',
    hidden: true,
    meta: {
      title: 'components',
      icon: 'component'
    },
    children: [
      { path: 'tinymce', component: _import('components-demo/tinymce'), name: 'tinymce-demo', meta: { title: 'tinymce' }},
      { path: 'markdown', component: _import('components-demo/markdown'), name: 'markdown-demo', meta: { title: 'markdown' }},
      { path: 'json-editor', component: _import('components-demo/jsonEditor'), name: 'jsonEditor-demo', meta: { title: 'jsonEditor' }},
      { path: 'dnd-list', component: _import('components-demo/dndList'), name: 'dndList-demo', meta: { title: 'dndList' }},
      { path: 'splitpane', component: _import('components-demo/splitpane'), name: 'splitpane-demo', meta: { title: 'splitPane' }},
      { path: 'avatar-upload', component: _import('components-demo/avatarUpload'), name: 'avatarUpload-demo', meta: { title: 'avatarUpload' }},
      { path: 'dropzone', component: _import('components-demo/dropzone'), name: 'dropzone-demo', meta: { title: 'dropzone' }},
      { path: 'sticky', component: _import('components-demo/sticky'), name: 'sticky-demo', meta: { title: 'sticky' }},
      { path: 'count-to', component: _import('components-demo/countTo'), name: 'countTo-demo', meta: { title: 'countTo' }},
      { path: 'mixin', component: _import('components-demo/mixin'), name: 'componentMixin-demo', meta: { title: 'componentMixin' }},
      { path: 'back-to-top', component: _import('components-demo/backToTop'), name: 'backToTop-demo', meta: { title: 'backToTop' }}
    ]
  },

  {
    path: '/charts',
    component: Layout,
    redirect: 'noredirect',
    hidden: true,
    name: 'charts',
    meta: {
      title: 'charts',
      roles: ['super_admin', 'common_admin', 'common_admin_child'],
      icon: 'chart'
    },
    children: [
      { path: 'keyboard', component: _import('charts/keyboard'), name: 'keyboardChart', meta: { title: 'keyboardChart', noCache: true, roles: ['super_admin', 'common_admin', 'common_admin_child'] }},
      { path: 'line', component: _import('charts/line'), name: 'lineChart', meta: { title: 'lineChart', noCache: true, roles: ['super_admin', 'common_admin', 'common_admin_child'] }},
      { path: 'mixchart', component: _import('charts/mixChart'), name: 'mixChart', meta: { title: 'mixChart', noCache: true, roles: ['super_admin', 'common_admin', 'common_admin_child'] }}
    ]
  },

  {
    path: '/example',
    component: Layout,
    hidden: true,
    redirect: '/example/table/complex-table',
    name: 'example',
    meta: {
      title: 'example',
      icon: 'example'
    },
    children: [
      {
        path: '/example/table',
        component: _import('example/table/index'),
        redirect: '/example/table/complex-table',
        name: 'Table',
        meta: {
          title: 'Table',
          icon: 'table'
        },
        children: [
          { path: 'dynamic-table', component: _import('example/table/dynamicTable/index'), name: 'dynamicTable', meta: { title: 'dynamicTable' }},
          { path: 'drag-table', component: _import('example/table/dragTable'), name: 'dragTable', meta: { title: 'dragTable' }},
          { path: 'inline-edit-table', component: _import('example/table/inlineEditTable'), name: 'inlineEditTable', meta: { title: 'inlineEditTable' }},
          { path: 'tree-table', component: _import('example/table/treeTable/treeTable'), name: 'treeTableDemo', meta: { title: 'treeTable' }},
          { path: 'custom-tree-table', component: _import('example/table/treeTable/customTreeTable'), name: 'customTreeTableDemo', meta: { title: 'customTreeTable' }},
          { path: 'complex-table', component: _import('example/table/complexTable'), name: 'complexTable', meta: { title: 'complexTable' }}
        ]
      },
      { path: 'tab/index', icon: 'tab', component: _import('example/tab/index'), name: 'tab', meta: { title: 'tab' }}
    ]
  },

  {
    path: '/form',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    name: 'form',
    meta: {
      title: 'form',
      icon: 'form'
    },
    children: [
      { path: 'create-form', component: _import('form/create'), name: 'createForm', meta: { title: 'createForm', icon: 'table' }},
      { path: 'edit-form', component: _import('form/edit'), name: 'editForm', meta: { title: 'editForm', icon: 'table' }}
    ]
  },

  {
    path: '/error',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    name: 'errorPages',
    meta: {
      title: 'errorPages',
      icon: '404'
    },
    children: [
      { path: '401', component: _import('errorPage/401'), name: 'page401', meta: { title: 'page401', noCache: true }},
      { path: '404', component: _import('errorPage/404'), name: 'page404', meta: { title: 'page404', noCache: true }}
    ]
  },

  {
    path: '/error-log',
    hidden: true,
    component: Layout,
    redirect: 'noredirect',
    children: [{ path: 'log', component: _import('errorLog/index'), name: 'errorLog', meta: { title: 'errorLog', icon: 'bug' }}]
  },

  {
    path: '/excel',
    component: Layout,
    hidden: true,
    redirect: '/excel/export-excel',
    name: 'excel',
    meta: {
      title: 'excel',
      icon: 'excel'
    },
    children: [
      { path: 'export-excel', component: _import('excel/exportExcel'), name: 'exportExcel', meta: { title: 'exportExcel' }},
      { path: 'export-selected-excel', component: _import('excel/selectExcel'), name: 'selectExcel', meta: { title: 'selectExcel' }},
      { path: 'upload-excel', component: _import('excel/uploadExcel'), name: 'uploadExcel', meta: { title: 'uploadExcel' }}
    ]
  },

  {
    path: '/zip',
    component: Layout,
    hidden: true,
    redirect: '/zip/download',
    alwaysShow: true,
    meta: { title: 'zip', icon: 'zip' },
    children: [{ path: 'download', component: _import('zip/index'), name: 'exportZip', meta: { title: 'exportZip' }}]
  },

  {
    path: '/theme',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [{ path: 'index', component: _import('theme/index'), name: 'theme', meta: { title: 'theme', icon: 'theme' }}]
  },

  {
    path: '/clipboard',
    hidden: true,
    component: Layout,
    redirect: 'noredirect',
    children: [{ path: 'index', component: _import('clipboard/index'), name: 'clipboardDemo', meta: { title: 'clipboardDemo', icon: 'clipboard' }}]
  },

  {
    path: '/i18n',
    hidden: true,
    component: Layout,
    children: [{ path: 'index', component: _import('i18n-demo/index'), name: 'i18n', meta: { title: 'i18n', icon: 'international' }}]
  },

  { path: '*', redirect: '/404', hidden: true }
]
