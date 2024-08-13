import { FC } from "react";
import {
  Loading,
  TransactionsForm,
  TransactionsStatistics,
  TransactionItems,
} from "../components";
import { useGetAllTransactionsQuery } from "../app/services/transactions";

export const Transaction: FC = () => {
  const { data: transactions, isLoading } = useGetAllTransactionsQuery();

  if (isLoading || !transactions) return <Loading />;

  return (
    <>
      <div className="mt-4 grid grid-cols-1 items-start gap-4 sm:grid-cols-2 md:grid-cols-3">
        <TransactionsForm />

        <TransactionsStatistics />
      </div>

      <TransactionItems transactions={transactions} />
    </>
  );
};
