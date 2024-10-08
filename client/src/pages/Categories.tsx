import { FC, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { toast } from "react-toastify";

import {
  useChangeCategoryMutation,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoryQuery,
} from "../app/services/categories";
import {
  CategoryCreateModal,
  CategoryEditModal,
  CategoryItem,
  Loading,
} from "../components";
import { Category, CategoryFormData } from "../app/types";
import { errorHandling } from "../utils";

export const Categories: FC = () => {
  const { data: categories, isLoading } = useGetAllCategoryQuery();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useChangeCategoryMutation();
  const [showModal, setShowModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<null | Category>(null);

  const handleDeleteFunc = async (categoryId: number) => {
    try {
      await deleteCategory(categoryId).unwrap();
      toast.success("Success!");
    } catch (error: unknown) {
      errorHandling(error);
    }
  };

  const handleCreate = async (data: CategoryFormData) => {
    try {
      await createCategory(data).unwrap();
      toast.success("Success!");
    } catch (error: unknown) {
      errorHandling(error);
    }

    setShowModal(false);
  };

  const handleUpdate = async (data: CategoryFormData) => {
    if (!currentCategory) return;

    try {
      await updateCategory({ ...data, id: currentCategory.id }).unwrap();
    } catch (error: unknown) {
      errorHandling(error);
    }

    setShowModal(false);
    setCurrentCategory(null);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col items-center pt-5">
      {categories?.length ? (
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((category) => {
            return (
              <CategoryItem
                category={category}
                setCurrentCategory={setCurrentCategory}
                setShowModal={setShowModal}
                onDelete={handleDeleteFunc}
                key={category.id}
              />
            );
          })}
        </div>
      ) : (
        <h2 className="text-lg font-semibold">Create your first category!</h2>
      )}

      <button onClick={() => setShowModal(true)} className="btn btn-green mt-6">
        Add category
        <FaPlusCircle />
      </button>

      {showModal && !currentCategory && (
        <CategoryCreateModal
          onSubmit={handleCreate}
          setVisibleModel={setShowModal}
        />
      )}

      {showModal && currentCategory && (
        <CategoryEditModal
          onSubmit={handleUpdate}
          setVisibleModel={setShowModal}
          currentCategory={currentCategory}
          setCurrentCategory={setCurrentCategory}
        />
      )}
    </div>
  );
};
