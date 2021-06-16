const path = require('path')

const postCSSPlugins = [
    require('postcss-import'),
    require('postcss-mixins'),
    require('postcss-simple-vars'),
    require('postcss-nested'),
    require('postcss-hexrgba'),
    require('autoprefixer') //adds vendor prefixes
]

module.exports = {
    entry: './app/assets/scripts/App.js',
    output: {
        filename: 'bundled.js',
        path: path.resolve(__dirname, 'app')
    },
    devServer: {
      before(app, server) {
        server._watch('./app/**/*.html')
      }, //auto reload if there is a change in the html file
      contentBase: path.join(__dirname, 'app'),
      hot: true, //allows css and js to be injected without refresh of browser
      port: 3000,
      host: '0.0.0.0'
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.css$/i, //only if the file name ends in .css
                use: ['style-loader'/*applies the css in the browser*/, 'css-loader?url=false'/*allows webpack to bundle css files*/, {
                loader: 'postcss-loader', options: {postcssOptions: {plugins: postCSSPlugins}}
            }]
            }
        ]
    }
}