import { render, screen } from '@testing-library/react';
import Header from '../src/components/Header/Header';
import '@testing-library/jest-dom';

describe('Header', () => {
  test('renders welcome message', () => {
    render(<Header />);
    expect(screen.getByRole('heading', { name: /welcome!/i })).toBeInTheDocument();
  });
});