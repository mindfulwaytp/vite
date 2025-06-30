import { render, screen } from '@testing-library/react';
import App from './App';

// If using Jest or Vitest, ensure the environment is set up to provide 'test' globally.
// Otherwise, you can import it as shown below:
// import { test } from 'vitest'; // Uncomment if using Vitest
// import { test } from '@jest/globals'; // Uncomment if using Jest

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
