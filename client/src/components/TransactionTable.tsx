import { FC } from "react";
import { FaTrash } from "react-icons/fa";
import { Transaction } from "../app/types";
import { transformDate, transformToUsd } from "../utils";
import { colors } from "../app/constants";

interface Props {
  transactions: Transaction[];
  deleteTransaction: (transactionId: number) => Promise<void>;
}

export const TransactionTable: FC<Props> = ({
  transactions,
  deleteTransaction,
}) => {
  return (
    <table className="w-full">
      <thead>
        <tr className="font-bold">
          <td>№</td>
          <td>Title</td>
          <td>Amount($)</td>
          <td>Category</td>
          <td>Date</td>
          <td className="text-right">Action</td>
        </tr>
      </thead>
      <tbody>
        {transactions.map(
          ({ id, title, type, amount, category, createdAt }, index) => {
            const onDelete = () => deleteTransaction(id);
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
  );
};
