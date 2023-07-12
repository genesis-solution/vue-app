import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { 
      path: '/', component: () => import('../views/Home.vue')
    },
    { 
      path: '/email/inbox', component: () => import('../views/EmailInbox.vue')
    },
    { 
      path: '/email/detail', component: () => import('../views/EmailDetail.vue')
    },
    { 
      path: '/email/compose', component: () => import('../views/EmailCompose.vue')
    }

  ],
});

export default router;
