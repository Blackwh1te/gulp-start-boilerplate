import gulp from 'gulp'
import postcss from 'gulp-postcss'
import sourcemaps from 'gulp-sourcemaps'
import concat from 'gulp-concat'
import config from '../config'

export const stylesBuild = () => {
  return (
    gulp.src(`${config.src.postcss}/style.pcss`)
      .pipe(sourcemaps.init())
      .pipe(postcss({ isBuild: true }))
      .pipe(concat('style.min.css'))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(config.dest.css))
  )
}

export const stylesWatch = () => { return gulp.watch(`${config.src.postcss}/**/*.pcss`, stylesBuild) }
