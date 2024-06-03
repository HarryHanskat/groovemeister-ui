import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('show navbar items by default', () => {
  render(<App />);
  const linkElement = screen.getByText(/Groovemeister/i);
  expect(linkElement).toBeInTheDocument();
});
