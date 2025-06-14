import { render, screen, fireEvent } from '@testing-library/react';
import TextInput from '../src/components/TextInput/TextInput';
import '@testing-library/jest-dom';

describe('TextInput', () => {
  test('renders label and input with correct props', () => {
    render(
      <TextInput
        id="login"
        label="Login"
        value="Login"
        onChange={() => {}}
        placeholder="Введите логин"
      />
    );

    const input = screen.getByPlaceholderText('Введите логин');
    const label = screen.getByLabelText('Login');

    expect(input).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(input).toHaveValue('Login');
  });

  test('calls onChange when input changes', () => {
    const handleChange = jest.fn();

    render(
      <TextInput
        id="login"
        label="Login"
        value="Login"
        onChange={handleChange}
      />
    );

    const input = screen.getByLabelText('Login');
    fireEvent.change(input, { target: { value: 'Login1' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('applies shake class when shake is true', () => {
    render(
      <TextInput
        id="login"
        label="Login"
        value=""
        onChange={() => {}}
        shake={true}
      />
    );

    const input = screen.getByLabelText('Login');
    expect(input).toHaveClass('shake');
  });

  test('does not apply shake class when shake is false', () => {
    render(
      <TextInput
        id="login"
        label="Login"
        value=""
        onChange={() => {}}
        shake={false}
      />
    );

    const input = screen.getByLabelText('Login');
    expect(input).not.toHaveClass('shake');
  });
});
