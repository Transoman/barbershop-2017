var gulp = require('gulp'),
sass = require('gulp-sass'),
spritesmith = require('gulp.spritesmith'),
concat = require('gulp-concat'),
browserSync = require('browser-sync').create();

// Static server
gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: './'
		},
		tunnel: 'pink',
		notify: false
	});
});


gulp.task('styles', function() {
	return gulp.src('sass/style.sass')
	.pipe(sass({outputStyle: 'nested'}).on('error', sass.logError))
	.pipe(gulp.dest('css'))
	.pipe(browserSync.stream());
});

gulp.task('scripts', function() {
	return gulp.src([
		'libs/jquery/jquery-3.2.1.min.js',
		'libs/owlcarousel/dist/owl.carousel.min.js'
		])
	.pipe(concat('libs.js'))
	.pipe(gulp.dest('js'))
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


gulp.task('watch', function() {
	gulp.watch('sass/**/*.sass', ['styles']);
	gulp.watch('*.html').on("change", browserSync.reload);
	gulp.watch('js/common.js').on("change", browserSync.reload);
	gulp.watch('libs/**/*.js', ['scripts']);
});

gulp.task('default', ['styles', 'scripts', 'browser-sync', 'watch']);