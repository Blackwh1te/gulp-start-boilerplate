import gulp from 'gulp';
import postcss from 'gulp-postcss';
import config from '../config';
import sourcemaps from 'gulp-sourcemaps';
import concat from 'gulp-concat';

export const stylesBuild = () => (
  gulp.src(`${config.src.postcss}/style.pcss`)
    .pipe(sourcemaps.init())
    .pipe(postcss({ isBuild: true }))
    .pipe(concat('style.min.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.dest.css))
);

export const stylesWatch = () => gulp.watch(`${config.src.postcss}/**/*.pcss`, stylesBuild);