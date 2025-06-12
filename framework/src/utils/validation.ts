export function isLoginLengthValid(login: string): boolean {
  return login.length >= 5 && login.length <= 20;
}

export function isPasswordLengthValid(password: string): boolean {
  return password.length >= 5 && password.length <= 20;
}

export function isCredentialsValid(login: string, password: string): boolean {
  const validLogin = 'ValidLogin';
  const validPassword = '12345678';
  return login === validLogin && password === validPassword;
}
