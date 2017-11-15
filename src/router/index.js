import Vue from 'vue'
import Router from 'vue-router'
import Pos from '@/components/pages/Pos'
import Title from '@/components/pages/title'
import Sign from '@/components/pages/Sign'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'sign',
      component: Sign
    },
    {
      path: '/Pos',
      name: 'Pos',
      component: Pos
    },
    {
      path: '/title',
      name: 'title',
      component: Title
    }
  ]
})
