const plugin = {
  version: '0.1.0',
  policies: ['websocket'],
  init: function (pluginContext) {
    pluginContext.eventBus.on('http-ready', function ({ httpServer }) {
      const httpProxy = require('http-proxy')
      var proxy = new httpProxy.createProxyServer();
      httpServer.on('upgrade', (req, socket, head) => {
        proxy.ws(req, socket, head);
      });
    });
  }
}

module.exports = plugin;