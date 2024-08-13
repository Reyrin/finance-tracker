import { FC } from "react";
import { FaTrash } from "react-icons/fa";
import { Transaction } from "../app/types";
import { transformDate, transformToUsd } from "../utils";
import { colors } from "../app/constants";

interface Props {
  transactions: Transaction[];
  deleteTransaction: (transactionId: number) => Promise<void>;
}

export const TransactionCards: FC<Props> = ({
  transactions,
  deleteTransaction,
}) => {
  return (
    <div className="flex flex-wrap gap-5">
      {transactions.map(
        ({ id, title, type, amount, category, createdAt }, index) => {
          const onDelete = () => deleteTransaction(id);
          const colorClass = `text-${colors[category?.color] || colors.default}`;

          return (
            <div
              key={id}
              className="relative flex w-full flex-col rounded-md border border-primaryColor p-2 pt-8 text-base font-medium sm:w-[calc(50%-10px)]"
            >
              <p className="flex justify-between">
                <span>№</span>
                <span>{index + 1}</span>
              </p>
              <p className="flex justify-between">
                <span>Title</span>
                <span>{title}</span>
              </p>
              <p className="flex justify-between">
                <span>Amount($)</span>
                <span
                  className={
                    type === "income" ? "text-green-500" : "text-red-500"
                  }
                >
                  {type === "income"
                    ? `+ ${transformToUsd.format(amount)}`
                    : `- ${transformToUsd.format(amount)}`}
                </span>
              </p>
              <p className="flex justify-between">
                <span>Category</span>
                <span className={colorClass}>{category?.title || "Other"}</span>
              </p>
              <p className="flex justify-between">
                <span>Date</span>
                <span>{transformDate(createdAt)}</span>
              </p>
              <button
                className="btn hover:btn-red absolute right-0 top-0 p-2"
                onClick={onDelete}
              >
                <FaTrash size={15} />
              </button>
            </div>
          );
        },
      )}
    </div>
  );
};
