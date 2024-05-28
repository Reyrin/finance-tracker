import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { Category, CategoryFormData, CategorySchema } from "../app/types";
import { CategoryForm } from "./CategoryForm";

interface Props {
  currentCategory: Category;
  onSubmit: (data: CategoryFormData) => void;
  setVisibleModel: (open: boolean) => void;
  setCurrentCategory: (category: Category | null) => void;
}

export const CategoryEditModal: FC<Props> = ({
  currentCategory,
  onSubmit,
  setVisibleModel,
  setCurrentCategory,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      title: currentCategory.title,
      color: currentCategory.color,
    },
  });

  const hideModal = () => {
    setVisibleModel(false);
    setCurrentCategory(null);
  };

  return (
    <CategoryForm
      headerTitle={"Editing the category"}
      isSubmitting={isSubmitting}
      register={register}
      errors={errors}
      onSubmit={handleSubmit(onSubmit)}
      hideModal={hideModal}
    />
  );
};
