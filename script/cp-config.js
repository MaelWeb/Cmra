const fs = require('fs');
const path = require('path');
const ora = require('ora');
const chalk = require('chalk');

function copyFileSync(source, target) {
  var targetFile = target;

  //if target is a directory a new file with the same name will be created
  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      targetFile = path.join(
        target,
        path.basename(source).replace(/^\_+/g, '.'),
      );
    }
  }

  fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderRecursiveSync(target) {
  var files = [];
  const source = path.join(__dirname, '../conf');
  //check if folder needs to be created or integrated
  const targetFolder = path.join(process.cwd(), target);

  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder);
  }
  //copy
  const spinner = ora(chalk`Copy config file... \r\n`).start();
  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source);
    files.forEach(function (file) {
      var curSource = path.join(source, file);
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, targetFolder);
      } else {
        copyFileSync(curSource, targetFolder);
      }
    });
  }
  spinner.succeed();
}

module.exports = copyFolderRecursiveSync;
