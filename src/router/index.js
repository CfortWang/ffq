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
    {// 任务发布记录
      path: '/addHistory',
      name: 'AddHistory',
      component: (resolve) => require(['@/components/AddHistory'], resolve)
    },
    {// 任务发布记录对应的任务详情
      path: '/addHistoryDetails',
      name: 'AddHistoryDetails',
      component: (resolve) => require(['@/components/AddHistoryDetails'], resolve)
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
    {// 任务记录
      path: '/tasksHistory',
      name: 'TasksHistory',
      component: (resolve) => require(['@/components/TasksHistory'], resolve)
    },
    {// 任务记录对应的任务详情
      path: '/tasksHistoryDetails',
      name: 'TasksHistoryDetails',
      component: (resolve) => require(['@/components/TasksHistoryDetails'], resolve)
    },
    {// 任务大厅
      path: '/tasksHall',
      name: 'TasksHall',
      component: (resolve) => require(['@/components/TasksHall'], resolve)
    },
    {// 任务大厅对应的任务详情
      path: '/tasksDetails',
      name: 'TasksDetails',
      component: (resolve) => require(['@/components/TasksDetails'], resolve)
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
      path: '/benifit',
      name: 'Benifit',
      component: (resolve) => require(['@/components/Benifit'], resolve)
    },
    {
      path: '/benifitDetails',
      name: 'BenifitDetails',
      component: (resolve) => require(['@/components/BenifitDetails'], resolve)
    },
    {
      path: '/service',
      name: 'Service',
      component: (resolve) => require(['@/components/Service'], resolve)
    },
    {
      path: '/service_zh',
      name: 'Zhkf',
      component: (resolve) => require(['@/components/Zhkf'], resolve)
    },
    {
      path: '/service_gg',
      name: 'Ggkf',
      component: (resolve) => require(['@/components/Ggkf'], resolve)
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
      path: '/newsDetails',
      name: 'NewsDetails',
      component: (resolve) => require(['@/components/NewsDetails'], resolve)
    },
    {
      path: '/introduction',
      name: 'Introduction',
      component: (resolve) => require(['@/components/Introduction'], resolve)
    },
    {
      path: '/payMethod',
      name: 'PayMethod',
      component: (resolve) => require(['@/components/PayMethod'], resolve),
      beforeEnter: (to, from, next) => {
        if (from.path.startsWith('/joinVip') || from.path.startsWith('/addTasks')) {
          next()
        } else {
          next('/')
        }
      }
    },
    {
      path: '/paySuccess',
      name: 'PaySuccess',
      component: (resolve) => require(['@/components/PaySuccess'], resolve),
      beforeEnter: (to, from, next) => {
        if (from.path.startsWith('/payMethod')) {
          next()
        } else {
          next('/')
        }
      }
    }
  ]
})
