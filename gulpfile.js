var gulp = require('gulp'),
    watch = require("gulp-watch"),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    gulpPugBeautify = require('gulp-pug-beautify'),
    sourcemaps = require('gulp-sourcemaps'),
    include = require("gulp-include");
 

var source = '_application/',
    dest = 'build/',
    path = {
        bootstrapSass: {
            in: 'bower_components/bootstrap/',
        },
        pug: {
            compile: source + 'template/*.pug',
        },
        css: {
            in: source + 'scss/main.scss',
            out: dest + 'styles/css/',
            sassOpts: {
                outputStyle: 'nested',
                precison: 3,
                errLogToConsole: true,
                includePaths: [bootstrapSass.in + 'scss']
        },
        js: {
            in: source + 'js/*.js',
            out: dest + 'js/',
            jquery_bower_src: 'bower_components/jquery/dist/jquery.min.js',
            bootstrap_js_src: bootstrapSass.in + 'dist/js/bootstrap.min.js'
        },
        img: {
            in: source + 'images/**/*.*',
            out: dest + 'images/'
        },
        fonts: {
            in: source + 'fonts/**/*.*',
            out: dest + 'fonts/'
        },
        watch: {
            pug: source+'template/**/*.pug',
            js: source+'js/**/*.js',
            css: source + 'scss/**/*',
            bootstrapCSS: source + 'scss/**/*'
        }
    }


//---------------------------------------------------------
// ---------------------- TASKS ---------------------------
//---------------------------------------------------------

// SCSS
gulp.task('sass', function () {
    console.log("-- SCSS --");
    return gulp.src(path.css.in)
        .pipe(sass(path.css.sassOpts))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.css.out));
});
// JADE (PUG)
gulp.task('pug', function () {
    console.log("-- JADE (PUG) --");
    return gulp.src(path.pug.compile)
        .pipe(gulpPugBeautify({omit_empty: true}))
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest(dest));
});
// ECMA SCRIPT (JS)
gulp.task("scripts", function() {
  console.log("-- ECMA SCRIPT (JS) --");
  return gulp.src([path.js.jquery_bower_src,  path.js.bootstrap_js_src, path.js.in])
    .pipe(include())
    .on('error', console.log)
    .pipe(gulp.dest(path.js.out));
});
// IMAGES COPY
gulp.task('images', function () {
    console.log("-- IMAGES COPY --");
    gulp.src(path.img.in)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.img.out)) //И бросим в build
        .pipe(reload({stream: true}));
});
// FONTS COPY
gulp.task('fonts', function() {
    console.log("-- FONTS COPY --");
    gulp.src(path.fonts.in)
        .pipe(gulp.dest(path.fonts.out))
});


// default task
gulp.task('default', ['sass', 'scripts', 'pug'], function () {
     gulp.watch(path.watch.css, ['sass']);
     gulp.watch(path.watch.bootstrapCSS, ['sass']);
     gulp.watch(path.watch.pug, ['pug']); 
     gulp.watch(path.watch.js, ['scripts']); 
});
