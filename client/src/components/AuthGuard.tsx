import { Spinner } from ".";
import { useCheckTokenQuery } from "../app/services/auth";
import { errorHandling } from "../utils";

export const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const { error, isLoading } = useCheckTokenQuery();

  if (error) errorHandling(error);

  return isLoading || error ? <Spinner /> : children;
};
