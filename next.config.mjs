/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve = {
                ...config.resolve,
                fallback: {
                    fs: false,
                    net: false,
                    tls: false,
                    dns: false,
                    module: false
                }
            }
        }
        return config;
    },
};

export default nextConfig;