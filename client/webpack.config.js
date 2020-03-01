var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var Dotenv = require('dotenv-webpack')

module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js',
        publicPath: '/',
        port: 3001,
        proxy: { "/api/**": {target: 'http://localhost:3000', secure: false}}
    },
    module: {
       rules: [
           {test : /\.(js)$/, use: 'babel-loader'},
           {test : /\.css$/, use: ['style-loader', 'css-loader']}
       ] 
    },
    devServer: {
      historyApiFallback: true,
    },
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin ({
            template: 'public/index.html'
        }),
        new Dotenv()
    ],
    resolve: {
        extensions: [
            ".ts",".tsx",".js",".jsx",".json"
        ]
    }
}