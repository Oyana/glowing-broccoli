'use strict';

let gulp =			require("gulp");
let concat =		require("gulp-concat");
let plumber =		require("gulp-plumber");
let babel =			require('gulp-babel');
let uglify =		require("gulp-uglify");
let rename =		require("gulp-rename");
let sass =			require('gulp-sass');
let htmlmin =		require('gulp-htmlmin');

const resourcePath = "./resources/";
const publicPath = "./public/";

gulp.task('default', ['script-concat', 'watch']);

gulp.task('script-concat', function(){
	const jsfiles = [
		resourcePath + 'js/_function.js',
		resourcePath + 'js/_animatedLoading.js',
		resourcePath + 'js/_ga.js',
		resourcePath + 'js/app.js',
	];
	gulp.src(jsfiles)
		.pipe( babel( {
			presets: ['env']
		} ) )
		.pipe( plumber() )
		.pipe( concat('main.min.js') )
		.pipe( uglify() )
		.pipe( gulp.dest( publicPath + 'js' ) );
});

gulp.task('html-concat', function(){
	const htmlfiles = [
		resourcePath + 'html/head.inc.html',
		resourcePath + 'html/header.inc.html',
		resourcePath + 'html/homme.inc.html',
		resourcePath + 'html/map.inc.html',
		resourcePath + 'html/footer.inc.html',
		resourcePath + 'html/foot.inc.html',
	];
	gulp.src( htmlfiles )
		.pipe( plumber() )
		.pipe( concat('index.html') )
		.pipe( htmlmin({collapseWhitespace: true}) )
		.pipe( gulp.dest("./") );
});


gulp.task('sass-concat', function () {
	return gulp.src( resourcePath + 'scss/*.scss' )
		.pipe( plumber() )
		.pipe( sass( {outputStyle: 'compressed'} ).on('error', sass.logError) )
		.pipe( gulp.dest( publicPath + './css') );
});

gulp.task('watch', function(){
	gulp.watch( resourcePath + "html/**/*.inc.html", ['html-concat'] );
	gulp.watch( resourcePath + "scss/**/*.scss", ['sass-concat'] );
	gulp.watch( resourcePath + "js/**/*.js", ['script-concat'] );
});