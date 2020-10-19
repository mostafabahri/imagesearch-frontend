const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ['./public/**/*.html', './src/**/*.vue'],
  defaultExtractor: (content) => {
    return content.match(/[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g) || []
  },
})
module.exports = {
  plugins: [
    require('autoprefixer'),
    require('tailwindcss'),
    ...process.env.NODE_ENV === 'production'
      ? [purgecss]
      : []

  ],
};
