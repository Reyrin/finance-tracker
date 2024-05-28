import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { CategoryFormData, CategorySchema } from "../app/types";
import { CategoryForm } from "./CategoryForm";

interface Props {
  onSubmit: (data: CategoryFormData) => void;
  setVisibleModel: (status: boolean) => void;
}

export const CategoryCreateModal: FC<Props> = ({
  onSubmit,
  setVisibleModel,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(CategorySchema),
  });

  const hideModal = () => {
    setVisibleModel(false);
  };

  return (
    <CategoryForm
      headerTitle={"Creating the category"}
      isSubmitting={isSubmitting}
      register={register}
      errors={errors}
      onSubmit={handleSubmit(onSubmit)}
      hideModal={hideModal}
    />
  );
};
