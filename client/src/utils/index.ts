const BASE_URL = "http://localhost:3000";

export async function api(url: string, options?: RequestInit) {
  const res = await fetch(`${BASE_URL}/${url}`, options);
  const data = await res.json();

  return data;
}
