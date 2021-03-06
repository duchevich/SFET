/*
--- SFET Config
 */

module.exports = {
    watch: {
        /*  Take to false a "proxy" option if do not need to proxy to
            a local server (eg, you use usual html as templates). */
        proxy: 'http://127.0.0.1:8000',
        port: 3010,
        tpl: 'blank/**/*.php'
    },
    components: {
        path: 'components'
    },
    build: {
        sourceMaps: true, // Warning! Disable source mapping for the production!
        path: 'blank/static',
        scripts: {
            name: 'common.min',
            mangleExcept: ['$', 'jQuery'] // Array of not-distorting global variables.
        },
        styles: {
            name: 'common.min',
            autoPrefixer: ['> 1%', 'last 2 versions']
        }
    }
};