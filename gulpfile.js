var gulp = require('gulp'),
	sass = require('gulp-sass'),
	postcss = require('gulp-postcss'),
	pxtorem = require('postcss-pxtorem'),
	cssnano = require('gulp-cssnano'),
	autoprefixer = require('gulp-autoprefixer'),
	rename = require('gulp-rename'),
	imagemin = require('gulp-imagemin'),
		imageminJpegtran = require('imagemin-jpegtran'),
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
		  	images: ['src/assets/img/*.jpg', 'src/assets/img/*.png'],
		},
		dist: {
		  	html: 'dist',
			styles: 'dist/assets/css',
			scripts: 'dist/assets/js',
			fonts: 'dist/assets/fonts',
			images: 'dist/assets/img'
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
gulp.task('serve', ['styles', 'vendor-scripts', 'main-js'], function() {
    browserSync.init({ server: ["src/"] });

    gulp.watch(paths.src.scss, ['scss-to-css']);
    gulp.watch(paths.src.css, ['styles']);
    gulp.watch(paths.src.main_js, ['main-js']);
    // gulp.watch(paths.images, ['images']);
    gulp.watch(paths.src.html).on('change', browserSync.reload);
});


// build
gulp.task('build', ['clean', 'styles', 'vendor-scripts', 'main-js'], function(){
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

// 
// STYLES
// 
gulp.task('scss-to-css', function() {
    return gulp.src(paths.src.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(concat('main.min.css'))
		.pipe(cssnano())
		.pipe(gulp.dest(paths.src.css_dest));
});

// pxtorem
gulp.task('styles', ['scss-to-css'], function(){
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
                '.menu-trigger'
            ],
		    replace: true,
		    mediaQuery: false,
		    minPixelValue: 0
		})
	];

	return gulp.src(paths.src.css) 
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
		// .pipe(uglify())
		.pipe(gulp.dest(paths.src.scripts_dest))
		.pipe(browserSync.stream());
});

// 
// IMAGES
// 

// jump to build task
// gulp.task('html-min', function () {
// 	return gulp.src(paths.html)
// 	.pipe(gulp.dest(paths.dist_html))
// });

// // images
// gulp.task('images', function(){
// 	return gulp.src(paths.images)
//         .pipe(imagemin(imagemin.jpegtran({progressive: true})))
//         .pipe(gulp.dest(paths.dist_images))
// });