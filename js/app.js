import { Router } from '@vaadin/router';
import './components/twittax';
import './components/profile';
import './components/tags';
import './components/settings';

const router = new Router(document.getElementById('router'));
router.setRoutes([
  { path: '/', component: 'app-twittax' },
  { path: '/users/:name', component: 'app-twittax-profile' },
  { path: '/tags/:name', component: 'app-twittax-tags' },
  { path: '/settings', component: 'app-twittax-settings' },
]);
