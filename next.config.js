const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')
const path = require('path')

module.exports = withPWA({
    future: { webpack5: true },
    pwa: {
        dest: 'public',
        runtimeCaching,
        sw: 'service-worker.js',
    },
    webpack: (config, options) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            '@': path.resolve(__dirname, './')
        }
        return config
    },
})