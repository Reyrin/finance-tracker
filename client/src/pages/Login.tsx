import { FC } from "react";
import { Auth } from "../components";
import { LoginFormData } from "../app/types";
import { useLoginMutation } from "../app/services/auth";

export const Login: FC = () => {
  const [login] = useLoginMutation();

  const loginHandler = async (data: LoginFormData) => {
    await login(data).unwrap();
  };

  return (
    <Auth
      pageTitle="Login"
      linkText="Don't have an account yet?"
      linkPath="/registration"
      successToastText={"Success! You are logged in."}
      formSubmitHandler={loginHandler}
    />
  );
};
