const proxy = require('http-proxy-middleware');

module.exports = app => {
  app.use(proxy('/websocket', { target: 'ws://10.211.55.3:8080', ws: true }));
  app.use(proxy('/api', { target: 'http://10.211.55.3:8080' }));
};
