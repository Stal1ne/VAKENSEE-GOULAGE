const gulp = require("gulp");
const postcss = require("gulp-postcss");
const imagemin = require("gulp-imagemin");
const rename = require("gulp-rename");
const htmlmin = require("gulp-htmlmin");

const plugins = [require("autoprefixer"), require("cssnano")];

function build(cb) {
  gulp.parallel([html, css, res])(cb);
}

function watch(cb) {
  gulp.watch("./src/**/*.html", { ignoreInitial: false }, html);
  gulp.watch("./res/*", { ignoreInitial: false }, res);
  gulp.watch("./src/**/*.css", { ignoreInitial: false }, css);
  cb();
}

function html(cb) {
  gulp
    .src("./src/**/*.html")
    .pipe(
      htmlmin({
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        removeTagWhitespace: true,
      })
    )
    .pipe(gulp.dest("./dist/"));
  cb();
}

function css(cb) {
  gulp
    .src("./src/style.css", { sourcemaps: true })
    .pipe(postcss(plugins))
    .pipe(gulp.dest("./dist/", { sourcemaps: true }));
  cb();
}

function res(cb) {
  gulp.src("./res/*").pipe(imagemin()).pipe(gulp.dest("./dist/img/"));
  cb();
}

module.exports = {
  default: build,
  watch,
};
