// webpack.config.js
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    filename: "[name].[contenthash].js",   // ✅ cache-friendly
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",                       // ✅ ensures correct asset paths
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,                   // ✅ faster build
        terserOptions: {
          compress: {
            drop_console: true,           // ✅ remove console.logs
          },
        },
      }),
      new CssMinimizerPlugin(),           // ✅ optimize CSS
    ],
    splitChunks: {
      chunks: "all",                      // ✅ code splitting (vendor, commons)
    },
    runtimeChunk: "single",               // ✅ better caching
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"], // ✅ CSS into separate file
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,             // ✅ image optimization
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024, // Inline small images (8kb)
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),             // ✅ clear dist before new build
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css", // ✅ cache-friendly CSS
    }),
  ],
};
