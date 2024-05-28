import { FC, MouseEventHandler } from "react";
import { colors } from "../app/constants";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { CategoryFormData } from "../app/types";

interface Props {
  headerTitle: string;
  isSubmitting: boolean;
  register: UseFormRegister<CategoryFormData>;
  errors: FieldErrors<CategoryFormData>;
  onSubmit: (e?: React.BaseSyntheticEvent<object> | undefined) => Promise<void>;
  hideModal: () => void;
}

export const CategoryForm: FC<Props> = ({
  headerTitle,
  isSubmitting,
  register,
  errors,
  onSubmit,
  hideModal,
}) => {
  const colorOptions = Object.keys(colors);

  const onClickOverlay: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget) hideModal();
  };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 top-0 flex h-full w-full items-center justify-center bg-black/50"
      onClick={onClickOverlay}
    >
      <form
        className="grid w-[350px] gap-6 rounded-md bg-slate-900 p-5"
        onSubmit={onSubmit}
      >
        <h1>{headerTitle}</h1>

        <label className="relative flex flex-col font-medium">
          Title
          <input
            type="text"
            className={`input ${errors.title ? "border-red-500" : ""}`}
            {...register("title")}
          />
          {errors.title && (
            <span className="absolute -bottom-6 left-1/2 mx-auto w-full -translate-x-1/2 text-center text-red-500">
              {errors.title.message}
            </span>
          )}
        </label>
        <label className="mb-2 block font-medium">
          Select a color
          <select
            {...register("color")}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          >
            {colorOptions.map((color) => (
              <option value={color} key={color}>
                {color}
              </option>
            ))}
          </select>
        </label>

        <div className="flex items-center gap-2">
          <button className="btn btn-green" disabled={isSubmitting}>
            Save
          </button>
          <button className="btn btn-red" onClick={hideModal}>
            Close
          </button>
        </div>
      </form>
    </div>
  );
};
