import { FC } from "react";
import { FaTrash } from "react-icons/fa";
import { Transaction } from "../app/types";
import { errorHandling, transformDate, transformToUsd } from "../utils";
import { toast } from "react-toastify";
import { useDeleteTransactionMutation } from "../app/services/transactions";
import { colors } from "../app/constants";

interface Props {
  transactions: Transaction[];
}

export const TransactionTable: FC<Props> = ({ transactions }) => {
  const [deleteTransaction] = useDeleteTransactionMutation();

  const handleDeleteTransaction = async (transactionId: number) => {
    try {
      await deleteTransaction(transactionId).unwrap();
      toast.success("Success!");
    } catch (error: unknown) {
      errorHandling(error);
    }
  };

  return (
    <div className="mt-4 rounded-md bg-slate-800 px-4 py-3">
      <table className="w-full">
        <thead>
          <tr>
            <td className="font-bold">№</td>
            <td className="font-bold">Title</td>
            <td className="font-bold">Amount($)</td>
            <td className="font-bold">Category</td>
            <td className="font-bold">Date</td>
            <td className="text-right font-bold">Action</td>
          </tr>
        </thead>
        <tbody>
          {transactions.map(
            ({ id, title, type, amount, category, createdAt }, index) => {
              const onDelete = () => handleDeleteTransaction(id);
              const colorClass = `text-${colors[category?.color] || colors.default}`;

              return (
                <tr key={id}>
                  <td>{index + 1}</td>
                  <td>{title}</td>
                  <td
                    className={
                      type === "income" ? "text-green-500" : "text-red-500"
                    }
                  >
                    {type === "income"
                      ? `+ ${transformToUsd.format(amount)}`
                      : `- ${transformToUsd.format(amount)}`}
                  </td>
                  <td className={colorClass}>{category?.title || "Other"}</td>
                  <td>{transformDate(createdAt)}</td>
                  <td>
                    <button
                      className="btn hover:btn-red ml-auto"
                      onClick={onDelete}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              );
            },
          )}
        </tbody>
      </table>
    </div>
  );
};
