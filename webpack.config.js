var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './src/Components/app.js',
    output: {path: __dirname + '/src',filename: 'bundle.js'},
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015','react']
                }
            },
            {
                test: /.css$/,
                loader: 'css-loader'
               
                
            }
        ]
    }
}