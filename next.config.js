/** @type {import('next').NextConfig} */
module.exports = {
    i18n: {
      defaultLocale: 'en',
      locales: ['en', 'de'],
    },
    localePath:
    typeof window === 'undefined'
      ? require('path').resolve('./public/locales')
      : '/locales',
  }