import { Spinner } from ".";
import { useCheckTokenQuery } from "../app/services/auth";

export const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const { isLoading } = useCheckTokenQuery();

  return isLoading ? <Spinner /> : children;
};
