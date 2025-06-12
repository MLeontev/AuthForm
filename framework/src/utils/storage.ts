export function saveLoginData(login: string, password: string) {
  localStorage.setItem('login', login);
  localStorage.setItem('password', password);
}

export function clearLoginData() {
  localStorage.removeItem('login');
  localStorage.removeItem('password');
}

export function loadLoginData(): { login: string; password: string } | null {
  const login = localStorage.getItem('login');
  const password = localStorage.getItem('password');
  if (login && password) return { login, password };
  return null;
}
