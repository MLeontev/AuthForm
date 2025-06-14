import { render, screen, fireEvent } from '@testing-library/react';
import SocialButton from '../src/components/SocialButton/SocialButton';
import '@testing-library/jest-dom';

describe('SocialButton', () => {
  test('renders button with provided text', () => {
    render(<SocialButton text="Войти" />);
    const button = screen.getByRole('button', { name: /войти/i });

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('social-button');
  });

  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<SocialButton text="Войти" onClick={handleClick} />);
    const button = screen.getByRole('button', { name: /войти/i });

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
