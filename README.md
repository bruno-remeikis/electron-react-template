# Pure electron model

Reference:
[BetterProgramming](https://medium.com/better-programming/start-a-new-electron-app-with-react-and-typescript-cdd6d9997933)


## Create and configure electron project

1. Create a `package.json` file running:

```sh
npm init -y
```

2. Install the necessary dependencies:

```sh
yarn add electron webpack webpack-cli webpack-dev-server babel-loader @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript crossenv
```

3. Create a `tsconfig.json` file with:

```json
{
    "compilerOptions": {
        "target": "es5",
        "module": "commonjs",
        "lib": [
            "dom",
            "es2015",
            "es2016",
            "es2017"
        ],
        "allowJs": true,
        "jsx": "react",
        "sourceMap": true,
        "outDir": "./dist",
        "strict": true,
        "esModuleInterop": true
    }
}
```

4. Create a `babel.config.js` file with:

```js
module.exports = {
    presets: [
        '@babel/preset-env',
        '@babel/preset-react',
        '@babel/preset-typescript'
    ]
}
```

5. Create an `index.html` file with:

```html
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Electron App</title>
</head>
<body>
</body>
</html>
```

6. Create a `webpack.electron.config.js` file with:

```js
const path = require('path');

module.exports = {
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    devtool: 'source-map',
    entry: './electron/main.ts',
    target: 'electron-main',
    module: {
        rules: [
            {
                test: /\.(js|ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader']
            }
        ],
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js',
    },
};
```

7. Create an `electron` directory and, inside it, create a `main.ts` file with:

```ts
import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';

let mainWindow: Electron.BrowserWindow | null;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    if (process.env.NODE_ENV === 'development') {
        mainWindow.loadURL(`http://localhost:4000`);
    } else {
        mainWindow.loadURL(
            url.format({
                pathname: path.join(__dirname, '../index.html'),
                protocol: 'file:',
                slashes: true
            })
        );
    }
    
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', createWindow);
app.allowRendererProcessReuse = true;
```

8. Change `package.json`'s "main" and "script" to:
```json
{
    "main": "./dist/main.js",
    "scripts": {
        "dev:electron": "SET NODE_ENV=development & webpack --config webpack.electron.config.js --mode development && electron ."
    },
}
```


## Run app

Run `yarn dev:electron` or `npm run dev:electron` on terminal


## Create and configure React

1. Install the necessary dependencies:

```sh
yarn add react react-dom @types/react @types/react-dom html-webpack-plugin style-loader css-loader
```

2. Create a `webpack.react.config.js` file with:

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        mainFields: ['main', 'module', 'browser'],
    },
    entry: './src/app.tsx',
    target: 'electron-renderer',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(js|ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader']
            }
        ],
    },
    devServer: {
        contentBase: path.join(__dirname, '../dist/renderer'),
        historyApiFallback: true,
        compress: true,
        hot: true,
        port: 4000,
        publicPath: '/',
    },
    output: {
        path: path.resolve(__dirname, '../dist/renderer'),
        filename: 'js/[name].js',
        publicPath: './',
    },
    plugins: [
        new HtmlWebpackPlugin(),
    ],
};
```

3. Change `package.json`, adding to "script":

```json
"scripts": {
    "dev:react": "SET NODE_ENV=development & webpack serve --config webpack.react.config.js --mode development"
},
```

4. Create an `src` directory and, inside it, create a `app.tsx` file with:
```tsx
import React from 'react';
import ReactDom from 'react-dom';

const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

const App = () => {
  return (
    <h1>
      Hi from a react app
    </h1>
  );
}

ReactDom.render(<App />, mainElement);
```

## Run full app

Run `yarn dev:react` or `npm run dev:react` in a terminal and `yarn dev:electron` or `npm run dev:electron` in another terminal