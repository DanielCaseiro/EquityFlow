import axios from "axios";
import { toast } from "react-toastify";

type ApiErrorResponse = {
  errors?: string[] | Record<string, string[]>;
  [key: string]: unknown;
};

export const handleError = (error: unknown): void => {
  if (!axios.isAxiosError(error)) {
    toast.warning("An unexpected error occurred.");
    return;
  }

  const response = error.response;
  const data = response?.data as ApiErrorResponse | string | undefined;

  if (response?.status === 401) {
    toast.warning("Please login");
    window.location.href = "/login";
    return;
  }

  if (data && typeof data === "object" && "errors" in data) {
    const errors = data.errors;

    if (Array.isArray(errors)) {
      for (const value of errors) {
        toast.warning(value);
      }
      return;
    }

    if (errors && typeof errors === "object") {
      for (const key in errors) {
        const fieldErrors = errors[key];
        if (Array.isArray(fieldErrors) && fieldErrors.length > 0) {
          toast.warning(fieldErrors[0]);
        }
      }
      return;
    }
  }

  if (typeof data === "string") {
    toast.warning(data);
    return;
  }

  if (error.message) {
    toast.warning(error.message);
    return;
  }

  toast.warning("An unexpected error occurred.");
};