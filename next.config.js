/**
 * @type {import('next').NextConfig}
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

const nextConfig = {
    reactStrictMode: true,

    webpack: (config) => {
        config.resolve.alias['~'] = path.resolve(__dirname, 'src');

        return config;
    },
};

module.exports = nextConfig;
