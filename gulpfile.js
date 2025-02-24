const gulp = require('gulp');
const concat = require('gulp-concat-css');
const plumber = require('gulp-plumber');
const del = require('del');
const browserSync = require('browser-sync').create();

function html() {
    return gulp.src('src/**/*.html')
            .pipe(plumber())
            .pipe(gulp.dest('dist/'))
            .pipe(browserSync.reload({stream: true}));
  }


  
function css() {
    return gulp.src('src/blocks/**/*.css')
            .pipe(plumber())
            .pipe(concat('bundle.css'))
            .pipe(gulp.dest('dist/'))
            .pipe(browserSync.reload({stream: true}));
}

function images() {
    return gulp.src('src/images/**/*.{jpg,png,svg,ico,webp,avif}', { encoding: false })
            .pipe(gulp.dest('dist/images'))
            .pipe(browserSync.reload({stream: true}));
}

function video() {
    return gulp.src('src/video/**/*.{mp4,mov,avi}', { encoding: false })
            .pipe(gulp.dest('dist/video'))
}

function fonts() {
    return gulp.src('src/fonts/**/*.{woff,css}', { encoding: false })
            .pipe(gulp.dest('dist/fonts'))
}

function clean() {
    return del('dist');
}

const build = gulp.series(clean, gulp.parallel(html, css, images, fonts, video));

function watchFiles() {
    gulp.watch(['src/**/*.html'], html);
    gulp.watch(['src/blocks/**/*.css'], css);
    gulp.watch(['src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}'], images);
}

const watchapp = gulp.parallel(build, watchFiles, serve);

function serve() {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    })
}


exports.html = html
exports.css = css 
exports.images = images;
exports.video = video;
exports.fonts = fonts;
exports.clean = clean;

exports.build = build;
exports.watchapp = watchapp;
exports.default = watchapp;