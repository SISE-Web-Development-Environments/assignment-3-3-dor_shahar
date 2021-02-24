module.exports = {
  publicPath: '/project name/',
  configureWebpack: {
    devtool: "source-map"
  },
  devServer: {
    host: "localhost"
  }
  // publicPath: process.env.NODE_ENV === "production" ? "/LAB12/" : "/"
};
