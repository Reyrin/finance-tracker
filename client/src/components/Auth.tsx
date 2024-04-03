import { FC } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthForm } from "../components";
import { LoginData } from "../app/types";
import { hasErrorField } from "../utils";

interface Props {
  pageTitle: string;
  linkText: string;
  linkPath: string;
  successToastText: string;
  formSubmitHandler: (data: LoginData) => Promise<void>;
}

export const Auth: FC<Props> = ({
  pageTitle,
  linkText,
  linkPath,
  successToastText,
  formSubmitHandler,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const fromPage = location.state?.from?.pathname || "/";

  const onSubmit = async (data: LoginData) => {
    try {
      await formSubmitHandler(data);

      toast.success(successToastText);
      navigate(fromPage, { replace: true });
    } catch (error: unknown) {
      if (hasErrorField(error)) toast.error(error.data.message);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-900 text-white">
      <h1 className="mb-10 text-center text-xl">{pageTitle}</h1>

      <AuthForm onSubmit={onSubmit} />

      <Link to={linkPath} className="link mt-5">
        {linkText}
      </Link>
    </div>
  );
};
