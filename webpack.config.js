const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'game.bundle.js'
    },
    plugins: [
        new CopyWebpackPlugin([
            {from:'./src/index.html',to:'./'},
            {from:'./assets/**',to:'./',context:'./src'}
        ], {})
    ]
};