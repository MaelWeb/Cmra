#!/usr/bin/env node

const commander = require('commander');
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const packageJson = require('./package');
const create = require('./script/create');

const program = new commander.Command(packageJson.name)
  .version(packageJson.version)
  .arguments('<project-directory>')
  .usage(`${chalk.green('<project-directory>')} [options]`)
  .action((name) => {
    projectName = name;
  })
  .option(
    '--template <path-to-template>',
    'specify a template for the created project',
  )
  .allowUnknownOption()
  .on('--help', () => {
    console.log();
    console.log(`    Only ${chalk.green('<project-directory>')} is required.`);
    console.log();
    console.log(`    A custom ${chalk.cyan('--template')} can be one of:`);
    console.log();
    console.log(
      `    If you have any problems, do not hesitate to file an issue:`,
    );
    console.log(
      `      ${chalk.cyan(
        'https://github.com/facebook/create-react-app/issues/new',
      )}`,
    );
    console.log();
  })
  .parse(process.argv);

clear();
console.log(chalk.green(figlet.textSync('Cmra', { font: 'Cyberlarge' })));

if (typeof projectName === 'undefined') {
  console.error('Please specify the project directory:');
  console.log(
    `  ${chalk.cyan(program.name())} ${chalk.green('<project-directory>')}`,
  );
  console.log();
  console.log('For example:');
  console.log(`  ${chalk.cyan(program.name())} ${chalk.green('my-react-app')}`);
  console.log();
  console.log(
    `Run ${chalk.cyan(`${program.name()} --help`)} to see all options.`,
  );
  process.exit(1);
}

create(projectName, program);
