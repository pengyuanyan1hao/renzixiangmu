import Layout from '@/layout'

export default {
  path: '/employees',
  component: Layout,
  children: [{
    path: '',
    name: 'Employees',
    component: () => import('@/views/employees'),
    meta: {
      title: '员工管理',
      icon: 'people'
    }

  },
  {
    path: '/employees/detail/:id',
    component: () => import('@/views/employees/detail'),
    hidden: true
  },
  { path: 'print:id',
    component: () => import('@/views/employees/print'),
    hidden: true }
  ]

}
