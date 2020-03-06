# Contributing

## Issues

Issues are precious to this project.

- **Ideas** are a valuable source of contributions others can make
- **Problems** show where this project is lacking
- With a **question**, you show where contributors can improve the user experience

Thank you for creating them.

## Commits

Your commit messages should follow Angular [commit convention](https://www.conventionalcommits.org/en/v1.0.0-beta.4/). Therefore we are linting your commits with [Husky](https://github.com/typicode/husky), meaning you cannot create a non-conventional commit message. If you squash merge your pull request, please make sure you also follow the commit convention in your squashed commit message.

## Pull Requests

Pull requests are a great way to get your ideas into this repository.
You should be clear which problem you're trying to solve with your contribution.
Every pull request will require an approved review before merging.

## Linters

This project is using [ESLint](https://eslint.org/) for linting and [Prettier](https://prettier.io/) for code formatting. Please follow their standards on contributing. Your code is automatically formatted on saving a file when using [VSCode](https://code.visualstudio.com/) or [Atom](https://atom.io/). [Husky](https://github.com/typicode/husky) ensures that your changes are properly linted before making a commit. If you want to lint manually, you can use `lint` and `lint --fix` npm scripts to lint the source code and the test files.

## Tests

To run our tests use `npm t` script. We are using [Jest](https://jestjs.io/) and [React Testing Library](https://github.com/testing-library/react-testing-library) for testing. Consider creating new test cases when necessary under the `__tests__` folder, we want to keep our test covarage above 90%. Use `.test.js` or `.test.jsx` suffix for test files and `.test.native.js` or `.test.native.jsx` for native tests.
