const path = require('path');

module.exports = {
  entry: './src/app.js',
  watch: process.env.WATCH_SERVER ? true : false,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  node: {
    // Allow __dirname to follow nnormal Node.js behavior rather than be fixed to "/"
    // https://webpack.js.org/configuration/node/#node-__dirname
    __dirname: false,
  },
  target: 'node',
  output: {
    filename: 'app.js',
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, 'dist'),
  },
}
