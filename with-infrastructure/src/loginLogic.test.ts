import {
  isLoginLengthValid,
  isPasswordLengthValid,
  isCredentialsValid,
  saveLoginData,
  clearLoginData,
  loadLoginData,
} from "./loginLogic";

beforeEach(() => {
  localStorage.clear();
})

describe("login and password validation", () => {
  test("login must be between 5 and 20 characters", () => {
    expect(isLoginLengthValid("123")).toBe(false);
    expect(isLoginLengthValid("login123")).toBe(true);
    expect(isLoginLengthValid("1".repeat(25))).toBe(false);
  });

  test("password must be between 5 and 20 characters", () => {
    expect(isPasswordLengthValid("123")).toBe(false);
    expect(isPasswordLengthValid("password123")).toBe(true);
    expect(isPasswordLengthValid("1".repeat(25))).toBe(false);
  });

  test("credentials must match validLogin and validPassword", () => {
    expect(isCredentialsValid("ValidLogin", "12345678")).toBe(true);
    expect(isCredentialsValid("InvalidLogin", "12345678")).toBe(false);
    expect(isCredentialsValid("ValidLogin", "InvalidPassword")).toBe(false);
  });
});

describe("localStorage save/load", () => {
  test("save and load login data", () => {
    saveLoginData("testUser", "testPassword");
    const loadData = loadLoginData();
    expect(loadData).toEqual({ login: "testUser", password: "testPassword" });
  });

  test("clear login data", () => {
    saveLoginData("testUser", "testPassword");
    clearLoginData();
    expect(loadLoginData()).toBeNull();
  });
});