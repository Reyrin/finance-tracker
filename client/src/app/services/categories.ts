import { api } from "./api";
import { Category, CategoryEditFormData, CategoryFormData } from "../types";

const categoriesApiWithTag = api.enhanceEndpoints({
  addTagTypes: ["GetAllCategory"],
});

export const categoriesApi = categoriesApiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation<Category, CategoryFormData>({
      query: (data) => ({
        url: "categories",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["GetAllCategory"],
    }),
    changeCategory: builder.mutation<void, CategoryEditFormData>({
      query: ({ id, ...patch }) => ({
        url: `categories/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["GetAllCategory"],
    }),
    getAllCategory: builder.query<Category[], void>({
      query: () => ({
        url: "categories",
        method: "GET",
      }),
      providesTags: () => ["GetAllCategory"],
    }),
    deleteCategory: builder.mutation<void, number>({
      query: (categoryId) => ({
        url: `categories/${categoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["GetAllCategory"],
    }),
  }),
});

export const {
  useGetAllCategoryQuery,
  useCreateCategoryMutation,
  useChangeCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;
