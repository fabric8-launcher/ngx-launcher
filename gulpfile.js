
var gulp = require('gulp'),
  runSequence = require('run-sequence'),
  del = require('del'),
  replace = require('gulp-string-replace'),
  sourcemaps = require('gulp-sourcemaps'),
  exec = require('child_process').exec,
  ngc = require('gulp-ngc'),
  changed = require('gulp-changed'),
  path = require('path'),
  util = require('gulp-util')

var appSrc = 'src';
var libraryDist = 'dist';
var watchDist = 'dist-watch';
var globalExcludes = [ '!./**/examples/**', '!./**/examples' ]

/**
 * FUNCTION LIBRARY
 */

function copyToDist(srcArr) {
  return gulp.src(srcArr.concat(globalExcludes))
    .pipe(gulp.dest(function (file) {
      return libraryDist + file.base.slice(__dirname.length); // save directly to dist
    }));
}

function updateWatchDist() {
  return gulp
    .src([libraryDist + '/**'].concat(globalExcludes))
    .pipe(changed(watchDist))
    .pipe(gulp.dest(watchDist));
}

/**
 * TASKS
 */

gulp.task('post-transpile', ['transpile'], function () {
  return gulp.src(['dist/src/app/**/*.js'])
    .pipe(replace(/templateUrl:\s/g, "template: require("))
    .pipe(replace(/\.html',/g, ".html'),"))
    .pipe(replace(/\.html'/g, ".html')"))
    .pipe(replace(/styleUrls: \[/g, "styles: [require("))
    .pipe(replace(/\.scss']/g, ".css').toString()]"))
    .pipe(gulp.dest(function (file) {
      return file.base; // because of Angular 2's encapsulation, it's natural to save the css where the scss-file was
    }));
});

// Put the SASS files back to normal
gulp.task('build-library',
  [
    'transpile',
    'copy-static-assets',
    'copy-images'
  ]);

gulp.task('transpile', function () {
  return ngc('tsconfig.json')
});

gulp.task('copy-html', function () {
  return copyToDist([
    'src/**/*.html'
  ]);
});

gulp.task('copy-images', function () {
  return copyToDist([
    'src/**/*.png',
    'src/**/*.svg'
  ]);
});

gulp.task('copy-static-assets', function () {
  return gulp.src([
    'LICENSE',
    'README.adoc',
    'package.json',
  ])
    .pipe(gulp.dest(libraryDist));
});

gulp.task('copy-watch', ['post-transpile'], function() {
  return updateWatchDist();
});

gulp.task('copy-watch-all', ['build-library'], function() {
  return updateWatchDist();
});

gulp.task('watch', ['build-library', 'copy-watch-all'], function () {
  gulp.watch([appSrc + '/app/**/*.ts', '!' + appSrc + '/app/**/*.spec.ts'], ['transpile', 'post-transpile', 'copy-watch']).on('change', function (e) {
    util.log(util.colors.cyan(e.path) + ' has been changed. Compiling.');
  });
  gulp.watch([appSrc + '/app/**/*.html']).on('change', function (e) {
    util.log(util.colors.cyan(e.path) + ' has been changed. Updating.');
    copyToDist(e.path);
    updateWatchDist();
  });
  util.log('Now run');
  util.log('');
  util.log(util.colors.red('    npm link', path.resolve(watchDist)));
  util.log('');
  util.log('in the npm module you want to link this one to');
});
