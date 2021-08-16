import gulp from 'gulp'
import config from '../config'

export const imagesBuild = () => {
  return (
    gulp.src(`${config.src.images}/**/*`)
      .pipe(gulp.dest(config.dest.images))
  )
}

export const imagesWatch = () => { return gulp.watch(`${config.src.images}/**/*`, imagesBuild) }
