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

    c_scripts, c_styles,
    parseComponents = function () {
        c_scripts = ['./variables.js']; c_styles = [];
        var c_list = [];

        // Consistently parsing the blocks and forming a paths.
        for (var s = 0; s < _declaration.length; s++) {
            var c_path = _config.components.path +  '/' + _declaration[s].n + '/';

            // Forming a simple list of the component for subsequent verifications.
            c_list.push(_declaration[s].n);

            // Checking component vendors.
            var vendors = _declaration[s].v;
            if (vendors !== undefined) {
                for (var v = 0; v < vendors.length; v++) {
                    var v_path_script =  c_path + 'vendors/' + vendors[v] + '.js',
                        v_path_style = c_path + 'vendors/' + vendors[v] + '.less',
                        v_path_script_check = fs.existsSync(v_path_script),
                        v_path_style_check = fs.existsSync(v_path_style);
                    if (v_path_script_check === true || v_path_style_check === true) {
                        if (v_path_script_check === true) c_scripts.push(v_path_script);
                        if (v_path_style_check === true) c_styles.push(v_path_style);
                    } else {
                        console.error('Warning! Сould not be found vendor "' + vendors[v] + '" file(s) for component "' + _declaration[s].n + '"!')
                    }
                }
            }

            // Checking the availability of components files.
            var c_path_script =  c_path + _declaration[s].n + '.js',
                c_path_style = c_path + _declaration[s].n + '.less';
            if (fs.existsSync(c_path_script) === true || fs.existsSync(c_path_style) === true) {
                if (fs.existsSync(c_path_script) === true) c_scripts.push(c_path_script);
                if (fs.existsSync(c_path_style) === true) c_styles.push(c_path_style);
            } else {
                console.error('Warning! Сould not be found components "' + _declaration[s].n + '" file(s)!')
            }
        }

        // Checking for re-include of blocks.
        var c_dub = [];
        c_dub = c_list.filter(function (d) {
            return c_dub[d] || !(c_dub[d] = !0)
        });
        if (c_dub.length !== 0)
            console.error('Warning! Duplicates of the following component(s) are found: "' + c_dub + '"!');
    },

    compileScripts = function () {
        gulp.src(c_scripts)
            .pipe(uglify(_config.build.scripts.name + '.js', {
                outSourceMap: _config.build.sourceMaps,
                mangle: {
                    except: _config.build.scripts.mangleExcept
                }
            })).on('error', function () {})
            .pipe(gulp.dest(_config.build.path))
    },

    compileStyles = function () {
        gulp.src(c_styles)
            .pipe(inject.prepend(
                '@import "./variables.less";'
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
    },

    delBuild = function (callback) {
        del([
            _config.build.path + '/*' + _config.build.scripts.name + '.js',
            _config.build.path + '/*' + _config.build.scripts.name + '.js.map',
            _config.build.path + '/*' + _config.build.styles.name + '.css'
        ], {force: true}, callback)
    };


gulp.task('default', function () {
    browserSync.init({
        proxy: _config.watch.proxy,
        port: _config.watch.port,
        ghostMode: false,
        open: false
    });

    gulp.watch(_config.components.path + '/**/*.js', ['scripts']);
    gulp.watch(_config.components.path + '/**/*.less', ['styles']);

    gulp.watch([
        _config.build.path + '/' + _config.build.scripts.name + '.js',
        _config.build.path + '/' + _config.build.styles.name + '.css',
        _config.build.watch.tpl
    ], browserSync.reload);
});

gulp.task('build', function () {
    parseComponents();
    delBuild();
    compileScripts();
    compileStyles()
});

gulp.task('scripts', function () {
    parseComponents();
    compileScripts()
});

gulp.task('styles', function () {
    parseComponents();
    compileStyles()
});

gulp.task('del', function (callback) {
    delBuild(callback)
});