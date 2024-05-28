import { FC } from "react";
import { Auth } from "../components";
import { LoginFormData } from "../app/types";
import { useRegistrationMutation } from "../app/services/auth";

export const Registration: FC = () => {
  const [registration] = useRegistrationMutation();

  const registrationHandler = async (data: LoginFormData) => {
    await registration(data).unwrap();
  };

  return (
    <Auth
      pageTitle="Registration"
      linkText="Already have an account?"
      linkPath="/login"
      successToastText={"Account has been created."}
      formSubmitHandler={registrationHandler}
    />
  );
};
