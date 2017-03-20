'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const babelify = require('babelify');
const autoprefixer = require('gulp-autoprefixer');
const uglify=require('gulp-uglify');
const concat=require('gulp-concat');
const browserify=require('browserify');
const buffer=require('vinyl-buffer');
const source=require('vinyl-source-stream');
const browserSync=require("browser-sync").create();




const MAIN_CONF= require('./gulp_config');


gulp.task('sass', function () {
  return gulp.src('./src/scss/**/*.{scss,css}')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(MAIN_CONF.compatible_browsers))
    .pipe(concat("main.css"))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
});


gulp.task('js', function () {
  return browserify({entries: './src/js/main.js', extensions: ['.js'], debug: true})
        .transform(babelify)
        .bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.stream());
});



gulp.task('copy_static_data',function(){
  return gulp.src(['./src/index.html,./src/data/**/*'])
  .pipe(gulp.dest('./dist/'))
  .pipe(browserSync.stream());
})

gulp.task('localserver', function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
});




gulp.task('init',['copy_static_data','sass','js','localserver'], function () {
  gulp.watch(['./src/index.html,./src/data/**/*'], ['copy_index_html']);
  gulp.watch('./src/scss/**/*.scss', ['sass']);
  gulp.watch('./src/js/**/*.js', ['js']);
});
