const proxy = require('http-proxy-middleware');

module.exports = app => {
  app.use(proxy('/websocket', { target: 'ws://localhost:8080', ws: true }));
  app.use(proxy('/api', { target: 'http://localhost:8080' }));
};
