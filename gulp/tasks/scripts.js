import fs from 'fs';
import gulp from 'gulp';
import config from '../config';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import gulpIf from 'gulp-if';

export const scriptsBuild = () => (
  browserify(`${config.src.js}/main.js`, { debug: true })
    .transform('babelify', { presets: ['@babel/preset-env'] })
    .bundle()
    .on('error', function browserifyError(error) {
      console.error(error.stack);
      this.emit('end');
    })
    .pipe(source('main.min.js'))
    .pipe(buffer())
    .pipe(gulpIf(config.isDev, sourcemaps.init({ loadMaps: true })))
    .pipe(gulpIf(config.isProd, uglify()))
    .pipe(gulpIf(config.isDev, sourcemaps.write()))
    .pipe(gulp.dest(config.dest.js))
);

export const scriptsWatch = () => gulp.watch(`${config.src.js}/**/*.js`, scriptsBuild)