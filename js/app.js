import { Router } from '@vaadin/router';
import '../assets/style.css';
import './components/twittax';
import './components/profile';
import './components/tags';

const router = new Router(document.getElementById('router'));
router.setRoutes([
  { path: '/', component: 'app-twittax' },
  { path: '/users/:name', component: 'app-twittax-profile' },
  { path: '/tags/:name', component: 'app-twittax-tags' },
]);
