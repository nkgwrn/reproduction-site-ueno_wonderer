const gulp = require("gulp");
const sass = require("gulp-sass");
const ejs = require("gulp-ejs");
const rename = require("gulp-rename");
const browserSync = require("browser-sync").create();
const postcss = require("gulp-postcss");
// const autoprefixer = require("gulp-autoprefixer");
const autoprefixer = require("autoprefixer");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const cache = require("gulp-cached");
const progeny = require("gulp-progeny");

function buildJS(cb) {
  gulp.src("./src/js/*.js").pipe(gulp.dest("./public/js"));
  cb();
}

function buildImage(cb) {
  gulp.src(["./src/image/*"]).pipe(gulp.dest("./public/image/"));
  gulp.src(["./src/image/sp/*"]).pipe(gulp.dest("./public/image/sp"));
  cb();
}

function buildSass(cb) {
  gulp
    .src("./src/sass/**/*.scss")
    .pipe(cache("style"))
    .pipe(progeny())
    .pipe(
      plumber({
        errorHandler: notify.onError("Error: <%= error.message %>"),
      })
    )
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(
      postcss([
        autoprefixer({
          Browserslist: [
            "last 2 versions",
            "ie >= 11",
            "Android >= 4",
            "ios_saf >= 8",
          ],
          cascade: false,
        }),
      ])
    )
    .pipe(gulp.dest("./public/css"));
  cb();
}

function buildEjs(cb) {
  gulp
    .src(["./src/ejs/pages/*.ejs", "!./src/ejs/components/_*.ejs"])
    .pipe(ejs())
    .pipe(rename({ extname: ".html" }))
    .pipe(gulp.dest("./public"));
  cb();
}

function watchJS(cb) {
  gulp.watch(["./src/js/*.js"], buildJS).on("change", browserSync.reload);
  cb();
}

function watchImage(cb) {
  gulp.watch(["./src/image/*"], buildImage).on("change", browserSync.reload);
  gulp.watch(["./src/image/sp/*"], buildImage).on("change", browserSync.reload);
  cb();
}

function watchEjs(cb) {
  gulp
    .watch(["./src/ejs/pages/*.ejs", "./src/ejs/components/_*.ejs"], buildEjs)
    .on("change", browserSync.reload);
  cb();
}

function watchSass(cb) {
  gulp
    .watch(["./src/sass/**/*.scss"], buildSass)
    .on("change", browserSync.reload);
  cb();
}

function server(cb) {
  browserSync.init({
    server: {
      baseDir: "./public",
    },
  });
  cb();
}

exports.watch = gulp.parallel(watchSass, watchEjs, watchJS, watchImage, server);
exports.default = gulp.parallel(buildSass, buildEjs, buildJS, buildImage);
