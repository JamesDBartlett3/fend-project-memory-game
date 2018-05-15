var gulp = require('gulp');
var exec = require('gulp-exec');

gulp.task('default', function() {
  console.log('Running default gulp function...')
});

gulp.task('deploy', function() {
	console.log('Copying files from dev to dist...');
	exec('cp dev/index.html dist/index.html');
	exec('cp dev/css/_styles.css dist/css/styles.css');
	exec('cp dev/js/_app.js dist/js/app.js');
	exec('cp -R dev/img dist/img');
  console.log('Files copied! Dist is now live!');
});
