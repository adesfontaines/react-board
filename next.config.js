/** @type {import('next').NextConfig} */
module.exports = {
    localePath:
    typeof window === 'undefined'
      ? require('path').resolve('./public/locales')
      : '/locales',
  }