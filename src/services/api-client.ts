import { NextPageContext } from 'next';

import { parseCookies } from 'nookies';
export async function apiClient(
  endpoint: string,
  method = 'GET',
  data?: BodyInit | undefined,
  ctx: Pick<NextPageContext, 'req'> | undefined = undefined
) {
  const { token } = await parseCookies(ctx);

  const headers: HeadersInit = {
    'Content-Type': 'application/json'
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}` as const;
  }
  const options: RequestInit = {
    method: method,
    headers: headers,
    mode: 'cors'
  };

  if (data) {
    options.body = JSON.stringify({
      data
    });
  }
  const url = 'http://localhost:3000/api/' + endpoint;
  return fetch(url, options);
}
