import { FC } from "react";
import { Spinner } from "./Spinner";

interface Props {
  fullScreen?: boolean;
}

export const Loading: FC<Props> = ({ fullScreen = false }) => {
  const fullScreenClass = fullScreen
    ? "min-h-screen justify-center items-center bg-slate-800"
    : "mt-96 justify-center";

  return (
    <div className={`flex ${fullScreenClass}`}>
      <Spinner />
    </div>
  );
};
