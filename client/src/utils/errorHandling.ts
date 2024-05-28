import { toast } from "react-toastify";
import { hasErrorField } from "./hasErrorField";

export const errorHandling = (error: unknown) => {
  hasErrorField(error)
    ? toast.error(error.data.message)
    : toast.error("Something went wrong");
};
