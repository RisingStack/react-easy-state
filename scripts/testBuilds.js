const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')

const distPath = path.resolve('dist')
const files = fs.readdirSync(distPath)

for (let file of files) {
  exec(`BUNDLE=${file} npm run test`, (error) => {
    if (error) {
      console.error('\x1b[31m', `Error in ${file}`, '\x1b[30m')
    } else {
      console.log(`${file} works as expected`)
    }
  })
}
