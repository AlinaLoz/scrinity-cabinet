const {
  ENVIRONMENT,
  API_URL,
  STATIC_FILES,
  PUBLIC_VAPID_KEY,
} = require('config');
const withImages = require('next-images');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const nextConfig = withImages({
  publicRuntimeConfig: {
    ENVIRONMENT,
    API_URL,
    STATIC_FILES,
    PUBLIC_VAPID_KEY,
  },
  trailingSlash: true,
  webpack(cfg, options) {
    const { dev, isServer } = options;

    // Do not run type checking twice:
    if (dev && isServer) {
      cfg.plugins.push(new ForkTsCheckerWebpackPlugin());
    }

    return cfg;
  },
});

module.exports = nextConfig
