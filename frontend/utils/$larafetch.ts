import { $fetch, FetchOptions, FetchError } from "ofetch";
const CSRF_COOKIE = "XSRF-TOKEN";
const CSRF_HEADER = "X-XSRF-TOKEN";
interface ResponseMap {
  blob: Blob;
  text: string;
  arrayBuffer: ArrayBuffer;
}
type ResponseType = keyof ResponseMap | "json";
type LarafetchOptions<R extends ResponseType> = FetchOptions<R> & {
  redirectIfNotAuthenticated?: boolean;
  redirectIfNotVerified?: boolean;
};
export async function $larafetch<T, R extends ResponseType = "json">(
  path: RequestInfo,
  {
    redirectIfNotAuthenticated = false,
    redirectIfNotVerified = false,
    ...options
  }: LarafetchOptions<R> = {}
) {
  const { API_BASE_URL, BASE_URL } = useRuntimeConfig().public;
  let token = useCookie(CSRF_COOKIE).value;
  if (
    process.client &&
    ["post", "delete", "put", "patch"].includes(options?.method?.toLowerCase())
  ) {
    await initCsrf();
    token = getCookie(CSRF_COOKIE);
  }
  let headers: any = {
    ...options?.headers,
    ...(token && { [CSRF_HEADER]: token }),
    accept: "application/json",
  };
  // Only add type json if not form data.
  if (options.body instanceof FormData === false) {
    headers = {
      ...headers,
      "Content-Type": "application/json",
    };
  }
  if (process.server) {
    headers = {
      ...headers,
      ...useRequestHeaders(["cookie"]),
      referer: BASE_URL,
    };
  }
  try {
    return await $fetch<T, R>(path, {
      baseURL: API_BASE_URL,
      ...options,
      headers,
      credentials: "include",
    });
  } catch (error: any) {
    if (!(error instanceof FetchError)) throw error;
    if (
      redirectIfNotAuthenticated &&
      [401, 419].includes(error?.response?.status)
    ) {
      await navigateTo("/login");
    }
    if (redirectIfNotVerified && [409].includes(error?.response?.status)) {
      await navigateTo("/account-verify");
    }
    throw error;
  }
}
async function initCsrf() {
  const { API_BASE_URL } = useRuntimeConfig().public;
  await $fetch("sanctum/csrf-cookie", {
    baseURL: API_BASE_URL,
    credentials: "include",
  });
}
function getCookie(name: string) {
  const match = document.cookie.match(
    new RegExp("(^|;\\s*)(" + name + ")=([^;]*)")
  );
  return match ? decodeURIComponent(match[3]) : null;
}
function processErrorResponse(response) {
  response.formErrors = false;
  response.laravelErrors = false;
  response.undefinedErrors = false;
  if (!response.ok && response._data && response._data.errors) {
    response.formErrors = true;
  } else if (!response.ok && response._data && response._data.message) {
    response.laravelErrors = true;
  } else {
    response.undefinedErrors = true;
  }
  return response;
}
