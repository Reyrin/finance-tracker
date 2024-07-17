import { FC, useState } from "react";
import { FaPlus } from "react-icons/fa";
import {
  useCreateCategoryMutation,
  useGetAllCategoryQuery,
} from "../app/services/categories";
import { CategoryCreateModal, Select } from ".";
import {
  CategoryFormData,
  TransactionFormData,
  TransactionSchema,
} from "../app/types";
import { toast } from "react-toastify";
import { errorHandling } from "../utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateTransactionMutation } from "../app/services/transactions";

export const TransactionsForm: FC = () => {
  const { data: categories } = useGetAllCategoryQuery();
  const [createCategory] = useCreateCategoryMutation();
  const [createTransaction] = useCreateTransactionMutation();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(TransactionSchema),
  });
  const [showModal, setShowModal] = useState(false);

  const colorOptions = categories?.map(({ title, id }) => ({
    option: title,
    value: id,
  }));

  const handleCreateTransaction = async (data: TransactionFormData) => {
    try {
      await createTransaction(data).unwrap();
      toast.success("Success!");
      reset();
    } catch (error: unknown) {
      errorHandling(error);
    }
  };

  const handleCreateCategory = async (data: CategoryFormData) => {
    try {
      await createCategory(data).unwrap();
      toast.success("Success!");
    } catch (error: unknown) {
      errorHandling(error);
    }

    setShowModal(false);
  };

  const handleShowModal = () => setShowModal(true);

  return (
    <div className="col-span-2 grid rounded-md bg-slate-800 p-4">
      <form
        className="grid gap-4"
        onSubmit={handleSubmit(handleCreateTransaction)}
      >
        <label className="relative grid" htmlFor="title">
          <span>Title</span>
          <input
            type="text"
            placeholder="Title.."
            className="input bg-slate-700"
            {...register("title")}
          />
          {errors.title && (
            <span className="absolute -bottom-6 left-1/2 mx-auto w-full -translate-x-1/2 text-center text-red-500">
              {errors.title.message}
            </span>
          )}
        </label>

        <label className="relative grid" htmlFor="amount">
          <span>Amount</span>
          <input
            type="number"
            placeholder="Amount.."
            className="input bg-slate-700"
            {...register("amount")}
          />
          {errors.amount && (
            <span className="absolute -bottom-6 left-1/2 mx-auto w-full -translate-x-1/2 text-center text-red-500">
              {errors.amount.message}
            </span>
          )}
        </label>

        {categories &&
          (colorOptions?.length ? (
            <Select
              colorOptions={colorOptions}
              title="Select category"
              {...register("category")}
            />
          ) : (
            <h1 className="my-4 text-red-500">
              To continue create a category first
            </h1>
          ))}

        <button
          type="button"
          className="flex max-w-fit items-center gap-2 text-white/50 hover:text-white"
          onClick={handleShowModal}
        >
          <FaPlus />
          <span>Manage Categories: </span>
        </button>

        <div className="relative mt-4 flex items-center gap-4">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              value="income"
              className="form-radio text-blue-600"
              {...register("type")}
            />
            <span>Income</span>
          </label>
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              value="expense"
              className="form-radio text-blue-600"
              {...register("type")}
            />
            <span>Expense</span>
          </label>
          {errors.type && (
            <span className="absolute -bottom-6 left-1/2 mx-auto w-full -translate-x-1/2 text-center text-red-500">
              {errors.type.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-green mt-2 max-w-fit"
        >
          Submit
        </button>
      </form>

      {showModal && (
        <CategoryCreateModal
          onSubmit={handleCreateCategory}
          setVisibleModel={setShowModal}
        />
      )}
    </div>
  );
};
