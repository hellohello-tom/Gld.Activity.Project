var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: { /*webTempate: './src/main.js', */ doc: './src/doc.js' },
  output: {
    path: path.join(__dirname, './dist/scripts/bundle/'),
    filename: '[name].bundle.js',
    publicPath: '/dist/htmls/'
  },
  module: {
    loaders: [{
        test: /\.jsx?$/,
        loader: 'babel',
        include: [path.resolve('./src')],
        exclude: /(node_modules|bower_components)/,
        query: {
          presets: ['es2015']
        }
      }, {
        test: /.vue$/,
        loader: 'vue'
      }

      // {
      //shimming，用于不符合规范的模块（如一些直接返回全局变更的插件）进行shimi处理
      //这时用exports-loader
      //用法   require('./dist.../swiper.s')
      // test:require.resolve('./dist/scripts/lib/swiper3/swiper-3.3.1.min.js'),loaders:'exports?swiper'
      // }
      // { test: /\.less$/, loader: 'style!css!less' }, // use ! to chain loaders
      // { test:/\.s[ac]ss$/,loaders:['style','css','sass']},
      // { test: /\.css$/, loader: 'style!css' },
      // { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' } // inline base64 URLs for <=8k images, direct URLs for the rest
    ]
  },
  vue: {
    loaders: {
      css: 'style!css!less'
    }
  },
  // babel:{
  //   presets:['es2015'],
  //   plugins:['transform-runtime']
  // },
  resolve: {
    root: path.resolve('./src/scripts/module'),
    extensions: ['', '.vue', '.js'],
    alias: {
      spin: path.join(__dirname, './dist/scripts/lib/spin.min.js'),
      dialog: path.join(__dirname, './dist/scripts/lib/artdialog/dist/dialog-plus-min.js'),
      pagination: path.join(__dirname, './dist/scripts/lib/jquery.twbsPagination.min.js')
        // jquery:path.join(__dirname,'./dist/scripts/lib/jquery-1.11.3.js')
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      // $:'jquery',
      getTarget: path.join(__dirname, './src/scripts/module/getTarget.js'),
      getType: path.join(__dirname, './src/scripts/module/getType.js'),
      typeOf: path.join(__dirname, './src/scripts/module/typeOf.js'),
      merge: path.resolve('./src/scripts/module/mergeObject.js'),
      spinZ: path.resolve('./src/scripts/module/spinZ.js'),
      loading: path.resolve('./src/scripts/module/loading.js'),
      dialog: 'dialog'
    })
  ],
  // watch: true,
  externals: {
    //外部引入2，页面中需要预先引入相关库
    jquery: 'jQuery', //此时外部引入
    $: 'jQuery'
  }
};
