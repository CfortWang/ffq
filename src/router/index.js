export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: (resolve) => require(['@/components/HomePage'], resolve)
    },
    {
      path: '/personal',
      name: 'Personal',
      component: (resolve) => require(['@/components/Personal'], resolve)
    },
    {
      path: '/login',
      name: 'Login',
      component: (resolve) => require(['@/components/Login'], resolve)
    },
    {
      path: '/register',
      name: 'Register',
      component: (resolve) => require(['@/components/Register'], resolve)
    },
    {
      path: '/findPassword',
      name: 'FindPassword',
      component: (resolve) => require(['@/components/FindPassword'], resolve)
    },
    {
      path: '/userProtocol',
      name: 'UserProtocol',
      component: (resolve) => require(['@/components/UserProtocol'], resolve)
    },
    {
      path: '/tasks',
      name: 'Tasks',
      component: (resolve) => require(['@/components/Tasks'], resolve)
    },
    {
      path: '/help',
      name: 'Help',
      component: (resolve) => require(['@/components/Help'], resolve)
    },
    {
      path: '/addTasks',
      name: 'AddTasks',
      component: (resolve) => require(['@/components/AddTasks'], resolve)
    },
    {
      path: '/addHistory',
      name: 'AddHistory',
      component: (resolve) => require(['@/components/AddHistory'], resolve)
    },
    {
      path: '/promotion',
      name: 'Promotion',
      component: (resolve) => require(['@/components/Promotion'], resolve)
    },
    {
      path: '/joinVip',
      name: 'JoinVip',
      component: (resolve) => require(['@/components/JoinVip'], resolve)
    },
    {
      path: '/tasksHistory',
      name: 'TasksHistory',
      component: (resolve) => require(['@/components/TasksHistory'], resolve)
    },
    {
      path: '/tasksHall',
      name: 'TasksHall',
      component: (resolve) => require(['@/components/TasksHall'], resolve)
    },
    {
      path: '/wallet',
      name: 'Wallet',
      component: (resolve) => require(['@/components/Wallet'], resolve)
    },
    {
      path: '/incomeDetails',
      name: 'IncomeDetails',
      component: (resolve) => require(['@/components/IncomeDetails'], resolve)
    },
    {
      path: '/withdraw',
      name: 'Withdraw',
      component: (resolve) => require(['@/components/Withdraw'], resolve)
    },
    {
      path: '/withdrawList',
      name: 'WithdrawList',
      component: (resolve) => require(['@/components/WithdrawList'], resolve)
    },
    {
      path: '/myTeam',
      name: 'MyTeam',
      component: (resolve) => require(['@/components/MyTeam'], resolve)
    },
    {
      path: '/benefit',
      name: 'Benefit',
      component: (resolve) => require(['@/components/Benefit'], resolve)
    },
    {
      path: '/service',
      name: 'Service',
      component: (resolve) => require(['@/components/Service'], resolve)
    },
    {
      path: '/superior',
      name: 'Superior',
      component: (resolve) => require(['@/components/Superior'], resolve)
    },
    {
      path: '/certification',
      name: 'Certification',
      component: (resolve) => require(['@/components/Certification'], resolve)
    },
    {
      path: '/news',
      name: 'News',
      component: (resolve) => require(['@/components/News'], resolve)
    },
    {
      path: '/introduction',
      name: 'Introduction',
      component: (resolve) => require(['@/components/Introduction'], resolve)
    }
  ]
})
