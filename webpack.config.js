var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    path: __dirname + '/build/js',
    filename: 'index.js',
  },
  module:{
    loaders:[
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query:{
          presets: ['es2015' ,'stage-0', 'react'],
          plugins: ['transform-runtime']
        }
      }
    ]
  },
  node: {
    fs: 'empty',
    crypto: 'empty'
  },
  externals: {
    'libsodium-native': 'libsodium_native'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {warnings: false},
      output: {comments: false},
      sourceMap: true
    })
  ]
};
