import { useEffect, useState } from 'react';
import SocialButton from '../SocialButton/SocialButton.tsx';
import TextInput from '../TextInput/TextInput.tsx';
import Checkbox from '../Checkbox/Checkbox.tsx';
import Message from '../Message/Message.tsx';
import {
  isLoginLengthValid,
  isPasswordLengthValid,
  isCredentialsValid,
} from '../../utils/validation';
import * as React from 'react';
import './LoginForm.css';
import { useAuthStore } from "../../store/AuthStore.ts";

function LoginForm() {
  const {
    login,
    password,
    remember,
    setCredentials,
  } = useAuthStore();

  const [localLogin, setLocalLogin] = useState(login);
  const [localPassword, setLocalPassword] = useState(password);
  const [localRemember, setLocalRemember] = useState(remember);

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'error' | 'success' | null>(
    null,
  );
  const [shakeLogin, setShakeLogin] = useState(false);
  const [shakePassword, setShakePassword] = useState(false);

  useEffect(() => {
    if (remember) {
      setLocalLogin(login);
      setLocalPassword(password);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoginLengthValid(localLogin)) {
      setMessage('Логин должен быть от 5 до 20 символов');
      setShakeLogin(true);
      setTimeout(() => setShakeLogin(false), 300);
      setMessageType('error');
      return;
    }
    if (!isPasswordLengthValid(localPassword)) {
      setMessage('Пароль должен быть от 5 до 20 символов');
      setMessageType('error');
      setShakePassword(true);
      setTimeout(() => setShakePassword(false), 300);
      return;
    }
    if (!isCredentialsValid(localLogin, localPassword)) {
      setMessage('Неверный логин или пароль');
      setShakeLogin(true);
      setShakePassword(true);
      setTimeout(() => {
        setShakeLogin(false);
        setShakePassword(false);
      }, 300);
      setMessageType('error');
      return;
    }

    setCredentials(localLogin, localPassword, localRemember);
    setMessage('Вы успешно вошли!');
    setMessageType('success');
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Sign in</h2>
      <div className="social-buttons">
        <SocialButton text="Sign in with Google" />
        <SocialButton text="Sign in with Apple" />
      </div>
      <hr />

      <TextInput
        id="login"
        label="Login"
        value={localLogin}
        onChange={(e) => setLocalLogin(e.target.value)}
        shake={shakeLogin}
      />

      <TextInput
        id="password"
        type="password"
        label="Password"
        value={localPassword}
        onChange={(e) => setLocalPassword(e.target.value)}
        shake={shakePassword}
      />

      <Checkbox
        id="remember"
        label="Remember me"
        checked={localRemember}
        onChange={(e) => setLocalRemember(e.target.checked)}
      />

      <button type="submit" className="submit-button">
        Sign in
      </button>
      {messageType && <Message text={message} type={messageType} />}
    </form>
  );
}

export default LoginForm;
