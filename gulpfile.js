
'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();
var cleanCss = require('gulp-clean-css');
var concatCss = require('gulp-concat');

gulp.task('less', function () {
  return gulp.src(['./less/style.less' ])
    .pipe(less())
    //.pipe(concatCss('style.css'))
    //.pipe(cleanCss())
    .pipe(gulp.dest('./css'))
});

gulp.task('browserSync', function(){
  browserSync.init({
    server: {
      baseDir: './',
      index: 'index.html'
    }
  })
});

gulp.task('javascript-concat', function(){
    return gulp.src("./js/*.js")
        .pipe(concatCss("index.js"))
        .pipe(gulp.dest('./'))
});

gulp.task('less:watch',['browserSync', 'less'], function () {
  gulp.watch('./less/*.less', ['less']);
  gulp.watch('./js/*.js', ['javascript-concat']);
  gulp.watch('*.html', browserSync.reload);
  gulp.watch('./less/*.less', browserSync.reload);
  gulp.watch('./js/*.js', browserSync.reload);
});