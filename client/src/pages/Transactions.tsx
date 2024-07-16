import { FC } from "react";
import { Spinner, TransactionsForm } from "../components";
import {
  useCreateTransactionMutation,
  useGetAllTransactionsQuery,
} from "../app/services/transactions";
import { TransactionFormData } from "../app/types";
import { toast } from "react-toastify";
import { errorHandling } from "../utils";

export const Transaction: FC = () => {
  const { data: transactions, isLoading } = useGetAllTransactionsQuery();
  const [createTransaction] = useCreateTransactionMutation();

  if (isLoading) return <Spinner />;

  console.log(111, { transactions });

  const handleCreate = async (data: TransactionFormData) => {
    try {
      await createTransaction(data).unwrap();
      toast.success("Success!");
    } catch (error: unknown) {
      errorHandling(error);
    }
  };

  return (
    <>
      <div className="mt-4 grid grid-cols-3 items-start gap-4">
        <div className="col-span-2 grid">
          <TransactionsForm onSubmit={handleCreate} />
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
