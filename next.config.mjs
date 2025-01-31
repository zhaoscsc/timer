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
        if (!isServer) {
            config.optimization = {
                ...config.optimization,
                minimize: true,
                minimizer: [
                    '...', // 保留默认的压缩器
                ],
                splitChunks: {
                    chunks: 'all',
                    minSize: 5000, // 进一步减小最小块大小
                    maxSize: 12000000, // 减小到 12MB
                    cacheGroups: {
                        vendor: {
                            test: /[\\]node_modules[\\]/,
                            name: 'vendors',
                            chunks: 'all',
                            priority: 10,
                            enforce: true,
                            maxSize: 8000000, // 减小到 8MB
                            reuseExistingChunk: true
                        },
                        commons: {
                            name: 'commons',
                            minChunks: 2,
                            priority: -10,
                            reuseExistingChunk: true,
                            enforce: true,
                            maxSize: 5000000 // 添加 commons 的最大大小限制
                        },
                        styles: {
                            name: 'styles',
                            test: /\.css$/,
                            chunks: 'all',
                            enforce: true,
                            maxSize: 2000000 // 添加样式文件的最大大小限制
                        }
                    },
                },
                moduleIds: 'deterministic',
                chunkIds: 'deterministic'
            };

            // 启用生产环境的额外优化
            config.mode = 'production';
            config.performance = {
                hints: 'warning',
                maxEntrypointSize: 500000, // 减小入口点大小限制
                maxAssetSize: 500000 // 减小资产大小限制
            };
        }
        return config;
    },
    poweredByHeader: false,
    generateEtags: true,
    compress: true,
};

export default nextConfig;
