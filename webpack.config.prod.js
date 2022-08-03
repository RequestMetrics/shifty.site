
let config = require(`${__dirname}/webpack.config.js`);

module.exports =  {
  ...config,

  mode: "production",

  output: {
    path: `${__dirname}/public`,
    filename: "[name].bundle.js"
  }

};