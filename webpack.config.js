const currentTask = process.env.npm_lifecycle_event
const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const fse = require('fs-extra')

const postCSSPlugins = [
    require('postcss-import'),
    require('postcss-mixins'),
    require('postcss-simple-vars'),
    require('postcss-nested'),
    require('postcss-hexrgba'),
    require('autoprefixer') //adds vendor prefixes
]

class RunAfterCompile {
    apply(compiler) {
        compiler.hooks.done.tap('Copy images', function() {
            fse.copySync('./app/assets/images', './docs/assets/images')
        })
    }
}

let cssConfig = {
    test: /\.css$/i, //only if the file name ends in .css
    use: ['css-loader?url=false'/*allows webpack to bundle css files*/, {loader: 'postcss-loader', options: {postcssOptions: {plugins: postCSSPlugins}}}]
}

let config = {
    entry: './app/assets/scripts/App.js',
    plugins: [new HtmlWebpackPlugin({filename: 'index.html', template: './app/index.html'})], 
    module: {
        rules: [cssConfig]
    }
}

if (currentTask == 'dev') {
    cssConfig.use.unshift('style-loader')
    config.output = {
        filename: 'bundled.js',
        path: path.resolve(__dirname, 'app')
    }
    config.devServer = {
        before(app, server) {
          server._watch('./app/**/*.html')
        }, //auto reload if there is a change in the html file
        contentBase: path.join(__dirname, 'app'),
        hot: true, //allows css and js to be injected without refresh of browser
        port: 3000,
        host: '0.0.0.0'
      }
    config.mode = 'development'
}

if (currentTask == 'build') {
    config.module.rules.push({
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env']
            }
        }
    })
    
    cssConfig.use.unshift(MiniCssExtractPlugin.loader)
    config.output = {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'docs')
    }
    config.mode = 'production'
    config.optimization = {
        splitChunks: { chunks: 'all', minSize: 1000},
        minimize: true,
        minimizer: [`...`, new CssMinimizerPlugin()]
    }
    config.plugins.push(
        new CleanWebpackPlugin(), 
        new MiniCssExtractPlugin({filename: 'styles.[chunkhash].css'}),
        new RunAfterCompile()
    )
}

module.exports = config

