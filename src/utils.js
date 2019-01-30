import { useState } from 'react'

export let batchedUpdates
try {
  const ReactDOM = require('react-dom')
  batchedUpdates = ReactDOM.unstable_batchedUpdates
} catch (err) {
  try {
    const ReactNative = require('react-native')
    batchedUpdates = ReactNative.unstable_batchedUpdates
  } catch (err) {
    batchedUpdates = fn => fn()
  }
}

// try to find the global object
// it is window in the DOM and global in NodeJS and React Native
const isDOM = typeof window !== 'undefined'
const isNative = typeof global !== 'undefined'
export const globalObj = isDOM ? window : isNative ? global : undefined

export const hasHooks = typeof useState === 'function'
