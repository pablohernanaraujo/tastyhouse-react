/* Ingresamos dependecias */
const gulp        = require('gulp'),
	  jade        = require('gulp-jade'),
	  stylus      = require('gulp-stylus'),
	  notify      = require("gulp-notify"),
	  nib         = require('nib'),
	  browserSync = require('browser-sync')
		webpack    = require("webpack-stream");

const reload = browserSync.reload;

function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: "Compile Error",
    message: "<%= error.message %>"
  }).apply(this, args);
  this.emit('end');
}

gulp.task('html', () => {
	return gulp.src('public/jade/*.jade')
		.pipe(jade({pretty: false}))
		.on('error', handleErrors)
		.pipe(gulp.dest('build/'))
		.pipe(reload({stream: true}));
});

gulp.task('css', () => {
	return gulp.src('public/stylus/styles.styl')
		.pipe(stylus({ use: nib(), compress: true }))
		.on('error', handleErrors)
		.pipe(gulp.dest('build/css/'))
		.pipe(reload({stream: true}));
});

gulp.task('js', () => {
	return gulp.src('src/index.js')
		.pipe(webpack({
			entry: './src/index.js',
		  output: {
		    path: __dirname + '/build/js',
		    filename: 'index.js',
		  },
			module:{
		    loaders:[
		      {
		        test: /\.js$/,
		        exclude: /node_modules/,
		        loader: 'babel-loader',
		        query:{
		          presets: ['es2015' ,'stage-0', 'react'],
		          plugins: ['transform-runtime']
		        }
		      }
		    ]
		  }
		}))
		.on('error', handleErrors)
		.pipe(gulp.dest('build/js/'))
		.pipe(reload({stream: true}));
});

/* SERVER */

gulp.task('browserSync', () => {
	browserSync({
		server: {
			baseDir: 'build'
		}
	});
});

/* WATCHES */

gulp.task('watch', () => {
	gulp.watch('public/jade/*.jade',['html']);
	gulp.watch('public/stylus/*.styl',['css']);
  gulp.watch('src/**/**/**/*.js',['js']);
});

gulp.task('default', ['js','html','css','browserSync','watch']);
