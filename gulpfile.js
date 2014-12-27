var gulp  = require('gulp');
var mocha = require('gulp-mocha');
var del   = require('del');
var coveralls = require('gulp-coveralls');
var istanbul = require('gulp-istanbul');


var watching = false;
function onError(err) {
  if(watching) {
    this.emit('end');
  }
  else {
    console.log(err.toString());
  }
}

gulp.task ('test',['clean'],function(cb) {
  gulp.src('index.js')
  .pipe(istanbul())
  .pipe(istanbul.hookRequire())
  .on('finish', function () {
    gulp.src(['test.js'])
    .pipe(mocha())
    .pipe(istanbul.writeReports())
    .on('end', cb);
  });
});

gulp.task('clean', function (cb) {
  del(".coverdata", cb);
});

gulp.task('coveralls',['test'], function() {
  return gulp.src('coverage/lcov.info')
    .pipe(coveralls());
});

gulp.task('watch', function() {
  gulp.watch('**/*.js', ['test']);
});

gulp.task('default', ['coveralls']);
