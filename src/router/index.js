import { createRouter, createWebHistory } from 'vue-router';

import SignPage from '../pages/Common/SignPage/index.vue';
import NotFound from '../pages/Common/ErrorPage/index.vue';
import HomePage from '../pages/Common/HomePage/index.vue';

const routes = [
    { path: '/', component: HomePage, name: 'HomePage' },
    { path: '/sign', component: SignPage, name: 'SignPage' },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
