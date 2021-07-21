import gulp from 'gulp';
import config from '../config';

export const imagesBuild = () => (
  gulp.src(`${config.src.images}/**/*`)
    .pipe(gulp.dest(config.dest.images))
);

export const imagesWatch = () => gulp.watch(`${config.src.images}/**/*`, imagesBuild);