import { FC } from "react";
import { Spinner } from "./Spinner";

interface Props {
  fullScreen?: boolean;
}

export const Loading: FC<Props> = ({ fullScreen = false }) => {
  const fullScreenClass = fullScreen
    ? "mt-0 min-h-screen items-center bg-slate-800"
    : "";

  return (
    <div className={`mt-96 flex justify-center ${fullScreenClass}`}>
      <Spinner />
    </div>
  );
};
