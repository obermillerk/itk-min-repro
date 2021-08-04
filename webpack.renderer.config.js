const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

plugins.push(
  new CopyWebpackPlugin({
      patterns: [
          {
              from: path.join(__dirname, 'node_modules', 'itk', 'WebWorkers'),
              to: 'itk/WebWorkers'
          },
          {
              from: path.join(__dirname, 'node_modules', 'itk', 'ImageIOs'),
              to: 'itk/ImageIOs'
          },
      ]
  })
)

module.exports = {
  module: {
    rules,
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
    alias: {
      './itkConfig$': path.resolve(__dirname, 'itkConfig.js'),
    }
  },
};
