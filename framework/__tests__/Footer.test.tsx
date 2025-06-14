import { render, screen } from '@testing-library/react';
import Footer from '../src/components/Footer/Footer';
import '@testing-library/jest-dom';

describe('Footer', () => {
  test('renders name and email', () => {
    render(<Footer />);

    expect(screen.getByText(/леонтьев максим рис-22-2/i)).toBeInTheDocument();

    const emailLink = screen.getByRole('link', { name: /maleontev@edu\.hse\.ru/i });
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute('href', 'mailto:maleontev@edu.hse.ru');
  });
});