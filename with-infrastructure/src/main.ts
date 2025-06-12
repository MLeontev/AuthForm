import {
  isLoginLengthValid,
  isPasswordLengthValid,
  isCredentialsValid,
  saveLoginData,
  clearLoginData,
  loadLoginData,
} from './loginLogic';

function shakeElement(element: HTMLElement) {
  element.classList.add('shake');
  setTimeout(() => element.classList.remove('shake'), 300);
}

function showMessage(
  element: HTMLElement,
  text: string,
  type: 'error' | 'success',
) {
  element.textContent = text;
  element.classList.remove('show', 'error', 'success');
  element.classList.add('show', type);
}

document.getElementById('login-form')?.addEventListener('submit', function (e) {
  e.preventDefault();

  const login = document.getElementById('login') as HTMLInputElement;
  const password = document.getElementById('password') as HTMLInputElement;
  const rememberCheckbox = document.getElementById(
    'remember-checkbox',
  ) as HTMLInputElement;
  const message = document.getElementById('message') as HTMLInputElement;

  message.textContent = '';
  message.classList.remove('show', 'error', 'success');

  let isValid = true;

  if (!isLoginLengthValid(login.value)) {
    shakeElement(login);
    showMessage(message, 'Логин должен быть от 5 до 20 символов', 'error');
    isValid = false;
  }

  if (isValid && !isPasswordLengthValid(password.value)) {
    shakeElement(password);
    showMessage(message, 'Пароль должен быть от 5 до 20 символов', 'error');
    isValid = false;
  }

  if (isValid && !isCredentialsValid(login.value, password.value)) {
    shakeElement(login);
    shakeElement(password);
    showMessage(message, 'Неверный логин или пароль', 'error');
  }

  if (isValid && isCredentialsValid(login.value, password.value)) {
    showMessage(message, 'Вы успешно вошли!', 'success');
    if (rememberCheckbox.checked) {
      saveLoginData(login.value, password.value);
    } else {
      clearLoginData();
    }
  }
});

window.onload = function () {
  const savedData = loadLoginData();
  if (savedData) {
    const login = document.getElementById('login') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;
    const rememberCheckbox = document.getElementById(
      'remember-checkbox',
    ) as HTMLInputElement;

    login.value = savedData.login;
    password.value = savedData.password;
    rememberCheckbox.checked = true;
  }
};

const snowflakes: NodeListOf<HTMLDivElement> =
  document.querySelectorAll('.snow__flake');

function getRndInteger(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRndFloat(min: number, max: number): string {
  return (Math.random() * (max - min) + min).toFixed(1);
}

snowflakes.forEach((snowflake) => {
  snowflake.style.fontSize = getRndFloat(0.7, 1.5) + 'em';
  snowflake.style.animationDuration = getRndInteger(20, 30) + 's';
  snowflake.style.animationDelay =
    getRndInteger(-1, snowflakes.length / 2) + 's';
});
