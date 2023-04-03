import { cookies } from 'next/headers';

export default async function apiServer(
  url: string,
  method = 'GET',
  data?: any
) {
  const cookieStore = cookies();
  const token = cookieStore.get('token');

  const headers = new Headers({
    'Content-Type': 'application/json',
    authorization: `Bearer ${token?.value}`
  });

  const options: RequestInit = {
    method: method,
    cache: 'no-store',
    mode: 'cors',
    headers
  };

  if (data) {
    options.body = JSON.stringify({
      date: data
    });
  }
  return fetch(url, options);
}
