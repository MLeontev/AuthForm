import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from '../src/components/LoginForm/LoginForm';
import '@testing-library/jest-dom';
import * as store from '../src/store/AuthStore';

jest.mock('../src/store/AuthStore', () => {
  const actual = jest.requireActual('../src/store/AuthStore');
  return {
    ...actual,
    useAuthStore: jest.fn(),
  };
});

describe('LoginForm', () => {
  const setCredentials = jest.fn();

  beforeEach(() => {
    (store.useAuthStore as unknown as jest.Mock).mockReturnValue({
      login: '',
      password: '',
      remember: false,
      setCredentials,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders login form with inputs and buttons', () => {
    render(<LoginForm />);

    expect(screen.getByLabelText(/login/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/remember me/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^sign in$/i })).toBeInTheDocument();
    expect(screen.getByText(/sign in with google/i)).toBeInTheDocument();
    expect(screen.getByText(/sign in with apple/i)).toBeInTheDocument();
  });

  test('shows error when login is too short', async () => {
    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText(/login/i), {
      target: { value: 'abc' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'validPassword' },
    });
    fireEvent.click(screen.getByRole('button', { name: /^sign in$/i }));

    expect(await screen.findByText(/логин должен быть от 5 до 20 символов/i)).toBeInTheDocument();
  });

  test('shows error when password is too short', async () => {
    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText(/login/i), {
      target: { value: 'validLogin' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: '123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /^sign in$/i }));

    expect(await screen.findByText(/пароль должен быть от 5 до 20 символов/i)).toBeInTheDocument();
  });

  test('shows error on invalid credentials', async () => {
    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText(/login/i), {
      target: { value: 'invalidUser' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'invalidPass' },
    });
    fireEvent.click(screen.getByRole('button', { name: /^sign in$/i }));

    expect(await screen.findByText(/неверный логин или пароль/i)).toBeInTheDocument();
  });

  test('calls setCredentials and shows success message on valid input', async () => {
    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText(/login/i), {
      target: { value: 'ValidLogin' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: '12345678' },
    });
    fireEvent.click(screen.getByRole('button', { name: /^sign in$/i }));

    await waitFor(() => {
      expect(setCredentials).toHaveBeenCalledWith('ValidLogin', '12345678', false);
      expect(screen.getByText(/вы успешно вошли/i)).toBeInTheDocument();
    });
  });
});
