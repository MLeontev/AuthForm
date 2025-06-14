import { render, screen } from '@testing-library/react';
import Message from '../src/components/Message/Message';
import '@testing-library/jest-dom';

describe('Message', () => {
  test('renders success message with correct class', () => {
    render(<Message text="Успех" type="success" />);
    const message = screen.getByText(/успех/i);

    expect(message).toBeInTheDocument();
    expect(message).toHaveClass('message');
    expect(message).toHaveClass('success');
  });

  test('renders error message with correct class', () => {
    render(<Message text="Ошибка" type="error" />);
    const message = screen.getByText(/ошибка/i);

    expect(message).toBeInTheDocument();
    expect(message).toHaveClass('message');
    expect(message).toHaveClass('error');
  });
});
