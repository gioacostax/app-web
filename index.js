#!/usr/bin/env node

/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable no-throw-literal */

const chalk = require('chalk');
const path = require('path');
const spawn = require('cross-spawn');
const { Command } = require('commander');
const fs = require('fs');
const inquirer = require('inquirer');
const rimraf = require('rimraf');
const { exit } = require('process');

const REPO = 'https://github.com/gioacostax/react-kit.git';
const REPO_BRANCHS = ['core', 'src/basic', 'src/full'];
const APP_CONFIG = {
  title: 'App',
  description: 'Demo App',
  start_url: '/',
};
const GIT_CONFIG = {
  email: 'test@mail.com',
  name: 'Test'
};

const cmd = new Command()
  .option('--upgrade', 'Upgrade core')
  .option('--default', 'All default options')
  .parse(process.argv);

const mkDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    return true;
  }
  return false;
};

const isDirEmpty = (dir) => fs.readdirSync(dir).length === 0;

const askBranch = (dir, branchs) => inquirer
  .prompt({
    type: 'list',
    name: 'branch',
    message: 'Select a branch',
    choices: branchs,
  })
  .then((answers) => answers.branch);

const cloneRepo = (dir, repo, branch) => {
  const result = spawn.sync('git', ['clone', '-b', branch, '--single-branch', repo, dir], { stdio: 'inherit' });
  if (result.status === 0) return true;
  return false;
};

const promptConfig = (config) => inquirer
  .prompt([
    {
      type: 'input',
      name: 'title',
      message: 'App title?',
      default: config.title,
    },
    {
      type: 'input',
      name: 'description',
      message: 'App description?',
      default: config.description,
    },
    {
      type: 'input',
      name: 'start_url',
      message: 'Starting URL?',
      default: config.start_url,
    },
  ])
  .then((answers) => answers);

const promptGitConfig = (config) => inquirer
  .prompt([
    {
      type: 'input',
      name: 'email',
      message: 'Your email?',
      default: config.email,
    },
    {
      type: 'input',
      name: 'name',
      message: 'Your name?',
      default: config.name,
    }
  ])
  .then((answers) => answers);

const setup = (dir, original, config) => {
  let temp = original;
  temp = {
    ...temp,
    app: {
      ...temp.app,
      ...config,
    },
  };
  delete temp.repository;
  delete temp.author;
  fs.writeFileSync(`${dir}/package.json`, JSON.stringify(temp), 'utf8');
  return true;
};

const resetGit = (dir, email, name) => {
  rimraf.sync(`${dir}/.git`); // TODO: Verificar posibles errores
  if (spawn.sync('git', ['init'], { cwd: dir, stdio: 'inherit' }).status !== 0) return false;
  if (spawn.sync('git', ['config', 'user.email', `"${email}"`], { cwd: dir, stdio: 'inherit' }).status !== 0) return false;
  if (spawn.sync('git', ['config', 'user.name', `"${name}"`], { cwd: dir, stdio: 'inherit' }).status !== 0) return false;
  if (spawn.sync('git', ['add', '.'], { cwd: dir, stdio: 'inherit' }).status !== 0) return false;
  if (spawn.sync('git', ['commit', '-m', '"Initial commit"'], { cwd: dir, stdio: 'inherit' }).status !== 0) return false;
  return true;
};

const install = (dir) => {
  if (spawn.sync('yarn', [], { cwd: dir, stdio: 'inherit' }).status !== 0) return false;
  return true;
};

const test = (dir) => {
  if (spawn.sync('yarn', ['test'], { cwd: dir, stdio: 'inherit' }).status !== 0) return false;
  return true;
};

const askContinue = (message, defaultValue = false) => inquirer
  .prompt({
    type: 'confirm',
    name: 'continue',
    message,
    default: defaultValue,
  })
  .then((answers) => answers.continue);

const logInfo = (msg) => {
  console.log(chalk.cyan(`${msg} \u2193`));
};

const logSuccess = (msg) => {
  console.log(chalk.green(`${msg} \u2713`));
};

const logError = (msg) => {
  console.log(chalk.red(`${msg} \u2717`));
};

const run = async (args = ['.'], noPrompt = false, upgrade = false) => {
  const DIR = args[0];
  const APP_DIR = path.resolve(process.env.INIT_CWD, DIR);

  console.log(chalk.magenta('-------------------------------------------------------------'));
  console.log(chalk.magenta(`Working on ${APP_DIR}`));
  console.log(chalk.magenta('-------------------------------------------------------------'));

  if (upgrade) {
    // Verificar que APP_DIR exista
    logInfo('Upgrading...');
    exit();
  }

  try {
    // Creating folder
    if (mkDir(APP_DIR)) logSuccess('Project folder created');
    else if (isDirEmpty(APP_DIR)) {
      if (!noPrompt) if (!await askContinue('The folder already exist and is empty, continue?')) exit();
    } else throw 'The folder alredy exist, and must be empty';

    // Cloning template
    logInfo('Fetching template...');
    let branch = REPO_BRANCHS[0];
    if (!noPrompt) branch = await askBranch(APP_DIR, REPO_BRANCHS);
    if (cloneRepo(APP_DIR, REPO, branch)) logSuccess('Template created');
    else throw 'Copying template failed';

    // Setting up project
    if (!noPrompt) {
      logInfo('Setting up project...');
      const APP_PACKAGE = require(`${APP_DIR}/package.json`);
      const config = await promptConfig(APP_CONFIG);
      if (setup(APP_DIR, APP_PACKAGE, config)) logSuccess('Setup completed');
      else throw 'Setup failed';
    }

    // Reseting git
    logInfo('Initializing git...');
    let config = GIT_CONFIG;
    if (!noPrompt) config = await promptGitConfig(GIT_CONFIG);
    if (resetGit(APP_DIR, config.email, config.name)) logSuccess('Git Initialized');
    else throw 'Git initializing failed';

    // Installing project dependencies
    if (!noPrompt) {
      if (await askContinue('Install dependencies?', true)) {
        logInfo('Installing dependencies...');
        if (install(APP_DIR)) logSuccess('Installation completed');
        else throw 'Installation failed';

        // Testing project
        if (await askContinue('Execute project tests?', true)) {
          logInfo('Testing project...');
          if (test(APP_DIR)) logSuccess('Test successfully completed');
          else throw 'Test failed';
        }
      }
    } else {
      logInfo('Installing dependencies...');
      if (install(APP_DIR)) logSuccess('Installation completed');
      else throw 'Installation failed';

      logInfo('Testing project...');
      if (test(APP_DIR)) logSuccess('Test successfully completed');
      else throw 'Test failed';
    }

    // TODO: Show projects scripts info
  } catch (error) {
    logError(error);
    exit(1);
  }
};

run(cmd.args, cmd.default, cmd.upgrade);
