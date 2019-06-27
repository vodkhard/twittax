/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    url: 'dist/app.c3f9f951.js',
    revision: '1dbe12ac63fb6f81651f5d4ab6244938',
  },
  {
    url: 'dist/index.js',
    revision: 'c67a3b14a066eb6468b1bf7f437ce07e',
  },
  {
    url: 'js/app.js',
    revision: 'c93d52a8feaba4a0f0630dc232af7064',
  },
  {
    url: 'js/components/auth/app-auth.js',
    revision: '24c8b9b2db7957887a9b694ff15d039c',
  },
  {
    url: 'js/components/auth/app-login.js',
    revision: '96584455ae873135401d12240a2f30ec',
  },
  {
    url: 'js/components/header.js',
    revision: '272487ccb5257ff4c16d4d77fa7eb2aa',
  },
  {
    url: 'js/components/profile.js',
    revision: 'e775d3f842c8a6b14fbbe74524101863',
  },
  {
    url: 'js/components/tags.js',
    revision: 'a895bd2218680eceb79edc84bee693f6',
  },
  {
    url: 'js/components/twaat/comment.js',
    revision: 'd7b334c70019da9b5a1e0233875bab1c',
  },
  {
    url: 'js/components/twaat/content.js',
    revision: '15610ab246e8f1b7681c044638732bf4',
  },
  {
    url: 'js/components/twaat/input.js',
    revision: '209171737414aa158448992c593fa7f2',
  },
  {
    url: 'js/components/twaat/item.js',
    revision: '26917031c5ab2504f4eaac5dae7d3197',
  },
  {
    url: 'js/components/twaat/list.js',
    revision: '868a2e8d1f67b2645f6a59b1aaed0106',
  },
  {
    url: 'js/components/twittax.js',
    revision: '4a32976d75b23ad8b80758ed59dbdcfa',
  },
  {
    url: 'js/components/ui/button.js',
    revision: '7a9d76f139369f27384716e2f5bf7a97',
  },
  {
    url: 'js/components/ui/icon.js',
    revision: '97be0d4c6636a6f2d50859299fdf70d0',
  },
  {
    url: 'js/components/ui/tooltip.js',
    revision: '72707a992ce4ef5599862fbea4f040f0',
  },
  {
    url: 'js/components/ui/variables.js',
    revision: '62b8a68032a232a71c37d370cba1f8bb',
  },
  {
    url: 'js/config.js',
    revision: 'e863ac89bb280d8d2d80cd846722b36f',
  },
  {
    url: 'js/data/app-store.js',
    revision: 'a0b5adc2ddba8861d873ec62ba535209',
  },
  {
    url: 'js/data/repositroy/twaats.js',
    revision: '779ee58d54eafe87fc5af50edc0b581c',
  },
  {
    url: 'js/data/repositroy/users.js',
    revision: 'b97975f8c6438cf5802299aed32b8deb',
  },
  {
    url: 'js/db.js',
    revision: '0e58d2d66f0ac49dd78872712cd9c2ab',
  },
  {
    url: 'workbox-config.js',
    revision: 'e14198433f90829b6590cf6933a66a17',
  },
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
