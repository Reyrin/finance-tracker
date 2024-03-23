import { FC } from "react";
import { AuthForm } from "../components";
import { Link } from "react-router-dom";

export const Login: FC = () => {
  const onSubmit = () => {
    console.log(222, "submit login");
  };

  return (
    <div className="mt-40 flex flex-col items-center justify-center bg-slate-900 text-white">
      <h1 className="mb-10 text-center text-xl">Login</h1>

      <AuthForm onSubmit={onSubmit} />

      <Link to="/registration" className="link mt-5">
        Don't have an account yet?
      </Link>
    </div>
  );
};
