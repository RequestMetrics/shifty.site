var fs = require("fs");

var pkg = JSON.parse(fs.readFileSync("./package.json"));
var CopyPlugin = require("copy-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry: {
    main: `${__dirname}/source/main.ts`
  },
  output: {
    path: `${__dirname}/dist`,
    filename: "[name].bundle.js"
  },

  devServer: {
    static: {
      directory: `${__dirname}/dist`,
    },
    compress: true,
    port: 9000,
  },
  devtool: 'inline-source-map',

  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        loader: "html-loader",
        exclude: /node_modules/
      },
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader",
        exclude: /node_modules/
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader, // Puts CSS into its own file
          "css-loader",   // Translates CSS into CommonJS
          "sass-loader",  // Compiles Sass to CSS
        ],
      },
    ]
  },

  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: `${__dirname}/source/index.html`,
      filename: "index.html"
    }),
  ]
};