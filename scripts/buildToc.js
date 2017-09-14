const fs = require('fs')
const path = require('path')
const toc = require('markdown-toc')

const readmePath = path.resolve('README.md')
const oldReadme = fs.readFileSync(readmePath, 'utf8')
const newReadme = toc.insert(oldReadme, { maxdepth: 3, bullets: ['*', '+'] })

fs.writeFileSync(readmePath, newReadme)
