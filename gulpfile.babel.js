import gulp from 'gulp'
import config from './gulp/config'
import clean from './gulp/tasks/clean'
import server from './gulp/tasks/server'
import { scriptsBuild, scriptsWatch } from './gulp/tasks/scripts'
import { stylesBuild, stylesWatch } from './gulp/tasks/styles'
import { htmlBuild, htmlWatch } from './gulp/tasks/html'
import { fontsBuild, fontsWatch } from './gulp/tasks/fonts'
import { imagesBuild, imagesWatch } from './gulp/tasks/images'
import { jsonBuild, jsonWatch } from './gulp/tasks/json'

config.setEnv()

export const build = gulp.series(
  clean,
  gulp.parallel(
    scriptsBuild,
    stylesBuild,
    htmlBuild,
    fontsBuild,
    imagesBuild,
    jsonBuild,
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
    jsonWatch,
  ),
)
