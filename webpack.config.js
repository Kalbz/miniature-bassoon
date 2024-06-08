const Dotenv = require('dotenv-webpack');

module.exports = {
  plugins: [
    new Dotenv({
      path: './src/environments/.env', // Path to .env file
    })
  ]
};
