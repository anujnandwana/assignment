import React from 'react';
import { render, screen } from '@testing-library/react';
import Table from './Table';

test('renders learn react link', () => {
  render(<Table data={[]}/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
