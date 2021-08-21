const srcPath = 'app'
const destPath = 'build'

const config = {
  src: {
    root: srcPath,
    html: srcPath,
    postcss: `${srcPath}/postcss`,
    js: `${srcPath}/js`,
    fonts: `${srcPath}/fonts`,
    images: `${srcPath}/images`,
    json: `${srcPath}/json`,
  },

  dest: {
    root: destPath,
    html: destPath,
    css: `${destPath}/css`,
    js: `${destPath}/js`,
    fonts: `${destPath}/fonts`,
    images: `${destPath}/images`,
    json: `${destPath}/json`,
  },

  setEnv() {
    this.isProd = process.argv.includes('--prod')
    this.isDev = !this.isProd
  },
}

export default config
