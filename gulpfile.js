var gulp = require('gulp');
var sass = require('gulp-sass');
//var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var sassdoc = require('sassdoc');


var input = './dev/stylesheets/sass/**/*.scss';
var output = './resources/css';
var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

gulp.task('sass', function(){
	return gulp
	.src(input)
	/*.pipe(sourcemaps.init())*/
	.pipe(sass(sassOptions)).on('error', sass.logError)
	/*.pipe(sourcemaps.write('./dev/stylesheets/maps'))*/
	.pipe(autoprefixer(autoprefixerOptions))
	.pipe(gulp.dest(output))
	.pipe(sassdoc())
	.resume();
});

var sassdocOptions = {
  dest: './docs/sassdoc'
};

gulp.task('sassdoc', function () {
  return gulp.src(input)
    .pipe(sassdoc(sassdocOptions))
    .resume();
});

gulp.task('watch', function() {
  return gulp
    // Watch the input folder for change,
    // and run `sass` task when something happens
    .watch(input, ['sass'])
    // When there is a change,
    // log a message in the console
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

gulp.task('default', ['sass', 'watch' /*, possible other tasks*/]);

gulp.task('prod', ['sassdoc'], function () {
  return gulp
    .src(input)
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest(output));
});