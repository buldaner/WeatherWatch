const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    output: {
        path: path.resolve(__dirname, "build"),
        publicPath: "/"
    },        
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env',
                        '@babel/preset-react'
                    ],
                    plugins: [
                        '@babel/transform-runtime'
                    ]
                }                
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ],
    },
    plugins: [new HtmlWebpackPlugin({
        hash: true,
        title: 'WeatherWatch',
        template: './public/index.html',
        filename: 'index.html'
    })]
};