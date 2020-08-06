const Utils = require('./utils');
const copyConf = require('./cp-config');
const { exec } = require('child_process');
const ora = require('ora');
const inquirer = require('inquirer');
const open = require('open');
const chalk = require('chalk');

function selectTemplate() {
  const templateMap = {
    Default: 'cra-template',
    Typescript: 'cra-template-typescript',
    Redux: 'redux',
    'Typescript + Redux': 'redux-typescript',
  };
  return inquirer
    .prompt([
      {
        type: 'list',
        name: 'template',
        message: 'Which template do you want to ?',
        choices: [
          'Default',
          'Typescript',
          'Redux',
          'Typescript + Redux',
          new inquirer.Separator(),
          'Enter a template',
          'More templates',
        ],
      },
    ])
    .then((answers) => {
      if (answers.template === 'Enter a template') {
        return inquirer
          .prompt({
            type: 'input',
            name: 'template',
            message: 'Template Name:',
          })
          .then((answers) => {
            return answers.template;
          });
      } else if (answers.template === 'More templates') {
        open(
          'https://www.npmjs.com/search?q=cra-template-*&ranking=popularity',
        );

        return inquirer
          .prompt({
            type: 'input',
            name: 'template',
            message: 'Template Name:',
          })
          .then((answers) => {
            return answers.template;
          });
      }

      return templateMap[answers.template];
    });
}

async function create(projectDir, program) {

  const template = program.template || await selectTemplate();
  const log = console.log;
  const spinner = ora(
    chalk`Using {cyan create-react-app} to create project...\r\n`,
  ).start();
  const ciParams = process.argv.slice(2).join(' ');
  const createAppProcess = exec(`npx create-react-app ${ciParams} --template ${template}`);

  createAppProcess.stdout.on('data', function (data) {
    spinner.clear();
    if (data.indexOf('<project-directory>') !== -1) {
      log(chalk`   {cyan cra} {green <project-directory>}\r\n`);
    } else {
      log(data);
    }
  });

  createAppProcess.stderr.on('data', function (data) {
    spinner.clear();
    log(data);
  });

  createAppProcess.on('close', (code) => {
    if (code === 0) {
      spinner.succeed();
      copyConf(projectDir);
      Utils.modifyPackageJson(projectDir);
      Utils.installLib(projectDir);
    }

    code === 1 && spinner.fail();
  });
}

module.exports = create;
