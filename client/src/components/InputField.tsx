import { FC } from "react";
import { LoginData, KeyOfLoginInputs } from "../app/types";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface Props {
  name: KeyOfLoginInputs;
  type: string;
  placeholder: string;
  errors: FieldErrors<LoginData>;
  register: UseFormRegister<LoginData>;
}

export const InputField: FC<Props> = ({
  name,
  type,
  placeholder,
  errors,
  register,
}) => (
  <label className="relative flex flex-col">
    <input
      type={type}
      className={`input ${errors[name] ? "border-red-500" : ""}`}
      placeholder={placeholder}
      {...register(name)}
    />
    {errors[name] && (
      <span className="absolute -bottom-6 left-1/2 mx-auto w-full -translate-x-1/2 text-center text-red-500">
        {errors[name]?.message}
      </span>
    )}
  </label>
);
