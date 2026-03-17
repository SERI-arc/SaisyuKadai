import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignupView.vue'),
    },
       {
      path: '/Home',
      name: 'Home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/QAMenu',
      name: 'QAMenu',
      component: () => import('../views/QAMenuView.vue')
    },
   {
      path: '/addProject',
      name: 'addProject',
      component: () => import('../views/AddProjectView.vue'),
    },
    {
      path: '/SelectProject',
      name: 'SelectProject',
      component: () => import('../views/SelectProjectView.vue'),
    },
    {
      path: '/IssueQA',
      name: 'IssueQA',
      component: () => import('../views/IssueQAView.vue'),
    },
    {
      path: '/AnswerQA',
      name: 'AnswerQA',
      component: () => import('../views/AnswerQAView.vue'),
    },
    { path: '/AIChatBot',
      name: 'AIChatBot',
      component: () => import('../views/AIChatBotView.vue'),
    },
  ],
})

export default router
