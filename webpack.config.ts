import * as path from 'path';
import { Configuration } from 'webpack';
import * as TerserPlugin from "terser-webpack-plugin";

const config: Configuration = {
  entry: './src/index.ts',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader'
        },
      },
      {
        test: /\.svg$/,
        use: {
          loader: 'svg-inline-loader?classPrefix'
        },
      }
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'index.js',
  },
  stats: {
    colors: true,
  },
};
export default config;
