var gulp = require('gulp'),
sass = require('gulp-sass'),
concat = require('gulp-concat'),
autoprefixer = require('autoprefixer'),
cssmin = require('gulp-cssmin'),
rename = require('gulp-rename'),
postcss = require('gulp-postcss'),
mqpacker = require('css-mqpacker'),
imagemin = require('gulp-imagemin'),
svgstore = require('gulp-svgstore'),
svgmin = require('gulp-svgmin'),
del = require('del'),
run = require('run-sequence'),
plumber = require('gulp-plumber'),
browserSync = require('browser-sync').create();

// Static server
gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: './'
		},
		tunnel: 'barbershop',
		notify: false
	});
});


gulp.task('styles', function() {
	return gulp.src(['sass/style.sass', 'sass/fonts.sass'])
	.pipe(plumber())
	.pipe(sass({outputStyle: 'nested'}).on('error', sass.logError))
	.pipe(postcss([
			autoprefixer({
				browsers: ['last 3 versions'],
				cascade: false
			}),
			mqpacker({
				sort: true
			})
		]))
	.pipe(cssmin())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('css'))
	.pipe(browserSync.stream());
});

gulp.task('sprite', function() {
	var spriteData = gulp.src('img/sprite/*.png')
		.pipe(spritesmith({
		/* this whole image path is used in css background declarations */
		imgName: '../img/sprite.png',
		cssName: 'sprite.sass'
		}));
	spriteData.img.pipe(gulp.dest('img'));
	spriteData.css.pipe(gulp.dest('sass'));
});

gulp.task('images', function() {
	return gulp.src('img/**/*.{png,jpg,gif}')
		.pipe(imagemin([
			imagemin.optipng({optimizationLevel: 3}),
			imagemin.jpegtran({progressive: true})
		]))
		.pipe(gulp.dest('img'))
});


gulp.task('symbols', function() {
	return gulp.src('img/*.svg')
		.pipe(svgmin())
		.pipe(svgstore({
			inlineSvg: true
		}))
		.pipe(rename('symbols.svg'))
		.pipe(gulp.dest('img'));
});

gulp.task('watch', function() {
	gulp.watch('sass/**/*.sass', ['styles']);
	gulp.watch('*.html').on("change", browserSync.reload);
	gulp.watch('js/common.js').on("change", browserSync.reload);
});

gulp.task('default', ['styles', 'browser-sync', 'watch']);


gulp.task('copy', function() {
	return gulp.src([
			'fonts/**',
			'img/**',
			'js/**',
			'*.html'
		], {
			base: '.'
		})
	.pipe(gulp.dest('build'));
});

gulp.task('clean', function() {
	return del('build');
});

gulp.task('build', function(fn) {
	run('clean', 'copy', 'styles', 'images', 'symbols', fn);
});