import { FC } from "react";
import { useMediaQuery } from "react-responsive";
import { Transaction } from "../app/types";
import { errorHandling } from "../utils";
import { toast } from "react-toastify";
import { useDeleteTransactionMutation } from "../app/services/transactions";
import { TransactionCards, TransactionTable } from ".";

interface Props {
  transactions: Transaction[];
}

export const TransactionItems: FC<Props> = ({ transactions }) => {
  const [deleteTransaction] = useDeleteTransactionMutation();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const handleDeleteTransaction = async (transactionId: number) => {
    try {
      await deleteTransaction(transactionId).unwrap();
      toast.success("Success!");
    } catch (error: unknown) {
      errorHandling(error);
    }
  };

  const Component = isTabletOrMobile ? TransactionCards : TransactionTable;

  if (!transactions.length) return;

  return (
    <div className="mt-4 rounded-md bg-secondaryColor px-4 py-3">
      <Component
        transactions={transactions}
        deleteTransaction={handleDeleteTransaction}
      />
    </div>
  );
};
