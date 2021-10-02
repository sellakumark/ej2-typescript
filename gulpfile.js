var gulp = require('gulp');
var webpack = require('webpack');
var webpackStream = require('webpack-stream');
var protractor = require('gulp-protractor').protractor;
var webDriverStandalone = require('gulp-protractor').webdriver_standalone;
var webDriverUpdate = require('gulp-protractor').webdriver_update_specific;

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
    gulp.src(['./src/index.ts'])
        .pipe(webpackStream({ config: require('./webpack.config.js') }, webpack))
        .pipe(gulp.dest('./'))
        .on('end', function () { done(); });
});

gulp.task('e2e-serve', webDriverStandalone);

gulp.task('e2e-webdriver-update', webDriverUpdate({ webdriverManagerArgs: ['--ie', '--edge'] }));

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
        gulp.src(['./spec/**/*.spec.js'])
            .pipe(protractor({ configFile: 'e2e/protractor.conf.js' }))
            .on('error', function () {
                done();
                process.exit(1);
            })
            .on('end', function () { done(); });
    });
});