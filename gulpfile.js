'use strict';

var gulp = require('gulp');

/**
 * Load the sample in src/app/index
 */
gulp.task('start', ['compile'], function (done) {
    var browserSync = require('browser-sync');
    var bs = browserSync.create('Essential JS 2');
    var options = {
        port: 3000,
        server: {
            baseDir: ['./src', './']
        },
        ui: false
    };
    bs.init(options, done);

    /**
     * Watching typescript file changes
     */
    gulp.watch(['./src/**/*.ts'], ['compile', bs.reload]);
});

/** 
 * Compile TypeScript to JS
 */
gulp.task('compile', function (done) {
    var webpack = require('webpack');
    var webpackStream = require('webpack-stream');
    var tsConfig = {
        entry: {
            'src/index': './src/index.ts'
        },
        output: {
            filename: '[name].js'
        },
        module: {
            rules: [{
                loader: 'ts-loader',
                exclude: /node_modules/,
            }]
        },
        resolve: {
            extensions: [".ts", ".js"]
        }
    };
    gulp.src(['./src/**/*.ts']).pipe(webpackStream({
            config: tsConfig
        }, webpack))
        .pipe(gulp.dest('./'))
        .on('end', function () {
            done();
        });
});