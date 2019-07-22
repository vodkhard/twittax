import { Router } from '@vaadin/router';
import './components/layout';
import './components/twittax';
import './components/profile';
import './components/tags';
import './components/settings';
import './components/auth/app-login';
import './components/auth/app-auth';

const router = new Router(document.getElementById('router'));
router.setRoutes([
  {
    path: '/login',
    component: 'app-login',
  },
  {
    path: '/register',
    component: 'app-auth',
  },
  {
    path: '/',
    component: 'app-layout',
    children: [
      { path: '', component: 'app-twittax' },
      { path: '/users/:name', component: 'app-twittax-profile' },
      { path: '/tags/:name', component: 'app-twittax-tags' },
      { path: '/settings', component: 'app-twittax-settings' },
    ],
  },
]);
