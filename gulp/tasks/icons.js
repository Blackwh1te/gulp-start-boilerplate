import gulp from 'gulp';
import config from '../config';

export const iconsBuild = () => (
  gulp.src(`${config.src.icons}/**/*`)
    .pipe(gulp.dest(config.dest.icons))
);

export const iconsWatch = () => gulp.watch(`${config.src.icons}/**/*`, iconsBuild);