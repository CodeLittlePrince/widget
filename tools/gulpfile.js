var gulp = require('gulp');
var through = require('through2');

// 默认任务：第一次先压缩所有的HTML，CSS，JS；随后进行监听～
gulp.task('default', function(){
	miniHTML1();
	miniHTML2();
	miniCss();
	// miniJS();

	gulp.watch(['../index.html', '../detail.html', '../css/modal.css', '../js/*.js'], function(event) {
		var path = event.path;
		if (path.indexOf('index.html') > -1) {
			miniHTML1();
		}
		if (path.indexOf('detail.html') > -1) {
			miniHTML2();
		}
		if (path.indexOf('modal.css') > -1) {
			miniCss();
		}
		
		// miniJS();
	  	console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
	});
});

// 压缩index.html
function miniHTML1() {
	gulp.src('../index.html')
		.pipe(through.obj(function(chunk, encode, callback){
			var contents = chunk.contents.toString(encode);

			var HTMLMinifier = require('html-minifier').minify;

			var minifier = HTMLMinifier(contents,{
				minifyCSS: true,
				minifyJS: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true
			});
			chunk.contents = new Buffer(minifier, encode);

			callback(null,chunk,encode);
			console.log('Task miniHTML1 finished!');
		}))
		.pipe(gulp.dest('../dest'));
}

//压缩detail.html （这里可以和miniHTML1合并成一个函数）
function miniHTML2() {
	gulp.src('../detail.html')
		.pipe(through.obj(function(chunk, encode, callback){
			var contents = chunk.contents.toString(encode);

			var HTMLMinifier = require('html-minifier').minify;

			var minifier = HTMLMinifier(contents,{
				minifyCSS: true,
				minifyJS: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true,
			});
			chunk.contents = new Buffer(minifier, encode);

			callback(null,chunk,encode);
			console.log('Task miniHTML2 finished!');
		}))
		.pipe(gulp.dest('../dest'));
}

// 压缩CSS
function miniCss(){
	gulp.src('../css/modal.css')
		.pipe(through.obj(function(chunk, encode, callback){
			var contents = chunk.contents.toString(encode);

			var HTMLMinifier = require('html-minifier').minify;

			var minifier = HTMLMinifier(contents,{
				minifyCSS: true,
				minifyJS: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true,
			});
			chunk.contents = new Buffer(minifier, encode);

			callback(null,chunk,encode);
			console.log('Task minifyCss finished!');
		}))
		.pipe(gulp.dest('../dest/css/'));
}

// 压缩JS
function miniJS(){
	gulp.src('../js/*.js')
		.pipe(through.obj(function(chunk, encode, callback){
			var contents = chunk.contents.toString(encode);

			var HTMLMinifier = require('html-minifier').minify;

			var minifier = HTMLMinifier(contents,{
				minifyCSS: true,
				minifyJS: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true
			});
			chunk.contents = new Buffer(minifier, encode);

			callback(null,chunk,encode);
			console.log('Task minifyJS finished!');
		}))
		.pipe(gulp.dest('../dest/js/'));
}


