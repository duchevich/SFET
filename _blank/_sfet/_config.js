// --- SFET General Config

module.exports = {
    server: {
        proxy: 'http://127.0.0.1:8000', // false - if not used external local server
        port: 3013
    },
    build: {
        sourceMaps: true, // Warning! Disable source mapping for production!
        path: '../static',
        scripts: {
            name: 'scripts.min',
            mangleExcept: ['$'] // Array of not-distorting global variables
        },
        styles: {
            name: 'styles.min',
            autoPrefixer: ['> 1%', 'last 2 versions']
        },
        templates: {
            path: '../**/*.php'
        }
    }
};