const shell = require('shelljs')
const assert = require('assert')
const fs = require('fs')

const { REPO } = require('./config')


const cloneProject = (name) => {
    shell.echo(`Creating a new Mediavine server project: '${name}'`)
    shell.exec(`git clone -q ${REPO} ${name}`)
    shell.echo(`Moving into '${name}' directory`)
    shell.cd(name)
}

const installDeps = () => {
    shell.echo(`Installing dependencies`)
    shell.exec(`yarn install -s`)
}

const newProject = (program) => {
    const { name, editor } = program
    cloneProject(name)
    shell.sed('-i', /"name":\s".+",/i, `"name": "@mediavine/${name}",`, 'package.json');
    installDeps()
    shell.echo(`All done!`)
    if (editor) {
        shell.echo(`Opening your editor`)
        shell.exec(`${editor} .`)
    }
}

const installPlugin = (args) => {
    const base = 'https://github.com/mediavine'
    const dir = process.cwd().split('/').pop()
    const verb = args.v || ''
    if (dir !== 'plugins') {
        shell.echo(
            chalk.red(`You're not in the plugins directory!`)
        )
        return
    }
    shell.echo(`Installing ${args.repo} plugin`)
    if ( args.repo === 'wp-error-logger' ) {
        
    }
    shell.exec(`git clone ${verb} ${base}/${args.repo}`)
}

// const createWordPressErrorLogger = (args) => {
//     const 
// }

module.exports = { 
   newProject,
   installPlugin
}