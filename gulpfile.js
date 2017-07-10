var gulp = require('gulp'),
    sass = require('gulp-sass'),
	pug = require('gulp-pug'),
    watch = require("gulp-watch"),
    gulpPugBeautify = require('gulp-pug-beautify'),
    include = require("gulp-include");
 

var source = '_application/',
    dest = 'build/',
    bootstrapSass = {
        in: 'bower_components/bootstrap/'
    },
    fonts = {
        in: [source + 'fonts/*.*', bootstrapSass.in + 'assets/fonts/**/*'],
        out: dest + 'fonts/glyphicons/'
    },
    js = {
        in: source + 'js/*.js',
        out: dest + 'js/'
    },
    css = {
	    in: source + 'scss/main.scss',
	    out: dest + 'styles/css/',
	    watch: source + 'scss/**/*',
	    sassOpts: {
	        outputStyle: 'nested',
	        precison: 3,
	        errLogToConsole: true,
	        includePaths: [bootstrapSass.in + 'scss']
	    }
	};




gulp.task("scripts", function() {
  console.log("-- gulp is running task 'scripts'");
 
  gulp.src(["bower_components/jquery/dist/jquery.min.js",  bootstrapSass.in + "dist/js/bootstrap.min.js", js.in])
    .pipe(include())
      .on('error', console.log)
    .pipe(gulp.dest(js.out));
});

// copy bootstrap required fonts to dest
gulp.task('fonts', function () {
    return gulp
        .src(fonts.in)
        .pipe(gulp.dest(fonts.out));
});
// compile scss
gulp.task('sass', ['fonts'], function () {
    return gulp.src(css.in)
        .pipe(sass(css.sassOpts))
        .pipe(gulp.dest(css.out));
});
// JADE (PUG)
gulp.task('pug', function () {
  return gulp.src(source + 'template/*.pug')
    .pipe(gulpPugBeautify({ omit_empty: true }))
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest(dest));
});
// default task
gulp.task('default', ['sass', 'scripts', 'pug'], function () {
     gulp.watch(css.watch, ['sass']);
     gulp.watch(source+'template/**/*.pug', ['pug']); 
     gulp.watch(source+'js/**/*.js', ['scripts']); 
});
