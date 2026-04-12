import { createBrowserRouter } from "react-router";
import App from "./App";
import RoutingError from "./components/RoutingError/RoutingError";
import LoginPage from "./pages/LoginPage/LoginPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import { userLoader } from "./loaders/userLoader";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import EditorPage from "./pages/EditorPage/EditorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <RoutingError />,
    loader: userLoader,
    HydrateFallback: LoadingSpinner,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: "/author/dashboard",
        element: <DashboardPage />,
        children: [
          {
            path: "library",
            element: <p>HI</p>,
          },
        ],
      },
      {
        path: "/author/editor",
        element: <EditorPage />,
      },
    ],
  },
]);
