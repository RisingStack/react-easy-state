import { useState } from 'react';

// try to find the global object
// it is window in the DOM and global in NodeJS and React Native
const isDOM = typeof window !== 'undefined';
const isNative = typeof global !== 'undefined';
export const globalObj = isDOM
  ? window
  : isNative
  ? global
  : undefined;

export const hasHooks = typeof useState === 'function';
