const { createCoverageMap } = require('istanbul-lib-coverage');
const { createReporter } = require('istanbul-api');

// TODO: fix native coverage merge

const webCoverage = require('../coverage/web/coverage-final.json');
const noHookCoverage = require('../coverage/no-hook/coverage-final.json');
// const nativeCoverage = require('../coverage/native/coverage-final.json');

const map = createCoverageMap();

map.merge(webCoverage);
map.merge(noHookCoverage);
// map.merge(nativeCoverage);

const reporter = createReporter();

reporter.addAll(['lcovonly', 'text']);
reporter.write(map);
