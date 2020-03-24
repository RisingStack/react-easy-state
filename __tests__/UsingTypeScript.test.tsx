import React, { StrictMode, ChangeEvent, forwardRef } from 'react';
import { render, cleanup } from '@testing-library/react/pure';
import App from '../examples/using-typescript/src/App';

describe('Using TypeScript App', () => {
  afterAll(cleanup);

  test('should render without warnings', () => {
    const { container } = render(
      <StrictMode>
        <App greeting="Hello" />
      </StrictMode>,
    );
    expect(container).toHaveTextContent('Hello');
  });
});
