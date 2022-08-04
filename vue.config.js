// const path = require('path');
// const PrerenderSPAPlugin = require('prerender-spa-plugin');
// const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;

// const productionPlugins = new PrerenderSPAPlugin({
//   staticDir: path.join(__dirname, 'dist'),
//   routes: ['/', '/group', '/group/manage', '/group/suggest', '/group/discover', '/group/detail'],
//   postProcess: route => {
//     // Defer scripts and tell Vue it's been server rendered to trigger hydration
//     route.html = route.html
//       .replace(/<script (.*?)>/g, '<script $1 defer>')
//       .replace('id="app"', 'id="app" data-server-rendered="true"');
//     return route;
//   },
//   renderer: new Renderer({
//     maxConcurrentRoutes: 1,
//     headless: true,
//     // We need to inject a value so we're able to
//     // detect if the page is currently pre-rendered.
//     inject: {},
//     // Our view component is rendered after the API
//     // request has fetched all the necessary data,
//     // so we create a snapshot of the page after the
//     // `data-view` attribute exists in the DOM.
//     renderAfterElementExists: '[data-view]'
//   }),
// });

// https://element-plus.org/en-US/guide/quickstart.html#on-demand-import
const AutoImport = require('unplugin-auto-import/webpack');
const Components = require('unplugin-vue-components/webpack');
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/',
  transpileDependencies: ['vue-meta'],
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/styles/_variables.scss";'
      }
    }
  },
  configureWebpack: {
    devtool: 'source-map',
    plugins: [
      // https://element-plus.org/en-US/guide/quickstart.html#on-demand-import
      AutoImport({
        imports: ['vue'],
        resolvers: [ElementPlusResolver({ importStyle: false })],
        dts: 'auto-imports.d.ts',
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = process.env.VUE_APP_TITLE;
        return args;
      });
    // if (process.env.NODE_ENV === 'production') {
    //   config
    //     .plugin('prerender-spa-plugin')
    //     .use(productionPlugins);
    // }
  }
};