module.exports = {
  apps: [
    {
      name: 'nuxt-iview',
      script: 'build/main.js',
      watch: true,
      env: {
        NODE_ENV: 'development',
        BACKEND_URL: 'https://dev.domain.com',
        COOKIE_DOMAIN: '.domain.com'
      },
      env_test: {
        NODE_ENV: 'test',
        BACKEND_URL: 'https://test.domain.com',
        COOKIE_DOMAIN: '.domain.com'
      },
      env_production: {
        NODE_ENV: 'production',
        BACKEND_URL: 'https://pro.domain.com',
        COOKIE_DOMAIN: '.domain.com'
      }
    }
  ]
}
