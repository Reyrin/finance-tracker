import { useEffect } from "react";
import { Loading } from ".";
import { useCheckTokenQuery } from "../app/services/auth";
import { errorHandling } from "../utils";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const { error, isLoading } = useCheckTokenQuery();

  useEffect(() => {
    if (error && (error as FetchBaseQueryError)?.status !== 401)
      errorHandling(error);
  }, [error]);

  return isLoading ? <Loading fullScreen={true} /> : children;
};
