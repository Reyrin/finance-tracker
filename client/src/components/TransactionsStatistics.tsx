import { FC } from "react";
import { useGetStatisticsQuery } from "../app/services/transactions";
import { transformToUsd } from "../utils";

export const TransactionsStatistics: FC = () => {
  const { data: statistics } = useGetStatisticsQuery();
  const totalIncome = statistics?.totalIncome ?? 0;
  const totalExpense = statistics?.totalExpense ?? 0;

  return (
    <div className="rounded-md bg-slate-800 p-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-md text-center font-bold uppercase">
            Total Income:
          </p>
          <p className="mt-2 rounded-sm bg-green-600 p-1 text-center">
            {transformToUsd.format(totalIncome)}
          </p>
        </div>
        <div>
          <p className="text-md text-center font-bold uppercase">
            Total Expense:
          </p>
          <p className="mt-2 rounded-sm bg-red-500 p-1 text-center">
            {transformToUsd.format(totalExpense)}
          </p>
        </div>
      </div>
    </div>
  );
};
