import gulp from 'gulp'
import config from '../config'

export const jsonBuild = () => (
  gulp.src(`${config.src.json}/**/*`)
    .pipe(gulp.dest(config.dest.json))
)

export const jsonWatch = () => gulp.watch(`${config.src.json}/**/*`, jsonBuild)
