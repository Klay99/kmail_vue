import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import login from '@/components/login'
import home from '@/components/home'
import buildMail from '@/components/buildMail'
import reg from '@/components/reg'
import forget from '@/components/forget'
import unread from '@/components/unread'
import stared from '@/components/stared'
import draft from '@/components/draft'
import sent from '@/components/sent'
import deleted from '@/components/deleted'
import allInBox from '@/components/allInBox'
import mailDetail from '@/components/mailDetail'
import friend from '@/components/friend'
import rebuildMail from '@/components/rebuildMail'
import userCenter from '@/components/userCenter'
import headImg from '@/components/headImg'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/reg',
      name: 'reg',
      component: reg
    },
    {
      path: '/forget',
      name: 'forget',
      component: forget
    },
    {
      path: '/buildMail',
      name: 'buildMail',
      component: buildMail
    },
    {
      path: '/unread',
      name: 'unread',
      component: unread
    },
    {
      path: '/stared',
      name: 'stared',
      component: stared
    },
    {
      path: '/draft',
      name: 'draft',
      component: draft
    },
    {
      path: '/sent',
      name: 'sent',
      component: sent
    },
    {
      path: '/deleted',
      name: 'deleted',
      component: deleted
    },
    {
      path: '/allInBox',
      name: 'allInBox',
      component: allInBox
    },
    {
      path: '/mailDetail',
      name: 'mailDetail',
      component: mailDetail
    },
    {
      path: '/friend',
      name: 'friend',
      component: friend
    },
    {
      path: '/rebuildMail',
      name: 'rebuildMail',
      component: rebuildMail
    },
    {
      path: '/userCenter',
      name: 'userCenter',
      component: userCenter
    },
    {
      path: '/headImg',
      name: 'headImg',
      component: headImg
    }
  ]
})
