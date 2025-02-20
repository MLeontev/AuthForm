document.getElementById("login-form")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const validLogin: string = "ValidLogin";
  const validPassword: string = "12345678";

  const login = document.getElementById("login") as HTMLInputElement;
  const password = document.getElementById("password") as HTMLInputElement;
  const rememberCheckbox = document.getElementById("remember-checkbox") as HTMLInputElement;
  const message = document.getElementById("message") as HTMLInputElement;

  message.textContent = "";
  message.classList.remove("show", "error", "success");

  let isValid: boolean = true;

  if (login.value.length < 5 || login.value.length > 20) {
    login.classList.add("shake");
    setTimeout(() => login.classList.remove("shake"), 300);
    message.textContent = "Логин должен быть от 5 до 20 символов";
    message.classList.add("show", "error");
    isValid = false;
  }

  if (isValid) {
    if (password.value.length < 5 || password.value.length > 20) {
      password.classList.add("shake");
      setTimeout(() => password.classList.remove("shake"), 300);
      message.textContent = "Пароль должен быть от 5 до 20 символов";
      message.classList.add("show", "error");
      isValid = false;
    }
  }

  if (isValid) {
    if (login.value !== validLogin || password.value !== validPassword) {
      message.textContent = "Неверный логин или пароль";
      message.classList.add("show", "error");
      login.classList.add("shake");
      password.classList.add("shake");
      setTimeout(() => {
        login.classList.remove("shake");
        password.classList.remove("shake");
      }, 300);
    } else {
      message.textContent = "Вы успешно вошли!";
      message.classList.add("show", "success");
      if (rememberCheckbox.checked) {
        localStorage.setItem("login", login.value);
        localStorage.setItem("password", password.value);
      } else {
        localStorage.removeItem("login");
        localStorage.removeItem("password");
      }
    }
  }
});

window.onload = function () {
  const savedLogin: string | null = localStorage.getItem("login");
  const savedPassword: string | null = localStorage.getItem("password");

  if (savedLogin && savedPassword) {
    const login = document.getElementById("login") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;
    const rememberCheckbox = document.getElementById("remember-checkbox") as HTMLInputElement;

    login.value = savedLogin;
    password.value = savedPassword;
    rememberCheckbox.checked = true;
  }
};

const snowflakes: NodeListOf<HTMLDivElement> = document.querySelectorAll('.snow__flake');

function getRndInteger(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function getRndFloat(min: number, max: number): string {
  return (Math.random() * (max - min) + min).toFixed(1);
}

snowflakes.forEach(snowflake => {
  snowflake.style.fontSize = getRndFloat(0.7, 1.5) + 'em';
  snowflake.style.animationDuration = getRndInteger(20, 30) + 's';
  snowflake.style.animationDelay = getRndInteger(-1, snowflakes.length / 2) + 's';
})

