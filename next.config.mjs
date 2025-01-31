/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*.googleusercontent.com',
                pathname: '/**',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                pathname: '/**',
            },
        ],
        unoptimized: true
    },
    webpack: (config, { isServer }) => {
        // 启用生产环境压缩优化
        if (!isServer) {
            config.optimization = {
                ...config.optimization,
                splitChunks: {
                    chunks: 'all',
                    minSize: 20000,
                    maxSize: 24000000, // 24MB，略小于 25MB 限制
                    cacheGroups: {
                        vendor: {
                            test: /[\\]node_modules[\\]/,
                            name: 'vendors',
                            chunks: 'all',
                        },
                    },
                },
            };
        }
        return config;
    },
};

export default nextConfig;
