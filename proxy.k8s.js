const PROXY_CONFIG = [
    {
     context: '/v1',
     target: 'http://pdveasy.com.br',
     logLevel: 'debug',
     changeOrigin: true,
     pathRewrite: {
        "^/v1": "/api/v1"
     }    
    }
]
module.exports = PROXY_CONFIG;