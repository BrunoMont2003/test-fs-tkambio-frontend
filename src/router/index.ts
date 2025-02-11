import { createRouter, createWebHistory } from 'vue-router';
import { useAuth } from '../composables/useAuth';

const routes = [
    {
        path: '/login',
        component: () => import('../views/LoginView.vue'),
        meta: { requiresAuth: false }
    },
    {
        path: '/reports',
        component: () => import('../views/ReportsView.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/',
        redirect: '/reports'
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, _, next) => {
    const { isAuthenticated } = useAuth();

    if (to.meta.requiresAuth && !isAuthenticated.value) {
        next('/login');
    } else if (to.path === '/login' && isAuthenticated.value) {
        next('/reports');
    } else {
        next();
    }
});

export default router;