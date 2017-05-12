let gulp      = require('gulp');
let path      = require('path');
let spmlog    = require('../index');

gulp.task('spmlog', function () {
  gulp.src('./*.html')
    .pipe(spmlog())
    .pipe(gulp.dest('../dist'));
});