const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')
const path = require('path')

module.exports = withPWA({
    pwa: {
        dest: 'public',
        runtimeCaching,
        sw: 'service-worker.js',
        disable: process.env.NODE_ENV === 'development',
    },
    webpack: (config) => {
        config.resolve.alias['@'] = path.resolve(__dirname, './')
        return config
    },
})