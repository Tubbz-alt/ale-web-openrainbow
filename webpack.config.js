const path = require('path');

let mode = 'development';
let outputPath = path.resolve(__dirname, 'public', 'js');

if(process.env.NODE_ENV == 'production') {
    mode = 'production';
    outputPath = path.resolve(__dirname, 'dist')
}

module.exports = {
    entry: './src/index.ts',
    mode,
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }/*,
            {
                test: /.js/,
                use: [
                  {
                    loader: `expose-loader`
                  }
                ]
              }*/
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'bundle.js',
        path: outputPath
    }
};