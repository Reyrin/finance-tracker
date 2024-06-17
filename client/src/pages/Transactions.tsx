import { FC } from "react";
import { TransactionsForm } from "../components";

export const Transaction: FC = () => {
  return (
    <>
      <div className="mt-4 grid grid-cols-3 items-start gap-4">
        <div className="col-span-2 grid">
          <TransactionsForm />
        </div>

        <div className="rounded-md bg-slate-800 p-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-md text-center font-bold uppercase">
                Total Income:
              </p>
              <p className="mt-2 rounded-sm bg-green-600 p-1 text-center">
                123
              </p>
            </div>
            <div>
              <p className="text-md text-center font-bold uppercase">
                Total Expense:
              </p>
              <p className="mt-2 rounded-sm bg-red-500 p-1 text-center">321</p>
            </div>
          </div>
        </div>
      </div>

      <h1 className="my-5">TransactionTable</h1>
    </>
  );
};
