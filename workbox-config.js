module.exports = {
  globDirectory: './dist',
  globPatterns: [
    '**/*.{png,html,js,css}',
  ],
  swDest: 'service-worker.js',
  swSrc: 'src-sw.js',
};
