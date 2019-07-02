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

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

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
    "url": "app.c328ef1a.js",
    "revision": "730f5732bf52e81fd978ca439dfa6dd9"
  },
  {
    "url": "app.c3f9f951.js",
    "revision": "d1d2fb20f34b9a4c4219b85e62a0d236"
  },
  {
    "url": "index.html",
    "revision": "d6e40021a84d158a9f132c80a8944469"
  },
  {
    "url": "index.js",
    "revision": "56a74179d517779ed28a1c1e83f35d4f"
  },
  {
    "url": "sw.js",
    "revision": "0d100fe06ba5d4ecac27682fa745f978"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
