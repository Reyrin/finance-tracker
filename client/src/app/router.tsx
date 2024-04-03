import { createBrowserRouter } from "react-router-dom";

import { ErrorPage } from "../pages/ErrorPage";
import {
  Categories,
  Home,
  Login,
  PrivateLayout,
  Registration,
  Transaction,
} from "../pages";

export const router = createBrowserRouter([
  { path: "login", element: <Login /> },
  { path: "registration", element: <Registration /> },
  {
    path: "/",
    element: <PrivateLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "categories", element: <Categories /> },
      { path: "transactions", element: <Transaction /> },
    ],
  },
]);
