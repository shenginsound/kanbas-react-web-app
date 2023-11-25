const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    '/Api',
    createProxyMiddleware({
      target: 'https://isports.sa.gov.tw',
      changeOrigin: true,
    })
  );
};