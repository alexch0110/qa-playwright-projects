import axios from "axios";

type ApiError = { message?: string };

export function getApiErrorMessage(e: unknown, fallback: string) {
  if (axios.isAxiosError<ApiError>(e)) {
    return e.response?.data?.message ?? fallback;
  }
  return fallback;
}
