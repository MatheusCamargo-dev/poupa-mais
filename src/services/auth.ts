import { apiClient } from './api-client';

import { setCookie } from 'nookies';

export async function signInRequest(data: BodyInit) {
  const jwt = await apiClient('auth', 'POST', data);
  const auth = await jwt.json();
  auth.status == 1 &&
    setCookie(undefined, 'token', auth.token, {
      maxAge: 60 * 80 * 24 //one day
    });
  return auth;
}

export async function signUpRequest(data: BodyInit) {
  const response = await apiClient('user', 'POST', data);
  const userData = await response.json();
  return userData;
}
