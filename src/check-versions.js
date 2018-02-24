'use strict'
const chalk = require('chalk')
const semver = require('semver')
const packageConfig = global._WEBPACK_PKG
const shell = require('shelljs')
function exec (cmd) {
  console.log(require('child_process').execSync(cmd).toString());
  return require('child_process').execSync(cmd).toString().trim()
}

const versionRequirements = [
  {
    name: 'node',
    currentVersion: semver.clean(process.version),
    versionRequirement: packageConfig.engines.node
  }
]

// if (shell.which('npm')) {
//   // console.log(exec('npm --version'));
//   versionRequirements.push({
//     name: 'npm',
//     currentVersion: exec('npm --version'),
//     versionRequirement: packageConfig.engines.npm
//   })
// }

module.exports = function () {
  const warnings = []
  for (let i = 0; i < versionRequirements.length; i++) {
    const mod = versionRequirements[i]
    // console.log(versionRequirements[i]);
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
      )
    }
  }

  if (warnings.length) {
    console.log('')
    console.log(chalk.yellow('To use this template, you must update following to modules:'))
    console.log()
    for (let i = 0; i < warnings.length; i++) {
      const warning = warnings[i]
      console.log('  ' + warning)
    }
    console.log()
    process.exit(1)
  }
}
