module.exports = (ctx) => {
  const syntax = 'postcss-scss'
  const plugins = {
    'postcss-easy-import': {},
    'postcss-mixins': {},
    'postcss-for': {},
    'postcss-nested': {},
    'postcss-custom-media': {},
  }

  if(ctx.options.isBuild) {
    plugins['autoprefixer'] = {}
    plugins['cssnano'] = {}
  }

  return { syntax, plugins };
};