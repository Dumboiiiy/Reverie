

export type ApiEnvelope<T> = {
  status: "success" | "error";
  data: T | null;
  error?: string;
  meta?: Record<string, unknown>;
  errors?: Array<{message: string; code?: string}>;
};

export function success<T>(data: T, meta?: Record<string, unknown>): ApiEnvelope<T> {
  return {
    status: "success",
    data,
    meta,
  };
}

export function error(message: string, code?: string): ApiEnvelope<null> {
  return {
    status: "error",
    data: null,
    errors: [{ message, code }],
  };
}
