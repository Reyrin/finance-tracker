import { FC } from "react";
import { transformToUsd } from "../utils";

interface Props {
  totalIncome: number;
  totalExpense: number;
}

export const TotalAmount: FC<Props> = ({ totalIncome, totalExpense }) => {
  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
      <div>
        <p className="text-md text-center font-bold uppercase">Total Income:</p>
        <p className="mt-2 rounded-sm bg-positiveColor p-1 text-center">
          {transformToUsd.format(totalIncome)}
        </p>
      </div>
      <div>
        <p className="text-md text-center font-bold uppercase">
          Total Expense:
        </p>
        <p className="mt-2 rounded-sm bg-negativeColor p-1 text-center">
          {transformToUsd.format(totalExpense)}
        </p>
      </div>
    </div>
  );
};
