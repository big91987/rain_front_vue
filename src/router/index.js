import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import home from '@/components/home'
import view from '@/components/view'
import de_demo from '@/components/de_demo'
import test_info from '@/components/test_info'
import viz from '@/components/viz'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/de',
      name: de_demo,
      component: de_demo
    },
    {
      path: '/view',
      name: view,
      component: view
    },
    {
      path: '/test_info',
      name: test_info,
      component: test_info
    },
    {
      path: '/his',
      name: viz,
      component: viz
    }
  ]
})
