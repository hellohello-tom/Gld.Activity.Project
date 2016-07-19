var gulp = require('gulp'),
  browserSync = require('browser-sync'),
  // concat = require('gulp-concat'),
  // del = require('del'),
  // rename = require('gulp-rename'),
  // revAppend = require('gulp-rev-append'),
  // jshint = require('gulp-jshint'),
  // cleanCSS = require('gulp-clean-css'),
  gutil = require('gulp-util'),
  minify = require('gulp-minify'),
  sourcemaps = require('gulp-sourcemaps'),
  uglify = require('gulp-uglify'),
  sass = require('gulp-sass'),
  less = require('gulp-less'),
  webpack = require('webpack');

var webpackConfig = Object.create(require('./webpack.config.js'));

var opts = {
  srcPath: './src/',
  destPath: './dist/',
  minRename: {
    suffix: '.min'
  }
};
var cssStyles = ['compressed', 'expanded'],
  cssStyle = cssStyles[1];

//清理文件
// gulp.task('clean', function(cb) {
//   del([driDist + 'css/', dirDist + 'scripts/bundle/'], cb);
// });

//构建
gulp.task('build', ['uglify'], function() {
  console.log('Good Job!');
});

//默认启动任务
gulp.task('default', ['browserSync'], function() {
  // gulp.start('minify','cleancss')
  console.log('Enjoy!');
});

//文件添加版本号，在HTML中写入**.js?rev=@hash
// gulp.task('rev', function() {
//   gulp.src('./src/htmls/pc/*.html')
//     .pipe(revAppend())
//     .pipe(gulp.dest(opts.destPath + 'htmls/pc/'));
// })

gulp.task('greet', function() {
  console.log('Hello World!');
});

// gulp.task('jshint', function() {
//   gulp.src(opts.destPath + 'scripts/*.js').pipe(jshint());
// });

//压缩、链接资源类
gulp.task('uglify', function() {
  gulp.src(opts.destPath + 'scripts/bundle/*.js')
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(gulp.dest(opts.destPath + 'scripts/bundle'));
  // .pipe(rename({suffix:'.min'}))
  // .pipe(sourcemaps.write('../maps'))
});

gulp.task('minify', function() {
  gulp.src(opts.destPath + 'scripts/bundle/*.js')
    .pipe(minify({
      exclude: ['tasks'],
      ignoreFiles: ['.combo.js', '-min.js']
    }))
    .pipe(gulp.dest(opts.destPath + 'scripts/bundle'));
});

// gulp.task('minifycss', ['sass'], function() {
//   gulp.src(opts.destPath + 'CSS/*.css').pipe(cleanCSS()).pipe(gulp.dest(opts.destPath + 'CSS'));
// });

//outputStyle:compressed,expanded
gulp.task('sass', function() {
  gulp.src('./scss/*.scss')
    .pipe(sass({ outputStyle: cssStyle }).on('error', sass.logError))
    .pipe(gulp.dest(opts.destPath + 'css'));
});

gulp.task('less', function() {
  gulp.src(['src/less/*.less', '!src/less/_*.less'])
    .pipe(less())
    .pipe(gulp.dest(opts.destPath + 'css'));
});

//PostCSS、未成功
// var postcss = require('gulp-postcss'),
//   cssnext = require('postcss-cssnext'),
//   precss = require('precss');
// var processors = [cssnext];
// gulp.task('postcss', function() {
//   return gulp.src('./src/postCSS/**/*.css')
//     .pipe(postcss(processors))
//     .pipe(gulp.dest(opts.destPath + 'css'));
// });

//传给webpack用
gulp.task('webpack', function(callback) {
  webpack(
    webpackConfig,
    function(err, stats) {
      if (err) throw new gutil.PluginError('webpack', err);
      // gutil.log('[webpack]',stats.toString({}))

      stats.compilation.errors[0] && console.log(stats.compilation.errors[0].error);
      callback();
      // console.log(err);
    });
});
// gulp.watch('app/src/**/*.js', ['webpack']);

//根据文件类型变动，自动刷新浏览器
gulp.task('browserSync', ['sass', 'webpack'], function() {
  browserSync({
    files: ['**/*.html', '**/*.css', '**/*.js', '!**.less', '!**.coffee', '!**.SCSS', '!node_modules/**.*', '!src/**.*', '!webpack.config.js'],
    server: {
      baseDir: './'
    },
    port: 2018
  });
  gulp.watch('./scss/**/*.scss', ['sass']);
  gulp.watch('./src/**/*.*', ['webpack']);
  //gulp.watch('./src/scripts/**/*.js', ['rev']);
});
