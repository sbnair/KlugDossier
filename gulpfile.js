var gulp         = require('gulp'),
		sass         = require('gulp-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		minifycss    = require('gulp-minify-css'),
		rename       = require('gulp-rename'),
		browserSync  = require('browser-sync').create(),
		pug         = require('gulp-pug'),
		concat       = require('gulp-concat'),
		uglify       = require('gulp-uglifyjs');

gulp.task('browser-sync', function() {
	browserSync.init({
			server: {
				baseDir: "./app"
			},
			notify: false
	});
		
});



gulp.task('styles', function () {
	return gulp.src('sass/**/*.sass')
	.pipe(sass({
		includePaths: require('node-bourbon').includePaths
	}).on('error', sass.logError))
	// .pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
	// .pipe(minifycss())
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream());
});

gulp.task('pug', function() {
	return gulp.src('pug/**/!(_)*.pug')
	.pipe(pug({
		pretty: true
	}))
	.pipe(gulp.dest('app'))
	// .pipe(browserSync.stream());
});

gulp.task('code', function(){
	return gulp.src('app/*.html')
	.pipe(browserSync.reload({stream: true}))
})

gulp.task('scripts', function() {
	return gulp.src([
		'app/**/modernizr/modernizr.js',
		'app/**/jquery/jquery.min.js',
		'app/**/pace/pace.min.js',
		'app/**/slick/slick.min.js',
		'app/**/matchHeight/jquery.matchHeight-min.js',
		'app/**/jquery.directional-hover/jquery.directional-hover.min.js',
		'app/**/waypoints/waypoints.min.js',
		'app/**/animnum/animnum.js',
		'app/**/magnific-popup/jquery.magnific-popup.min.js',
		'app/**/animate/animate-css.js',
		// './app/libs/smoothscroll/smoothscroll.min.js',
		'app/**/parallax/parallax.min.js',
		'app/**/imagesloaded/imagesloaded.pkgd.min.js',
		'app/**/isotope/isotope.pkgd.min.js',
		'app/**/textillate/jquery.fittext.js',
		'app/**/textillate/jquery.lettering.js',
		'app/**/textillate/jquery.textillate.js',
		'app/**/superfish-master/js/superfish.min.js',
		'app/**/selectize/dist/js/standalone/selectize.js',
		'app/**/ytp-player/jquery.mb.YTPlayer.min.js',
		'app/**/jquery-ui-1.12.1.custom/jquery-ui.min.js',
		'app/**/countdown/jquery.countdown.min.js',
		'app/**/googlemaps/gmap3.min.js',
		'app/**/canvas-bg/particles.min.js',
		'app/**/canvas-bg/demo-2.js'
		])
		.pipe(concat('libs.js'))
		.pipe(uglify()) //Minify libs.js
		.pipe(gulp.dest('app/js/'));
});


gulp.task('watch', function () {
	gulp.watch('sass/**/**/*.sass', gulp.parallel('styles'));
	gulp.watch('pug/**', gulp.parallel('pug'));  
	gulp.watch('app/libs/**/*.js', gulp.parallel('scripts'));
	gulp.watch('app/js/*.js', gulp.parallel('code'));
	gulp.watch('app/*.html', gulp.parallel('code'));
});
gulp.task('default',gulp.parallel('watch','styles','pug','scripts','browser-sync'));
