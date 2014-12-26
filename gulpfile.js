var gulp  = require('gulp');
var mocha = require('gulp-mocha');
var cover = require('gulp-coverage');
var del   = require('del');


var watching = false;
function onError(err) {
  if(watching) {
    this.emit('end');
  }
  else {
    console.log(err.toString());
  }
}

gulp.task ('test',['clean'],function() {
  return gulp.src('test.js', { read: false })
  .pipe(cover.instrument({
    pattern: ['index.js']
    }))
  .pipe(mocha({reporter:'spec'}))
  .pipe(cover.gather())
  .pipe(cover.format('html'))
  .pipe(gulp.dest('.'))
  .on("error",onError);
});

gulp.task('clean', function (cb) {
  del(".coverdata", cb);
});


gulp.task('watch', function() {
  gulp.watch('**/*.js', ['test']);
});

gulp.task('default', ['test']);
