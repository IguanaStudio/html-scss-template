var gulp = require('gulp'),
	sass = require('gulp-sass'),
	cssnano = require('gulp-cssnano'),
	autoprefixer = require('gulp-autoprefixer'),
	rename = require('gulp-rename'),
	imagemin = require('gulp-imagemin'),
	imageminJpegtran = require('imagemin-jpegtran'),
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


// 
// MAIN
// 

// clean
gulp.task('clean', function(){
	return del.sync('dist');
});

// serve
gulp.task('serve', ['scss-to-css', 'vendor-scripts', 'main-js'], function() {
    browserSync.init({ server: ["src/"] });

    gulp.watch(paths.src.scss, ['scss-to-css']);
    gulp.watch(paths.src.main_js, ['main-js']);
    // gulp.watch(paths.images, ['images']);
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

// 
// SCRIPTS
// 

// vendor scripts
gulp.task('vendor-scripts', function(){
	return gulp.src(paths.src.vendor_scripts)
		.pipe(concat('vendor.min.js'))
		.pipe(uglify().on('error', function(e){console.log(e)}))
		.pipe(gulp.dest(paths.src.scripts_dest));
});

// main js
gulp.task('main-js', function(){
	return gulp.src(paths.src.main_js)
		.pipe(rename({basename: 'main', suffix: '.min', extname: '.js'}))
		.pipe(uglify().on('error', function(e){console.log(e)}))
		.pipe(gulp.dest(paths.src.scripts_dest))
		.pipe(browserSync.stream());
});

// 
// STYLES
// 
gulp.task('scss-to-css', function() {
    return scss_files = gulp.src(paths.src.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(concat('main.min.css'))
		.pipe(cssnano())
		.pipe(gulp.dest(paths.src.css_dest))
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