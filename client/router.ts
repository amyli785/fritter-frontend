import Vue from 'vue';
import VueRouter from 'vue-router';
import NotFound from './NotFound.vue';
import AccountPage from './components/Account/AccountPage.vue';
import UserPage from './components/User/UserPage.vue';
import LoginPage from './components/Login/LoginPage.vue';
import FeedPage from './components/Feed/FeedPage.vue';

Vue.use(VueRouter);

const routes = [
  {path: '/', name: 'Home', component: FeedPage},
  {path: '/account', name: 'Account', component: AccountPage},
  {path: '/user/:username', name: 'User', component: UserPage},
  {path: '/login', name: 'Login', component: LoginPage},
  {path: '*', name: 'Not Found', component: NotFound}
];

const router = new VueRouter({routes});

/**
 * Navigation guards to prevent user from accessing wrong pages.
 */
router.beforeEach((to, from, next) => {
  if (router.app.$store) {
    if (to.name === 'Login' && router.app.$store.state.username) {
      next({name: 'Account'}); // Go to Account page if user navigates to Login and are signed in
      return;
    }

    if (to.name === 'Account' && !router.app.$store.state.username) {
      next({name: 'Login'}); // Go to Login page if user navigates to Account and are not signed in
      return;
    }
  }

  next();
});

export default router;
