import { FC } from "react";
import { useGetStatisticsQuery } from "../app/services/transactions";
import { Chart, TotalAmount } from ".";

export const TransactionsStatistics: FC = () => {
  const { data: statistics } = useGetStatisticsQuery();
  const totalIncome = statistics?.totalIncome ?? 0;
  const totalExpense = statistics?.totalExpense ?? 0;

  return (
    <div className="flex h-full flex-col justify-around rounded-md bg-slate-800 p-4">
      <TotalAmount totalIncome={totalIncome} totalExpense={totalExpense} />

      <Chart totalIncome={totalIncome} totalExpense={totalExpense} />
    </div>
  );
};
