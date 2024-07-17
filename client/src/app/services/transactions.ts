import { api } from "./api";
import { Statistics, Transaction, TransactionFormData } from "../types";

const transactionsApiWithTag = api.enhanceEndpoints({
  addTagTypes: ["getAllTransactions"],
});

export const transactionsApi = transactionsApiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    createTransaction: builder.mutation<Transaction, TransactionFormData>({
      query: (data) => ({
        url: "transactions",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getAllTransactions"],
    }),
    getAllTransactions: builder.query<Transaction[], void>({
      query: () => ({
        url: "transactions",
        method: "GET",
      }),
      providesTags: () => ["getAllTransactions"],
    }),
    deleteTransaction: builder.mutation<void, number>({
      query: (transactionId) => ({
        url: `transactions/${transactionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getAllTransactions"],
    }),
    getStatistics: builder.query<Statistics, void>({
      query: () => ({
        url: "transactions/statistics",
        method: "GET",
      }),
      providesTags: () => ["getAllTransactions"],
    }),
  }),
});

export const {
  useGetAllTransactionsQuery,
  useCreateTransactionMutation,
  useDeleteTransactionMutation,
  useGetStatisticsQuery,
} = transactionsApi;
