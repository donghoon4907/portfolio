import gulp from "gulp";
import gulpPug from "gulp-pug";
import gulpImage from "gulp-image";
import gulpSass from "gulp-sass";
import gulpAutoprefixer from "gulp-autoprefixer";
import gulpMinifyCss from "gulp-csso";
import gulpBrowserify from "gulp-bro";
import babelify from "babelify";
import del from "del";
import ws from "gulp-webserver";

gulpSass.compiler = require("node-sass");

const routes = {
  pug: {
    watch: "src/**/*.pug",
    src: "src/page/*.pug",
    dest: "build"
  },
  img: {
    src: "src/img/*",
    dest: "build/img"
  },
  scss: {
    watch: "src/scss/**/*.scss",
    src: "src/scss/style.scss",
    dest: "build/css/style.css"
  },
  js: {
    watch: "src/js/**/*.js",
    src: "src/js/entry/*.js",
    dest: "build/js"
  }
};

// pug => html in build
const pug = () =>
  gulp.src(routes.pug.src).pipe(gulpPug()).pipe(gulp.dest(routes.pug.dest));

// clean build folder
const clean = () => del(["build", ".publish"]);

// image optimization in build
const img = () =>
  gulp.src(routes.img.src).pipe(gulpImage()).pipe(gulp.dest(routes.img.dest));

// scss => css in build
const styles = () =>
  gulp
    .src(routes.scss.src)
    .pipe(gulpSass().on("error", gulpSass.logError))
    .pipe(gulpAutoprefixer())
    .pipe(gulpMinifyCss())
    .pipe(gulp.dest(routes.scss.dest));

// preset js
const js = () =>
  gulp
    .src(routes.js.src)
    .pipe(
      gulpBrowserify({
        transform: [
          babelify.configure({ presets: ["@babel/preset-env"] }),
          ["uglifyify", { global: true }]
        ]
      })
    )
    .pipe(gulp.dest(routes.js.dest));

const webserver = () =>
  gulp.src("build").pipe(
    ws({
      livereload: true, // 파일 저장 시 자동 새로고침 사용 여부
      open: true // 브라우저 자동 열림 사용 여부
    })
  );

const watch = () => {
  gulp.watch(routes.pug.watch, pug);
  gulp.watch(routes.scss.watch, styles);
  gulp.watch(routes.js.watch, js);
};

const prepare = gulp.series([clean, img]);

const assets = gulp.series([pug, styles, js]);

const devserver = gulp.parallel([webserver, watch]);

// execute:yarn build
export const build = gulp.series([prepare, assets]);
// execute:yarn dev
export const dev = gulp.series([build, devserver]);
// execute:yarn deploy
export const deploy = gulp.series([build]);
