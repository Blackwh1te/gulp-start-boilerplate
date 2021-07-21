import gulp from 'gulp';
import config from '../config';

export const fontsBuild = () => (
  gulp.src(`${config.src.fonts}/**/*`)
    .pipe(gulp.dest(config.dest.fonts))
);

export const fontsWatch = () => gulp.watch(`${config.src.fonts}/**/*`, fontsBuild);