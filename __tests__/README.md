## React Testing Library

Heads-up: Currently we are using `@testing-library/react/pure` instead of `@testing-library/react` since our tests are not [isolated](https://kentcdodds.com/blog/test-isolation-with-react).

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
