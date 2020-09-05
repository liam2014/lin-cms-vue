const accountRouter = {
  route: null,
  name: null,
  title: 'RBAC管理',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont icon-huiyuanguanli',
  filePath: 'view/account/', // 文件路径
  order: null,
  inNav: true,
  permission: ['rbac-menu'],
  children: [
    {
      route: '/rbac/user/list',
      name: null,
      title: '管理员',
      type: 'folder', // 取 route 为默认加载页
      icon: 'iconfont icon-huiyuanguanli',
      filePath: 'view/admin/rbac/',
      inNav: true,
      permission: ['rbac-user-menu'],
      children: [
        {
          title: '管理员列表',
          type: 'view',
          name: 'UserList',
          route: '/rbac/user/list',
          filePath: 'view/admin/rbac/user-list.vue',
          inNav: true,
          icon: 'iconfont icon-tushuguanli',
          permission: ['rbac-user-list'],
        },
        {
          title: '添加管理员',
          type: 'view',
          name: 'UserView',
          route: '/rbac/user/create',
          filePath: 'view/admin/rbac/user-create.vue',
          inNav: true,
          icon: 'iconfont icon-tushuguanli',
          permission: ['rbac-user-create'],
        },
      ],
    },
    {
      route: '/rbac/role/list',
      name: null,
      title: '角色管理',
      type: 'folder', // 取 route 为默认加载页
      icon: 'iconfont icon-huiyuanguanli',
      filePath: 'view/admin/rbac/',
      inNav: true,
      children: [
        {
          title: '角色列表',
          type: 'view',
          name: 'RoleList',
          route: '/rbac/role/list',
          filePath: 'view/admin/rbac/role-list.vue',
          inNav: true,
          icon: 'iconfont icon-tushuguanli',
        },
        {
          title: '添加角色',
          type: 'view',
          name: 'RoleView',
          route: '/rbac/role/create',
          filePath: 'view/admin/rbac/role-create.vue',
          inNav: true,
          icon: 'iconfont icon-tushuguanli',
        },
        {
          route: '/rbac/role/edit',
          type: 'view',
          name: 'RoleEdit',
          filePath: 'view/admin/rbac/role-edit.vue',
          inNav: false,
          title: '修改角色',
          icon: 'iconfont icon-add',
        },
      ],
    },
    {
      route: '/rbac/power/list',
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
          name: 'PowerList',
          route: '/rbac/power/list',
          filePath: 'view/admin/rbac/power-list.vue',
          inNav: true,
          icon: 'iconfont icon-tushuguanli',
        },
        {
          title: '添加权限',
          type: 'view',
          name: 'PowerCreate',
          route: '/rbac/power/create',
          filePath: 'view/admin/rbac/power-create.vue',
          inNav: true,
          icon: 'iconfont icon-tushuguanli',
        },
      ],
    },
  ],
}

export default accountRouter
