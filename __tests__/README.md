## React Testing Library notes

### Cleanup

Currently we are using `@testing-library/react/pure` instead of `@testing-library/react` since our tests are not [isolated](https://kentcdodds.com/blog/test-isolation-with-react).

On writing new tests, please keep the `cleanup` functions in __separate__ repeating or one-time functions like `afterEach` or `afterAll`.
Otherwise, it will lose the scope of the `document`, and it won't be able to clear the `body`.

BAD
```js
  afterAll(() => {
    cleanup();
    clock.restore();
    clearIntervalSpy.restore();
  });
```

GOOD
```js
  afterAll(cleanup);
  afterAll(() => {
    clock.restore();
    clearIntervalSpy.restore();
  });
```

### Act

Ignore the warnings about [act](https://reactjs.org/docs/test-utils.html#act) and do not wrap state mutations inside it. It is a useful helper for vanilla React state but it creates falsely passing tests for React Easy State - as it batches `setState`s.
