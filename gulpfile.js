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

    _config = require('./_config'),
    _declaration = require('./_declaration'),

    b_scripts, b_styles,
    parseBlocks = function () {
        b_scripts = [_config.sources.path + '/_variables/_variables.js']; b_styles = [];
        var b_list = [];

        // Consistently parsing the blocks and forming a paths.
        for (var b = 0; b < _declaration.length; b++) {
            var b_path = _config.sources.path +  '/_blocks/' + _declaration[b].n + '/';

            // Forming a simple list of the blocks for subsequent verifications.
            b_list.push(_declaration[b].n);

            // Checking blocks vendors.
            var vendors = _declaration[b].v;
            if (vendors !== undefined) {
                for (var v = 0; v < vendors.length; v++) {
                    var v_path_script =  b_path + 'vendors/' + vendors[v] + '.js',
                        v_path_style = b_path + 'vendors/' + vendors[v] + '.less',
                        v_path_script_check = fs.existsSync(v_path_script),
                        v_path_style_check = fs.existsSync(v_path_style);
                    if (v_path_script_check === true || v_path_style_check === true) {
                        if (v_path_script_check === true) b_scripts.push(v_path_script);
                        if (v_path_style_check === true) b_styles.push(v_path_style);
                    } else {
                        console.error('Warning! Сould not be found vendor "' + vendors[v] + '" file(s) for block "' + _declaration[b].n + '"!')
                    }
                }
            }

            // Checking the availability of blocks files.
            var b_path_script =  b_path + _declaration[b].n + '.js',
                b_path_style = b_path + _declaration[b].n + '.less';
            if (fs.existsSync(b_path_script) === true || fs.existsSync(b_path_style) === true) {
                if (fs.existsSync(b_path_script) === true) b_scripts.push(b_path_script);
                if (fs.existsSync(b_path_style) === true) b_styles.push(b_path_style);
            } else {
                console.error('Warning! Сould not be found block "' + _declaration[b].n + '" file(s)!')
            }
        }

        // Checking for re-include of blocks.
        var b_dub = [];
        b_dub = b_list.filter(function (d) {
            return b_dub[d] || !(b_dub[d] = !0)
        });
        if (b_dub.length !== 0)
            console.error('Warning! Duplicates of the following blocks are found: "' + b_dub + '"!');
    },

    compileScripts = function () {
        gulp.src(b_scripts)
            .pipe(uglify(_config.build.scripts.name + '.js', {
                outSourceMap: _config.build.sourceMaps,
                mangle: {
                    except: _config.build.scripts.mangleExcept
                }
            })).on('error', function () {})
            .pipe(gulp.dest(_config.build.path))
    },

    compileStyles = function () {
        gulp.src(b_styles)
            .pipe(inject.prepend(
                '@import "' + _config.sources.path + '/_variables/_variables.less"; ' +
                '@import "' + _config.sources.path + '/_mixins/_mixins.less";'
            ))
            .pipe(trigger(_config.build.sourceMaps, sourcemaps.init()))
            .pipe(less())
            .pipe(autoPrefixer({
                browsers: _config.build.styles.autoPrefixer,
                cascade: false
            }))
            .pipe(concat(_config.build.styles.name + '.css'))
            .pipe(strip({
                preserve: false
            }))
            .pipe(csso({
                restructure: !_config.build.sourceMaps
            }))
            .pipe(trigger(_config.build.sourceMaps, sourcemaps.write()))
            .pipe(gulp.dest(_config.build.path))
    };


gulp.task('default', function () {
    browserSync.init({
        proxy: _config.server.proxy,
        port: _config.server.port,
        ghostMode: false,
        open: false
    });

    gulp.watch(_config.sources.path + '_blocks/**/*.js', ['scripts']);
    gulp.watch(_config.sources.path + '_blocks/**/*.less', ['styles']);

    gulp.watch([
        _config.build.path + '/' + _config.build.scripts.name + '.js',
        _config.build.path + '/' + _config.build.styles.name + '.css',
        _config.build.tpl.path
    ], browserSync.reload);
});

gulp.task('build', function () {
    parseBlocks();
    compileScripts();
    compileStyles()
});

gulp.task('scripts', function () {
    parseBlocks();
    compileScripts()
});

gulp.task('styles', function () {
    parseBlocks();
    compileStyles()
});

gulp.task('del', function (callback) { // Delete all build files.
    del([
        _config.build.path + '/*' + _config.build.scripts.name + '.js',
        _config.build.path + '/*' + _config.build.scripts.name + '.js.map',
        _config.build.path + '/*' + _config.build.styles.name + '.css'
    ], {force: true}, callback)
});