import { FC } from "react";
import { FaEdit, FaTimes } from "react-icons/fa";
import { Category } from "../app/types";
import { colors } from "../app/constants";

interface Props {
  category: Category;
  onDelete: (categoryId: number) => Promise<void>;
  setShowModal: (status: boolean) => void;
  setCurrentCategory: (category: Category) => void;
}

export const CategoryItem: FC<Props> = ({
  category,
  setCurrentCategory,
  setShowModal,
  onDelete,
}) => {
  const { id, title, color } = category;
  const colorClass = colors[color];

  const deleteCategory = () => {
    onDelete(id);
  };

  const updateCategory = () => {
    setShowModal(true);
    setCurrentCategory(category);
  };

  return (
    <div
      className={`transition-p flex cursor-default gap-2 rounded-3xl p-3 text-base duration-[0.3s] ease-[ease-in-out] hover:p-5 ${colorClass}`}
    >
      <span>{title}</span>
      <button onClick={updateCategory} className="rounded-full">
        <FaEdit size={15} />
      </button>
      <button onClick={deleteCategory}>
        <FaTimes size={15} />
      </button>
    </div>
  );
};
