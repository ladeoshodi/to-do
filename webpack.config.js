const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/scripts/index.js',
    devServer: {
        static: './dist',
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
};