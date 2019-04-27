const path = require('path');

module.exports = {
  entry: './src/app.js',
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
  target: 'node',
  output: {
    filename: 'app.js',
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, 'dist'),
  },
}
