import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export default async function apiServer(
  endpoint: string,
  method = 'GET',
  token: RequestCookie,
  data?: any
) {
  const headers = new Headers({
    'Content-Type': 'application/json',
    authorization: `Bearer ${token.value}`
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

  const url = 'http://localhost:3000/api/' + endpoint;
  return fetch(url, options);
}
