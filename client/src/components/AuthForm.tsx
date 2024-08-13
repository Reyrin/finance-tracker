import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { LoginFormData, CredentialsSchema } from "../app/types";
import { InputField } from ".";

interface Props {
  onSubmit: (data: LoginFormData) => void;
}

export const AuthForm: FC<Props> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({ resolver: zodResolver(CredentialsSchema) });

  return (
    <form
      className="flex w-72 flex-col gap-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputField
        name={"email"}
        type={"text"}
        placeholder={"Email"}
        errors={errors}
        register={register}
      />

      <InputField
        name={"password"}
        type={"password"}
        placeholder={"Password"}
        errors={errors}
        register={register}
      />

      <button
        disabled={isSubmitting}
        className="btn btn-green mx-auto"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};
