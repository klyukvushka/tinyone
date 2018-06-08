var gulp = require("gulp");
var sass = require("gulp-sass");
var csso = require("gulp-csso");
var browserSync = require("browser-sync").create();
var imagemin = require("gulp-imagemin");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var htmlmin = require("gulp-htmlmin");
var spritesmith = require("gulp.spritesmith");
var autoprefixer = require("gulp-autoprefixer");
var sourcemaps = require("gulp-sourcemaps");

gulp.task("php", function() {
  return gulp.src("src/php/*.php").pipe(gulp.dest("dist/php"));
});

gulp.task("sprite", function() {
  var spriteData = gulp.src("src/images/icons/*.*").pipe(
    spritesmith({
      imgName: "sprite.png",
      cssName: "sprite.scss",
      cssFormat: "scss",
      padding: 2
    })
  );
  spriteData.img.pipe(gulp.dest("dist/images/"));
  spriteData.css.pipe(gulp.dest("src/styles/"));
});

gulp.task("sass", function() {
  return gulp
    .src("src/styles/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"],
        cascade: false
      })
    )
    .pipe(csso())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("dist/css"));
});

gulp.task("browser-sync", function() {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });
  browserSync.watch("dist", browserSync.reload);
});

gulp.task("images", function() {
  gulp
    .src("src/images/**/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/images"));
});

gulp.task("javascript", function() {
  return gulp
    .src("src/js/*.js")
    .pipe(concat("build.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist/javascript"));
});

gulp.task("html", function() {
  return gulp
    .src("src/*.html")
    .pipe(htmlmin())
    .pipe(gulp.dest("dist"));
});

gulp.task("watch", ["php", "browser-sync", "sass", "images", "javascript", "html"], function() {
  gulp.watch(["src/styles/**/*.scss"], ["sass"]);
  gulp.watch(["src/images/**/*"], ["images"]);
  gulp.watch(["src/js/*.js"], ["javascript"]);
  gulp.watch(["src/*.html"], ["html"]);
});

gulp.task("default", ["watch"]);
