import gulp from 'gulp';
import config from '../config';

export const faviconsBuild = () => (
  gulp.src(`${config.src.favicons}/**/*`)
    .pipe(gulp.dest(config.dest.favicons))
);

export const faviconsWatch = () => gulp.watch(`${config.src.favicons}/**/*`, faviconsBuild);