import { FC } from "react";
import {
  Loading,
  TransactionsForm,
  TransactionsStatistics,
  TransactionTable,
} from "../components";
import { useGetAllTransactionsQuery } from "../app/services/transactions";

export const Transaction: FC = () => {
  const { data: transactions, isLoading } = useGetAllTransactionsQuery();

  if (isLoading || !transactions) return <Loading />;

  return (
    <>
      <div className="mt-4 grid grid-cols-3 items-start gap-4">
        <TransactionsForm />

        <TransactionsStatistics />
      </div>

      <TransactionTable transactions={transactions} />
    </>
  );
};
