const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cleanCSS = require('gulp-clean-css');
const header = require('gulp-header');
const fs = require('fs');
const replace = require('gulp-replace');

const paths = {
  scss: 'assets/scss/**/*.scss',
  cssDest: './',
  themeHeader: 'assets/scss/theme-header.css',
};

// テーマヘッダー読み込み
function getThemeHeader() {
  return fs.existsSync(paths.themeHeader)
    ? fs.readFileSync(paths.themeHeader, 'utf8') + '\n'
    : '';
}

// SCSSビルド
function compileSCSS() {
  const banner = getThemeHeader();

  return src('assets/scss/style.scss') // メインSCSSファイル
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(cleanCSS())
    .pipe(header(banner))
    .pipe(sourcemaps.write('.'))
    .pipe(replace(/\/\*# sourceMappingURL=.*\.css\.map \*\//g, ''))
    .pipe(dest(paths.cssDest));
}

// ファイル監視
function watchFiles() {
  console.log('[GULP] SCSS watch started');
  watch(paths.scss, compileSCSS);
}

exports.default = series(compileSCSS, watchFiles);
