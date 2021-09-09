var gulp = require('gulp');

gulp.task('start', ['compile'], function (done) {
    var browserSync = require('browser-sync');
    var bs = browserSync.create('Essential JS 2');
    var options = {
        server: {
            baseDir: [
                './src/',
                './node_modules/@syncfusion/ej2/'
            ]
        },
        ui: false,
        port: 9876
    };
    bs.init(options, done);
    gulp.watch('./src/index.ts', ['compile', bs.reload]);
});

gulp.task('compile', function (done) {
    var webpack = require('webpack');
    var webpackStream = require('webpack-stream');
    gulp.src(['./src/index.ts']).pipe(webpackStream({ config: require('./webpack.config.js') }, webpack))
        .pipe(gulp.dest('./')).on('end', function () { done(); });
});

var protractor = require('gulp-protractor').protractor;
var webdriver_standalone = require('gulp-protractor').webdriver_standalone;
var webdriver_update = require('gulp-protractor').webdriver_update_specific;

gulp.task('e2e-serve', webdriver_standalone);

gulp.task('e2e-webdriver-update', webdriver_update({ webdriverManagerArgs: ['--ie', '--edge'] }));

gulp.task('e2e-test', ['compile'], function (done) {
    var browserSync = require('browser-sync');
    var bs = browserSync.create('Essential JS 2');
    var options = {
        server: {
            baseDir: [
                './src/',
                './node_modules/@syncfusion/ej2/'
            ],
            directory: true
        },
        ui: false,
        open: false,
        notify: false
    };
    bs.init(options, function () {
        gulp.src(['./spec/**/*.spec.js']).pipe(protractor({ configFile: 'e2e/protractor.conf.js' }))
            .on('error', function (e) {
                done();
                process.exit(1);
            })
            .on('end', function () {
                done();
                process.exit(0);
            });
    });
});