# Cmra

A commander line for create my own React app base on [create-react-app](https://github.com/facebook/create-react-app).

- Add `.eslintrc`;
- Add `.prettierrc.js`;
- Add commit lint;
- Add template select;

## Creating an App

**You’ll need to have Node 10.16.0 or later version on your local development machine**(but it’s not required on the server). You can use [nvm](https://github.com/creationix/nvm#installation) (macOS/Linux) or [nvm-windows](https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows) to switch Node versions between different projects.


### npx

```sh
npx cmra my-app
```

_([npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) is a package runner tool that comes with npm 5.2+ and higher, see [instructions for older npm versions](https://gist.github.com/gaearon/4064d3c23a77c74a3614c498a8bb1c5f))_

### npm

```sh
npm init cmra my-app
```

_`npm init <initializer>` is available in npm 6+_

### Yarn

```sh
yarn create cmra my-app
```

_[`yarn create <starter-kit-package>`](https://yarnpkg.com/lang/en/docs/cli/create/) is available in Yarn 0.25+_

It will create a directory called `my-app` inside the current folder.<br>
Inside that directory, it will generate the initial project structure and install the transitive dependencies:




```sh
cd my-app
```

Inside the newly created project, you can run some built-in commands:

### `npm start` or `yarn start`



## License

Cmra is open source software [licensed as MIT](https://github.com/facebook/create-react-app/blob/master/LICENSE).
