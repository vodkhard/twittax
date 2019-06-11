import { Router } from '@vaadin/router';
import 'milligram/dist/milligram.min.css';
import './components/twittax';
import './components/profile';

const router = new Router(document.getElementById('router'));
router.setRoutes([
  { path: '/', component: 'app-twittax' },
  { path: '/users/:name', component: 'app-twittax-profile' },
]);
