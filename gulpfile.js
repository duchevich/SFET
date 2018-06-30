/*
--- SFET Gulpfile
 */

var gulp = require('gulp'),
    fs = require('fs'),
    trigger = require('gulp-if'),
    uglify = require('gulp-uglifyjs'),
    sourcemaps = require('gulp-sourcemaps'),
    less = require('gulp-less'),
    inject = require('gulp-inject-string'),
    strip = require('gulp-strip-css-comments'),
    concat = require('gulp-concat'),
    autoPrefixer = require('gulp-autoprefixer'),
    csso = require('gulp-csso'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync').create(),
    del = require('del'),

    _config = require('./config'),
    _declaration = require('./declaration'),

    s_scripts, s_styles,
    parseSources = function () {
        s_scripts = [_config.sources.path + '/variables.js']; s_styles = [];
        var s_list = [];

        // Consistently parsing the blocks and forming a paths.
        for (var s = 0; s < _declaration.length; s++) {
            var s_path = _config.sources.path +  '/' + _declaration[s].n + '/';

            // Forming a simple list of the source for subsequent verifications.
            s_list.push(_declaration[s].n);

            // Checking source vendors.
            var vendors = _declaration[s].v;
            if (vendors !== undefined) {
                for (var v = 0; v < vendors.length; v++) {
                    var v_path_script =  s_path + 'vendors/' + vendors[v] + '.js',
                        v_path_style = s_path + 'vendors/' + vendors[v] + '.less',
                        v_path_script_check = fs.existsSync(v_path_script),
                        v_path_style_check = fs.existsSync(v_path_style);
                    if (v_path_script_check === true || v_path_style_check === true) {
                        if (v_path_script_check === true) s_scripts.push(v_path_script);
                        if (v_path_style_check === true) s_styles.push(v_path_style);
                    } else {
                        console.error('Warning! Сould not be found vendor "' + vendors[v] + '" file(s) for source "' + _declaration[s].n + '"!')
                    }
                }
            }

            // Checking the availability of sources files.
            var s_path_script =  s_path + _declaration[s].n + '.js',
                s_path_style = s_path + _declaration[s].n + '.less';
            if (fs.existsSync(s_path_script) === true || fs.existsSync(s_path_style) === true) {
                if (fs.existsSync(s_path_script) === true) s_scripts.push(s_path_script);
                if (fs.existsSync(s_path_style) === true) s_styles.push(s_path_style);
            } else {
                console.error('Warning! Сould not be found source "' + _declaration[s].n + '" file(s)!')
            }
        }

        // Checking for re-include of blocks.
        var s_dub = [];
        s_dub = s_list.filter(function (d) {
            return s_dub[d] || !(s_dub[d] = !0)
        });
        if (s_dub.length !== 0)
            console.error('Warning! Duplicates of the following source(s) are found: "' + s_dub + '"!');
    },

    compileScripts = function () {
        gulp.src(s_scripts)
            .pipe(uglify(_config.build.scripts.name + '.js', {
                outSourceMap: _config.build.sourceMaps,
                mangle: {
                    except: _config.build.scripts.mangleExcept
                }
            })).on('error', function () {})
            .pipe(gulp.dest(_config.build.path))
    },

    compileStyles = function () {
        gulp.src(s_styles)
            .pipe(inject.prepend(
                '@import "' + _config.sources.path + '/variables.less";'
            ))
            .pipe(strip({
                preserve: false
            }))
            .pipe(trigger(_config.build.sourceMaps, sourcemaps.init()))
            .pipe(less())
            .pipe(autoPrefixer({
                browsers: _config.build.styles.autoPrefixer,
                cascade: false
            }))
            .pipe(concat(_config.build.styles.name + '.css'))
            .pipe(csso({
                restructure: !_config.build.sourceMaps
            }))
            .pipe(trigger(_config.build.sourceMaps, sourcemaps.write()))
            .pipe(gulp.dest(_config.build.path))
    };


gulp.task('default', function () {
    browserSync.init({
        proxy: _config.watch.proxy,
        port: _config.watch.port,
        ghostMode: false,
        open: false
    });

    gulp.watch(_config.sources.path + '/**/*.js', ['scripts']);
    gulp.watch(_config.sources.path + '/**/*.less', ['styles']);

    gulp.watch([
        _config.build.path + '/' + _config.build.scripts.name + '.js',
        _config.build.path + '/' + _config.build.styles.name + '.css',
        _config.build.watch.tpl
    ], browserSync.reload);
});

gulp.task('build', function () {
    parseSources();
    compileScripts();
    compileStyles()
});

gulp.task('scripts', function () {
    parseSources();
    compileScripts()
});

gulp.task('styles', function () {
    parseSources();
    compileStyles()
});

gulp.task('del', function (callback) { // Delete all build files.
    del([
        _config.build.path + '/*' + _config.build.scripts.name + '.js',
        _config.build.path + '/*' + _config.build.scripts.name + '.js.map',
        _config.build.path + '/*' + _config.build.styles.name + '.css'
    ], {force: true}, callback)
});