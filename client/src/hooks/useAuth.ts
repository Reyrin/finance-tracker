import { useMemo } from "react";
import { useTypedSelector } from "./store";
import { selectCurrentUser } from "../features/auth/authSlice";

export const useAuth = () => {
  const user = useTypedSelector(selectCurrentUser);

  return useMemo(() => ({ user }), [user]);
};
