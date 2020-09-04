const accountRouter = {
  route: null,
  name: null,
  title: 'RBAC管理',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont icon-huiyuanguanli',
  filePath: 'view/account/', // 文件路径
  order: null,
  inNav: true,
  children: [
    {
      route: '/account/demo/list',
      name: null,
      title: '管理员',
      type: 'folder', // 取 route 为默认加载页
      icon: 'iconfont icon-huiyuanguanli',
      filePath: 'view/account/demo/',
      inNav: true,
      children: [
        {
          title: '管理员列表',
          type: 'view',
          name: 'DemoList',
          route: '/demo/list',
          filePath: 'view/account/demo/demo-list.vue',
          inNav: true,
          icon: 'iconfont icon-tushuguanli',
        },
        {
          title: '添加管理员',
          type: 'view',
          name: 'DemoView',
          route: '/demo/view',
          filePath: 'view/account/demo/group-power.vue',
          inNav: true,
          icon: 'iconfont icon-tushuguanli',
        },
      ],
    },
    {
      route: '/account/demo/list',
      name: null,
      title: '角色管理',
      type: 'folder', // 取 route 为默认加载页
      icon: 'iconfont icon-huiyuanguanli',
      filePath: 'view/account/demo/',
      inNav: true,
      children: [
        {
          title: '角色列表',
          type: 'view',
          name: 'DemoList',
          route: '/demo/list',
          filePath: 'view/account/demo/demo-list.vue',
          inNav: true,
          icon: 'iconfont icon-tushuguanli',
        },
        {
          title: '添加角色',
          type: 'view',
          name: 'DemoView',
          route: '/rbac/role/create',
          filePath: 'view/admin/rbac/role-create.vue',
          inNav: true,
          icon: 'iconfont icon-tushuguanli',
        },
      ],
    },
    {
      route: '/account/demo/list',
      name: null,
      title: '权限管理',
      type: 'folder', // 取 route 为默认加载页
      icon: 'iconfont icon-huiyuanguanli',
      filePath: 'view/account/demo/',
      inNav: true,
      children: [
        {
          title: '权限列表',
          type: 'view',
          name: 'DemoList',
          route: '/demo/list',
          filePath: 'view/account/demo/demo-list.vue',
          inNav: true,
          icon: 'iconfont icon-tushuguanli',
        },
        {
          title: '添加权限',
          type: 'view',
          name: 'DemoView',
          route: '/demo/view',
          filePath: 'view/account/demo/group-power.vue',
          inNav: true,
          icon: 'iconfont icon-tushuguanli',
        },
      ],
    },
  ],
}

export default accountRouter
