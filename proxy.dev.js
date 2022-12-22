const PROXY_CONFIG = [
    {
      context: '/v1',
      target: 'http://localhost:8081',
      logLevel: 'debug'
    }
]
module.exports = PROXY_CONFIG;