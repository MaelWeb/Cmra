const { exec } = require('child_process');
const ora = require('ora');
const path = require('path');
const fs = require('fs');

function installLib(target) {
  const libs = [
    'eslint',
    'eslint-config-airbnb',
    'eslint-plugin-react',
    'eslint-plugin-prettier',
    'eslint-config-prettier',
    'babel-eslint',
    'eslint-plugin-jsx-a11y',
    'eslint-plugin-import',
    'prettier',
    'eslint-import-resolver-alias',
    'lint-staged',
    'husky',
    '@commitlint/cli',
    '@commitlint/config-conventional',
  ].join(' ');
  const spinner = ora(`Install dependencies ...\r\n`).start();
  const installProcess = exec(`yarn add ${libs} -D`, {
    cwd: path.join(process.cwd(), target),
  });

  installProcess.stdout.on('data', function (data) {
    spinner.clear();
    console.log(data);
  });

  installProcess.stderr.on('data', function (data) {
    spinner.clear();
    console.log(data);
  });

  installProcess.on('close', (code) => {
    spinner.succeed();
  });
}

function modifyPackageJson(target) {
  const spinner = ora(`Generate package.json ...\r\n`).start();
  const packageJsonPath = path.join(process.cwd(), target, './package.json');
  let packageJson = require(packageJsonPath);
  packageJson.scripts = {
    ...packageJson.scripts,
    product: 'cross-env REACT_APP_ENV=production npm run build',
    preview: 'cross-env REACT_APP_ENV=preview npm run build',
    staging: 'cross-env REACT_APP_ENV=staging npm run build',
    'lint-stage:format': 'prettier --config .prettierrc.js --write --',
    'lint-stage:lint:js': 'eslint --cache --fix --ext .js,.jsx --',
    'lint:js': 'eslint --cache --fix --ext .js,.jsx ./src',
    'format:js':
      'prettier --config .prettierrc.js --write "**/*.{js,jsx,scss,md,json,yml}"',
    format: 'npm run format:js',
    lint: 'npm run lint:js',
  };

  packageJson.husky = {
    hooks: {
      'pre-commit': 'lint-staged',
      'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
    },
  };

  packageJson['lint-staged'] = {
    '**/*.{js,jsx,tsx,ts,scss,md,json}': [
      'npm run lint-stage:format',
      'git add',
    ],
    '**/*.{js,jsx}': ['npm run lint-stage:lint:js', 'git add'],
  };
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  spinner.succeed();
}

module.exports = {
  installLib,
  modifyPackageJson,
};
