const path = require('path');
const HtmlWebPackPlugin = require("./node_modules/html-webpack-plugin");
const MiniCssExtractPlugin = require("./node_modules/mini-css-extract-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx|js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        },
                // query: {
        //   cacheDirectory: true,
        //   presets: ['react', 'es2015']
        // }
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.pug$/,
        use: [
          "html-loader",
          "pug-html-loader"
        ]
      },
      {
        test: /\.sass|scss$/,
        use: [
            MiniCssExtractPlugin.loader,
            // "style-loader", // style nodes from js strings
            "css-loader",
            "sass-loader" //compiles Sass to CSS
        ],
        include: path.join(__dirname, 'src')
      },
      {
        // test: /\.(png|jpg)$/,
        test: /\.(png|jpe?g|gif)$/,
        loader: 'file-loader',
        include: path.join(__dirname, 'src')
      }
    ]
  },
  devServer: {
    // contentBase: path.join(__dirname, 'dist'),
    inline: true,
    hot: true,
    historyApiFallback: true,
  },
  resolve: {
    alias: {
      'styles': path.resolve(__dirname, 'src/assets/styles'),
      'images': path.resolve(__dirname, 'src/assets/images')
    }
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.pug",
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
};
