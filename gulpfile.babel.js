import gulp from 'gulp'
import config from './gulp/config'
import clean from './gulp/tasks/clean'
import server from './gulp/tasks/server'
import { scriptsBuild, scriptsWatch } from './gulp/tasks/scripts'
import { stylesBuild, stylesWatch } from './gulp/tasks/styles'
import { htmlBuild, htmlWatch } from './gulp/tasks/html'
import { fontsBuild, fontsWatch } from './gulp/tasks/fonts'
import { imagesBuild, imagesWatch } from './gulp/tasks/images'
// import { iconsBuild, iconsWatch } from './gulp/tasks/icons'
import { faviconsBuild, faviconsWatch } from './gulp/tasks/favicons'
import { spritesBuild, spritesWatch } from './gulp/tasks/sprites'

config.setEnv()

export const build = gulp.series(
  clean,
  gulp.parallel(
    scriptsBuild,
    stylesBuild,
    htmlBuild,
    fontsBuild,
    imagesBuild,
    // iconsBuild,
    faviconsBuild,
    spritesBuild,
  ),
)

export const watch = gulp.series(
  build,
  server,
  gulp.parallel(
    scriptsWatch,
    stylesWatch,
    htmlWatch,
    fontsWatch,
    imagesWatch,
    // iconsWatch,
    faviconsWatch,
    spritesWatch,
  ),
)

exports.spritesBuild = spritesBuild