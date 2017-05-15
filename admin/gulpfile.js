const gulp              = require('gulp');
const babelify          = require('babelify');
const browserify        = require('browserify');
const vinylSourceStream = require('vinyl-source-stream');
const vinylBuffer       = require('vinyl-buffer');

// Load all gulp plugins into the plugins object.
const plugins = require('gulp-load-plugins')();

const src = {
  html   : 'src/**/*.html',
  lib    : 'src/contents/lib/**',
  js     : 'src/contents/js/**',
  css    : 'src/contents/css/**',
  images : 'src/contents/images/**',
  graph  : 'src/contents/graph/**',
  fonts  : 'src/contents/fonts/**',
  scripts: {
    all  : 'src/scripts/!**/!*.js',
    app  : 'src/scripts/app.js'
  }
};

const build = 'dest/';
const out   = {
  lib     : `${build}contents/lib/`,
  css     : `${build}contents/css/`,
  images  : `${build}contents/images/`,
  js      : `${build}contents/js/`,
  fonts   : `${build}contents/fonts/`,
  graph   : `${build}contents/graph/`,
  scripts : {
    file  : 'app.js',
    folder: `${build}app/`
  }
};

gulp.task('html', function () {
  return gulp.src(src.html)
             .pipe(gulp.dest(build))
             .pipe(plugins.connect.reload());
});

/* The jshint task runs jshint with ES6 support. */

gulp.task('jshint', function () {
  return gulp.src(src.scripts.all)
             .pipe(plugins.jshint({
               esnext: true // Enable ES6 support
             }))
             .pipe(plugins.jshint.reporter('jshint-stylish'));
});


gulp.task('lib', function () {
  /* In a real project you of course would use npm or bower to manage libraries. */
  return gulp.src(src.lib)
             .pipe(gulp.dest(out.lib))
             .pipe(plugins.connect.reload());
});

gulp.task('css', function () {
  /* In a real project you of course would use npm or bower to manage libraries. */
  return gulp.src(src.css)
             .pipe(gulp.dest(out.css))
             .pipe(plugins.connect.reload());
});

gulp.task('images', function () {
  /* In a real project you of course would use npm or bower to manage libraries. */
  return gulp.src(src.images)
             .pipe(gulp.dest(out.images))
             .pipe(plugins.connect.reload());
});
gulp.task('js', function () {
  /* In a real project you of course would use npm or bower to manage libraries. */
  return gulp.src(src.js)
             .pipe(gulp.dest(out.js))
             .pipe(plugins.connect.reload());
});

gulp.task('fonts', function () {
  /* In a real project you of course would use npm or bower to manage libraries. */
  return gulp.src(src.fonts)
             .pipe(gulp.dest(out.fonts))
             .pipe(plugins.connect.reload());
});

gulp.task('graph', function () {
  /* In a real project you of course would use npm or bower to manage libraries. */
  return gulp.src(src.graph)
             .pipe(gulp.dest(out.graph))
             .pipe(plugins.connect.reload());
});

/* Compile all script files into one output minified JS file. */
/*gulp.task('scripts', ['jshint'], function () {*/
gulp.task('scripts', function () {
  const sources = browserify({
    entries: src.scripts.app,
    debug  : true // Build source maps
  })
    .transform(babelify.configure({
      // can configure babel here!
      // https://babeljs.io/docs/usage/options/
      presets: ["es2015"]
    }));

  return sources.bundle()
                .pipe(vinylSourceStream(out.scripts.file))
                .pipe(vinylBuffer())
                .pipe(plugins.sourcemaps.init({
                  loadMaps: true // Load the sourcemaps browserify already generated
                }))
                .pipe(plugins.ngAnnotate())
                .pipe(plugins.uglify())
                .pipe(plugins.sourcemaps.write('./', {
                  includeContent: true
                }))
                .pipe(gulp.dest(out.scripts.folder))
                .pipe(plugins.connect.reload());

});

gulp.task('start', ['build', 'watch'], function () {
  plugins.connect.server({
    root      : build,
    port      : 3232,
    livereload: true,
    fallback  : build + 'views/index.html'
  });
});

gulp.task('watch', function () {
  gulp.watch(src.lib, ['lib']);
  gulp.watch(src.css, ['css']);
  gulp.watch(src.images, ['images']);
  gulp.watch(src.js, ['js']);
  gulp.watch(src.fonts, ['fonts']);
  gulp.watch(src.graph, ['graph']);
  gulp.watch(src.html, ['html']);
  gulp.watch('src/scripts/**/*.js', ['scripts']);
});

gulp.task('build', ['scripts', 'html', 'lib', 'css', 'images', 'js', 'fonts', 'graph']);
gulp.task('default', ['start']);
