#!/usr/bin/env node

const program = require('commander')
const { prompt } = require('inquirer')
const { version } = require('./package.json')
const { newProject, installPlugin } = require('./actions')
const chalk = require('chalk')
const clear = require('clear')
const figlet = require('figlet')
const slugify = require('slugify')
const Sentencer = require('sentencer')

const string = Sentencer.make("{{ adjective }} {{ noun }}")
const name = slugify(string)

const questions = [
    {
        type: 'list',
        name: 'repo',
        message: `Choose a repository to install:`,
        choices: [ 'mediavine-create', 'mediavine-control-panel', 'mediavine-recipe-importers', 'pubeng-wp-ui' ],
        default: 'mediavine-create'
    }
]

program
    .version(version)
    .description('Mediavine template service')

program
    .command('new')
    .alias('n')
    .option('-e, --editor [editor command]', 'Open the project in your favorite editor! <3', 'code')
    .option('-n, --name [name]', 'Enter a name for your project', name)
    .description('New project')
    .action((program) => {
        clear();
        console.log(
            chalk.yellow(
                figlet.textSync('Peppercorn', { horizontalLayout: 'full' })
            )
        );
        newProject(program)
    })

program
    .command('install')
    .alias('i')
    .option('-v, --verbose', 'Verbosity')
    .description('Install a plugin')
    .action(() => {
        clear();
        console.log(`\n\n`);
        console.log(
            chalk.yellow(
                figlet.textSync('Peppercorn', { horizontalLayout: 'full' })
            )
        );
        console.log(`\n`);
        prompt(questions).then(args => installPlugin(args))
    })

if (!process.argv.slice(2).length || !/[ni]/.test(process.argv.slice(2))) {
    program.outputHelp()
    process.exit()
}
program.parse(process.argv)