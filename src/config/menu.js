import icon from './icon';

export default [
  {
    id: 'menu.dashboard',
    title: 'Dashboard',
    auth: true,
    icon: icon.DotChartOutlined,
    subMenu: [
      {
        parentId: 'menu.dashboard',
        id: 'menu.dashboard.analysis',
        title: '分析页',
        route: '/dashboard/analysis',
      },
      {
        parentId: 'menu.dashboard',

        id: 'menu.dashboard.monitor',
        title: '监控页',
        route: '/dashboard/monitor',
      },
      {
        parentId: 'menu.dashboard',

        id: 'menu.dashboard.workplace',
        title: '工作台',
        route: '/dashboard/workplace',
      },
    ],
  },
  {
    id: 'menu.form',
    title: '表单',
    auth: true,
    icon: icon.ProfileOutlined,
    subMenu: [
      {
        parentId: 'menu.form',

        id: 'menu.form.basic-form',
        title: '基础表单',
        route: '/form/basic-form',
      },
      {
        parentId: 'menu.form',

        id: 'menu.form.monitor',
        title: '分布表单',
        route: '/form/step-form',
      },
      {
        parentId: 'menu.form',

        id: 'menu.form.advanced-form',
        title: '高级表单',
        route: '/form/advanced-form',
      },
    ],
  },
  {
    id: 'menu.list',
    title: '列表',
    auth: true,
    icon: icon.InsertRowAboveOutlined,
    subMenu: [
      {
        parentId: 'menu.list',
        id: 'menu.list.search-articles',
        title: '搜索列表（文章）',
        route: '/list/search/articles',
      },
      {
        parentId: 'menu.list',

        id: 'menu.list.search-projects',
        title: '搜索列表（项目）',
        route: '/list/search/projects',
      },
      {
        parentId: 'menu.list',

        id: 'menu.list.search-applications',
        title: '搜索列表（应用）',
        route: '/list/search/applications',
      },
      {
        parentId: 'menu.list',

        id: 'menu.list.table-list',
        title: '查询表格',
        route: '/list/table-list',
      },
      {
        parentId: 'menu.list',

        id: 'menu.list.basic-list',
        title: '标准列表',
        route: '/list/basic-list',
      },
      {
        parentId: 'menu.list',

        id: 'menu.list.card-list',
        title: '卡片列表',
        route: '/list/card-list',
      },
    ],
  },
  {
    id: 'menu.profile',
    title: '详情',
    auth: true,
    icon: icon.FileDoneOutlined,
    subMenu: [
      {
        parentId: 'menu.profile',

        id: 'menu.profile.basic',
        title: '基础详情页',
        route: '/profile/basic',
      },
      {
        parentId: 'menu.profile',

        id: 'menu.profile.advanced',
        title: '高级详情页',
        route: '/profile/advanced',
      },
    ],
  },
  {
    id: 'menu.result',
    title: '结果',
    auth: true,
    icon: icon.CoffeeOutlined,
    subMenu: [
      {
        parentId: 'menu.result',

        id: 'menu.result.success',
        title: '成功页',
        route: '/result/success',
      },
      {
        parentId: 'menu.result',

        id: 'menu.result.fail',
        title: '失败页',
        route: '/result/fail',
      },
    ],
  },
  {
    id: 'menu.exception',
    title: '异常',
    auth: true,
    icon: icon.WarningOutlined,
    subMenu: [
      {
        parentId: 'menu.exception',

        id: 'menu.exception.403',
        title: '403',
        route: '/exception/403',
      },
      {
        parentId: 'menu.exception',

        id: 'menu.exception.404',
        title: '404',
        route: '/exception/404',
      },
      {
        parentId: 'menu.exception',

        id: 'menu.exception.500',
        title: '500',
        route: '/exception/500',
      },
    ],
  },
  {
    id: 'menu.account',
    title: '个人页',
    auth: true,
    icon: icon.UserOutlined,
    subMenu: [
      {
        parentId: 'menu.account',

        id: 'menu.account.center',
        title: '个人中心',
        route: '/account/center',
      },
      {
        parentId: 'menu.account',

        id: 'menu.account.settings',
        title: '个人设置',
        route: '/account/settings',
      },
    ],
  },
  {
    id: 'menu.editor',
    title: '图形工具',
    auth: true,
    icon: icon.ForkOutlined,
    subMenu: [
      {
        parentId: 'menu.editor',

        id: 'menu.editor.flow',
        title: '流程',
        route: '/editor/flow',
      },
      {
        parentId: 'menu.editor',

        id: 'menu.editor.mind',
        title: '脑图',
        route: '/editor/mind',
      },
      // {
      //   parentId: 'menu.editor',

      //   id: 'menu.editor.koni',
      //   title: '拓扑',
      //   route: '/editor/koni',
      // },
    ],
  },
];
