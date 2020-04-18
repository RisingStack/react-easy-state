/* eslint-disable no-console */

const assert = require('assert');
/* eslint-disable-next-line import/no-unresolved */
const { store, autoEffect, clearEffect } = require('../dist/cjs.es6');

console.info('Checking Node platfrom support');

const person = store({
  name: 'Bob',
});

let name;
const effect = autoEffect(() => {
  name = person.name;
});
assert(name === 'Bob');

person.name = 'Ann';
assert(name === 'Ann');

clearEffect(effect);

console.info('Node platfrom support verified');
