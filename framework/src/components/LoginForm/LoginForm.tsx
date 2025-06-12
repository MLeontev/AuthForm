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
import {
  saveLoginData,
  clearLoginData,
  loadLoginData,
} from '../../utils/storage';
import * as React from 'react';
import './LoginForm.css';

function LoginForm() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'error' | 'success' | null>(
    null,
  );
  const [shakeLogin, setShakeLogin] = useState(false);
  const [shakePassword, setShakePassword] = useState(false);

  useEffect(() => {
    const saved = loadLoginData();
    if (saved) {
      setLogin(saved.login);
      setPassword(saved.password);
      setRemember(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoginLengthValid(login)) {
      setMessage('Логин должен быть от 5 до 20 символов');
      setShakeLogin(true);
      setTimeout(() => setShakeLogin(false), 300);
      setMessageType('error');
      return;
    }
    if (!isPasswordLengthValid(password)) {
      setMessage('Пароль должен быть от 5 до 20 символов');
      setMessageType('error');
      setShakePassword(true);
      setTimeout(() => setShakePassword(false), 300);
      return;
    }
    if (!isCredentialsValid(login, password)) {
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
    setMessage('Вы успешно вошли!');
    setMessageType('success');
    remember ? saveLoginData(login, password) : clearLoginData();
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
        value={login}
        onChange={(e) => setLogin(e.target.value)}
        shake={shakeLogin}
      />

      <TextInput
        id="password"
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        shake={shakePassword}
      />

      <Checkbox
        id="remember"
        label="Remember me"
        checked={remember}
        onChange={(e) => setRemember(e.target.checked)}
      />

      <button type="submit" className="submit-button">
        Sign in
      </button>
      {messageType && <Message text={message} type={messageType} />}
    </form>
  );
}

export default LoginForm;
