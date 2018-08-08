const plugin = {
  version: '0.1.0',
  policies: ['websocket'],
  init: function (pluginContext) {
    pluginContext.registerPolicy({
      name: 'websocket',
      policy: (actionParams) => {
        pluginContext.eventBus.on('http-ready', function ({ httpServer }) {
          const httpProxy = require('http-proxy')
          const proxy = new httpProxy.createProxyServer({
            target: {
              host: actionParams.host,
              port: actionParams.port,
            },
          });
          httpServer.on('upgrade', (req, socket, head) => {
            proxy.ws(req, socket, head);
          });
        });

        return (req, res, next) => {
          return next();
        }
      }
    });
  }
}

module.exports = plugin;
