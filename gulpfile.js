const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('babel', () =>
	gulp.src('js/script.js')
	.pipe(babel({
		presets: ['@babel/env']
	}))
	.pipe(gulp.dest('./'))
);


const postcss = require('postcss');
const cssvariables = require('postcss-css-variables');
const autoprefixer = require('gulp-autoprefixer');
let cleanCSS = require('gulp-clean-css');
const fs = require('fs');

gulp.task('css', () => {
	const css = fs.readFileSync('css/style.css', 'utf8');
	const output = postcss([cssvariables()])
		.process(css)
		.css;

	fs.writeFileSync('style.css', output);

	gulp.src('style.css')
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(cleanCSS({
			compatibility: 'ie8'
		}))
		.pipe(gulp.dest('./'))
});


gulp.task('watch', () => {
	gulp.watch('js/script.js', ['babel']);
	gulp.watch('css/style.css', ['css'])
});