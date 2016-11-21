var gulp = require('gulp')
var rename = require('gulp-rename')

//scripts
var browserify = require('browserify')
var vinyl = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')
var uglify = require('gulp-uglify')

//style
var sass = require('gulp-sass')
var autoprefixer = require('gulp-autoprefixer')
var minify = require('gulp-minify-css')

//serve
var sync = require('browser-sync')
    reload = sync.reload

///////////////////
//build
gulp.task('scss', function(){
    return gulp.src('./src/resume.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(minify())
        .pipe(gulp.dest('./dist/'))
        .pipe(reload({stream: true}))
})

gulp.task('js', function(){
    return browserify('./src/resume.js')
        .bundle()
        .pipe(vinyl('resume.js'))//source
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('./dist/'))
        .pipe(reload({stream: true}))
})

gulp.task('default', ['scss', 'js'], function(){
    sync({
        server: {
            baseDir: './dist' 
        }
    })

    gulp.watch(['./src/*', './dist/index.html'], ['scss', 'js'])
})