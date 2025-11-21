const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        extensionAlias: {
            '.js': ['.js', '.ts'],
            '.mjs': ['.mjs', '.mts']
        },
        alias: {
            'orion-ecs': path.resolve(__dirname, 'orion-ecs-v2/core/dist/index.js')
        }
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist')
        },
        port: 9984,
        host: '0.0.0.0',
        hot: true,
        allowedHosts: 'all'
    }
};