export class FetchError extends Error {
  response;

  data;

  constructor({ message, response, data }) {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FetchError);
    }

    this.name = 'FetchError';
    this.response = response;
    this.data = data ?? { message };
  }
}

export default async function fetcher(...args) {
  const response = await fetch(...args);
  const data = await response?.json();

  if (response?.ok) {
    return data;
  }

  throw new FetchError({
    message: response?.statusText,
    response,
    data,
  });
}
