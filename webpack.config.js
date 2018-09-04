const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'game.bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
            }
        }]
    },
    resolve: {
        alias: {
            class: path.resolve(__dirname, 'src/class/')
        }
    },
    plugins: [
        new CopyWebpackPlugin([{
                from: './src/index.html',
                to: './'
            },
            {
                from: './assets/**',
                to: './',
                context: './src'
            }
        ], {})
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 8080,
        hot: false,
        inline:false
    }
};