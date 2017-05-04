var gulp      = require('gulp');
var path      = require('path');
var spmlog    = require('../index');

gulp.task('spmlog', function () {
    gulp.src('./*.html')
        .pipe(spmlog({
            logkey: 'x',
            selector: 'a, .btn'
        }))
        .pipe(gulp.dest('./'));
});