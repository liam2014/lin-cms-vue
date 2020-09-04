const accountRouter = {
  route: null,
  name: null,
  title: '用户中心',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont icon-tushuguanli',
  filePath: 'view/account/', // 文件路径
  order: null,
  inNav: true,
  children: [
    {
      route: '/account/demo/list',
      name: null,
      title: 'demo列表管理',
      type: 'folder', // 取 route 为默认加载页
      icon: 'iconfont icon-huiyuanguanli',
      filePath: 'view/account/demo/',
      inNav: true,
      children: [
        {
          title: 'Demo列表',
          type: 'view',
          name: 'DemoList',
          route: '/demo/list',
          filePath: 'view/account/demo/demo-list.vue',
          inNav: true,
          icon: 'iconfont icon-tushuguanli',
        },
        {
          title: 'DemoView',
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
