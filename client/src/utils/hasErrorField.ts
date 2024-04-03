import { ErrorResponse } from "../app/types";

export const hasErrorField = (err: unknown): err is ErrorResponse => {
  return (
    typeof err === "object" &&
    err !== null &&
    "data" in err &&
    typeof err.data === "object" &&
    err.data !== null &&
    "error" in err.data
  );
};
