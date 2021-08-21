import gulp from 'gulp'
import config from '../config'

export const htmlBuild = () => {
  return (
    gulp.src(`${config.src.html}/*.html`)
      .pipe(gulp.dest(config.dest.html))
  )
}

export const htmlWatch = () => { return gulp.watch(`${config.src.html}/**/*.html`, htmlBuild) }
