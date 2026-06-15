// Normalized API response envelope types shared by all Route Handlers and fetch helpers.

export type ApiSuccess<T> = {
  success: true;
  data: T;
};

export type ApiError = {
  success: false;
  error: {
    /** Machine-readable code for client-side branching. */
    code: string;
    message: string;
  };
};

export type ApiResponse<T> = ApiSuccess<T> | ApiError;
