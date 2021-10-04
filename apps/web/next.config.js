// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');

// const withLess = require('@zeit/next-less');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  // Set this to true if you use CSS modules.
  // See: https://github.com/css-modules/css-modules
  cssModules: false,
  // @zeit/next-less does not support webpack 5
  // webpack5: false,
};

module.exports =
  // withLess(
  withNx(nextConfig);
// );
