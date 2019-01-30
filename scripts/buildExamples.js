const fs = require('fs')
const path = require('path')
const { execSync: exec } = require('child_process')

const examplesPath = path.resolve('examples')

const examples = fs
  .readdirSync(examplesPath)
  .filter(
    dir =>
      dir.indexOf('native') === -1 &&
      fs.statSync(path.join(examplesPath, dir)).isDirectory()
  )

for (let example of examples) {
  example = path.join(examplesPath, example)
  exec('npm run build', {
    cwd: example,
    stdio: 'inherit'
  })
}
