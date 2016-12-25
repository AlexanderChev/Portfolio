'use strict';

global.$ = {
  package: require('./package.json'),
  config: require('./gulp/config'),
  path: {
    task: require('./gulp/paths/tasks.js'),
    jsFoundation: require('./gulp/paths/js.foundation.js'),
    cssFoundation: require('./gulp/paths/css.foundation.js'),
    app: require('./gulp/paths/app.js')
  },
  gulp: require('gulp'),
  rimraf: require('rimraf'),
  browserSync: require('browser-sync').create(),
  gp: require('gulp-load-plugins')(),
  fs: require('fs')
};

$.path.task.forEach(function(taskPath) {
  require(taskPath)();
});

$.gulp.task('default', $.gulp.series(
  'clean',
  $.gulp.parallel(
    'sass',
    'pug',
    'js:foundation',
    'js:process',
    'sprite:png',
    'copy:image',
    'copy:font',
    'css:foundation',
    'sprite:svg'
  ),

  $.gulp.parallel(
    'watch',
    'serve'
  )
));

$.gulp.task('build', $.gulp.series(
  'clean',
  $.gulp.parallel(
    'sass',
    'copy:pug',
    'js:foundation',
    'js:process',
    'sprite:png',
    'copy:image',
    'copy:font',
    'css:foundation',
    'sprite:svg'
  )
));
