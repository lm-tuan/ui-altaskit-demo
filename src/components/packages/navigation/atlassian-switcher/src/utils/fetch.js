export const FETCH_ERROR_NAME = 'FetchError';


export function enrichFetchError(
  error,
  status,
) {
  return {
    name: FETCH_ERROR_NAME,
    message: error.message,
    stack: error.stack,
    status,
  };
}

export const fetchJsonSameOrigin = (
  url,
  init,
) =>
  fetch(url, { credentials: 'same-origin', ...init }).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw enrichFetchError(
      new Error(
        `Unable to fetch ${url} ${response.status} ${response.statusText}`,
      ),
      response.status,
    );
  });

export const fetchJson = (url) => fetchJsonSameOrigin(url);

export const postJson = (url, data) =>
  fetchJsonSameOrigin(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
