var gulp = require('gulp'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    pxtorem = require('postcss-pxtorem'),
    combineMq = require('gulp-combine-mq'),
    cssnano = require('gulp-cssnano'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync').create(),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    del = require('del'),

    paths = {
        src: {
            html: 'src/*.html',
            scss: 'src/assets/scss/**/*.scss',
            css: 'src/assets/css/*.min.css',
            css_dest: 'src/assets/css',
            main_js: 'src/assets/js/main.js',
            vendor_scripts: 'src/assets/js/plugins/*.js',
            scripts_dest: 'src/assets/js',
            scripts: 'src/assets/js/*.min.js',
            fonts: 'src/assets/fonts/*',
            images: 'src/assets/img/**/*'
        },
        dist: {
            html: 'dist',
            styles: 'dist/assets/css',
            scripts: 'dist/assets/js',
            fonts: 'dist/assets/fonts',
            images: 'dist/assets/img'
        },
		public: {
            styles: '../../public/assets/css',
            scripts: '../../public/assets/js',
            fonts: '../../public/assets/fonts',
            images: '../../public/assets/img'
        }
    };

//
// TASKS
//

// default
gulp.task('default', ['serve']);

// clean
gulp.task('clean', function(){
    return del.sync('dist');
});

// serve
gulp.task('serve', ['scss-to-css', 'vendor-scripts', 'main-js'], function() {
    browserSync.init({
        server: ['src/']
    });

    gulp.watch(paths.src.scss, ['scss-to-css']);
    gulp.watch(paths.src.main_js, ['main-js']);
    gulp.watch(paths.src.vendor_scripts, ['vendor-scripts']);
    gulp.watch(paths.src.html).on('change', browserSync.reload);
});


// build
gulp.task('build', ['clean', 'scss-to-css', 'vendor-scripts', 'main-js'], function(){
    var html = gulp.src(paths.src.html)
        .pipe(gulp.dest(paths.dist.html));

    var css = gulp.src(paths.src.css)
        .pipe(gulp.dest(paths.dist.styles));

    var js = gulp.src(paths.src.scripts)
        .pipe(gulp.dest(paths.dist.scripts));

    var fonts = gulp.src(paths.src.fonts)
        .pipe(gulp.dest(paths.dist.fonts));

    var imgs = gulp.src(paths.src.images)
        .pipe(gulp.dest(paths.dist.images));
});


// public
gulp.task('public', ['scss-to-css', 'vendor-scripts', 'main-js'], function(){
    var css = gulp.src(paths.src.css)
        .pipe(gulp.dest(paths.public.styles));

    var js = gulp.src(paths.src.scripts)
        .pipe(gulp.dest(paths.public.scripts));

    var fonts = gulp.src(paths.src.fonts)
        .pipe(gulp.dest(paths.public.fonts));

    var imgs = gulp.src(paths.src.images)
        .pipe(gulp.dest(paths.public.images));
});



//
// STYLES
//
gulp.task('scss-to-css', function() {
    var processors = [
        pxtorem({
            rootValue: 16,
            unitPrecision: 5,
            propWhiteList: [
                'font',
                'font-size',
                'margin',
                'margin-top',
                'margin-right',
                'margin-bottom',
                'margin-left',
                'padding',
                'padding-top',
                'padding-right',
                'padding-bottom',
                'padding-left',
                'width',
                'height',
                'top',
                'right',
                'bottom',
                'left'
            ],
            selectorBlackList: [
                'html',
                '.menu-trigger',
                '.container',
		        '.container-wide',
                '.contaniner-fluid',
                '.fullhd-limiter'
            ],
            replace: true,
            mediaQuery: false,
            minPixelValue: 0
        })
    ];

    return gulp.src(paths.src.scss)
        .pipe(sass().on('error', sass.logError))
        //.pipe(combineMq({beautify: false}))
        .pipe(autoprefixer())
        .pipe(concat('main.min.css'))
        .pipe(cssnano({ minifyFontValues: false, discardUnused: false }))
        .pipe(postcss(processors))
        .pipe(gulp.dest(paths.src.css_dest))
        .pipe(browserSync.stream());
});

//
// SCRIPTS
//

// vendor scripts
gulp.task('vendor-scripts', function(){
    return gulp.src(paths.src.vendor_scripts)
        .pipe(concat('vendor.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.src.scripts_dest));
});

// main js
gulp.task('main-js', function(){
    return gulp.src(paths.src.main_js)
        .pipe(rename({basename: 'main', suffix: '.min', extname: '.js'}))
        //.pipe(uglify())
        .pipe(gulp.dest(paths.src.scripts_dest))
        .pipe(browserSync.stream());
});
