const {
  ENVIRONMENT,
  API_URL,
  FEEDBACK_STATIC_FILES,
  APP_STATIC_FILES,
  PUBLIC_VAPID_KEY,
} = require('config');
const withImages = require('next-images');
const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const nextConfig = withImages({
  publicRuntimeConfig: {
    ENVIRONMENT,
    API_URL,
    FEEDBACK_STATIC_FILES,
    APP_STATIC_FILES,
    PUBLIC_VAPID_KEY,
  },
  trailingSlash: true,
  webpack(cfg, options) {
    const { dev, isServer } = options;

    // Do not run type checking twice:
    if (dev && isServer) {
      cfg.plugins.push(new ForkTsCheckerWebpackPlugin());
    }

    cfg.resolve.alias = {
      ...cfg.resolve.alias,
      react: path.resolve('./node_modules/react')
    };
    return cfg;
  },
});

module.exports = nextConfig
