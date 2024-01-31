const minPasswordLength = 8;

export const isPasswordValid = (password: string) =>
  password.length >= minPasswordLength;
