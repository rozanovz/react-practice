module.exports = {
  entry: {
    app: './src/index',
  },
  output: {
    filename: './public/[name].js'
  },
  devTools: 'source-map',
  module:{
    loaders: [
      {
        test:/\.js$/,
        loader: 'babel',
        exclude: './node-modules',
        query:{
          presets: ['react','es2015']
        }
      },
    ]
  },
}