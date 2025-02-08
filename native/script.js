document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const validLogin = "ValidLogin";
    const validPassword = "12345678";

    const login = document.getElementById("login");
    const password = document.getElementById("password");
    const rememberCheckbox = document.getElementById("remember-checkbox");

    const message = document.getElementById("message");
    message.textContent = "";
    message.classList.remove("show", "error", "success");

    let isValid = true;

    if (login.value.length < 5 || login.value.length > 20) {
        login.classList.add("shake");
        setTimeout(() => login.classList.remove("shake"), 300);
        message.textContent = "Логин должен быть от 5 до 20 символов.";
        message.classList.add("show", "error");
        isValid = false;
    }

    if (password.value.length < 5 || password.value.length > 20) {
        password.classList.add("shake");
        setTimeout(() => password.classList.remove("shake"), 300);
        if (isValid) {
            message.textContent = "Пароль должен быть от 5 до 20 символов.";
        } else {
            message.textContent += " Пароль должен быть от 5 до 20 символов.";
        }
        message.classList.add("show", "error");
        isValid = false;
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
    const savedLogin = localStorage.getItem("login");
    const savedPassword = localStorage.getItem("password");

    if (savedLogin && savedPassword) {
        const login = document.getElementById("login");
        const password = document.getElementById("password");
        const rememberCheckbox = document.getElementById("remember-checkbox");

        login.value = savedLogin;
        password.value = savedPassword;
        rememberCheckbox.checked = true;
    }
};