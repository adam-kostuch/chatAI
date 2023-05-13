export type RegistrationProps = {
  displayName: string;
  email: string;
  password: string;
};

export type LoginProps = {
  login: string;
  password: string;
};

export const COOKIE_TOKEN = 'token';
