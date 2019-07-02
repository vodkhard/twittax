import { Router } from '@vaadin/router';
import './js/components/twittax';
import './js/components/profile';
import './js/components/tags';

const router = new Router(document.getElementById('router'));
router.setRoutes([
  { path: '/', component: 'app-twittax' },
  { path: '/users/:name', component: 'app-twittax-profile' },
  { path: '/tags/:name', component: 'app-twittax-tags' },
]);
