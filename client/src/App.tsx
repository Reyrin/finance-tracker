import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";
import { AuthGuard } from "./components";

export default function App() {
  return (
    <AuthGuard>
      <RouterProvider router={router} />
    </AuthGuard>
  );
}
