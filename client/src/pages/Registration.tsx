import { FC } from "react";
import { AuthForm } from "../components";
import { Link } from "react-router-dom";

export const Registration: FC = () => {
  const onSubmit = () => {
    console.log(222, "submit registration");
  };

  return (
    <div className="mt-40 flex flex-col items-center justify-center bg-slate-900 text-white">
      <h1 className="mb-10 text-center text-xl">Registration</h1>

      <AuthForm onSubmit={onSubmit} />

      <Link to="/login" className="link mt-5">
        Alredy have an account?
      </Link>
    </div>
  );
};
