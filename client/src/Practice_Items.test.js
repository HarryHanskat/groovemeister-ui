import { render, screen } from '@testing-library/react';
import App from './Practice_Items';
import Practice_Items from './Practice_Items';

test('renders learn react link', () => {
  render(<Practice_Items />);
  const linkElement = screen.getByText('Database????');
  expect(linkElement).toBeInTheDocument();
});
