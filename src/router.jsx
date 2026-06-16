import { createBrowserRouter, Navigate } from "react-router";
import App from "./App";
import RoutingError from "./components/RoutingError/RoutingError";
import LoginPage from "./pages/LoginPage/LoginPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import EditorPage from "./pages/EditorPage/EditorPage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import LibraryPage from "./pages/LibraryPage/LibraryPage";
import { articleLoader } from "./loaders/articleLoader";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import EngagementsPage from "./pages/EngagementsPage/EngagementsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <RoutingError />,
    HydrateFallback: LoadingSpinner,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: "/author",
        element: <ProtectedRoute />,
        children: [
          {
            path: "dashboard",
            element: <DashboardPage />,
            children: [
              {
                index: true,
                element: <Navigate to="library" />,
              },
              {
                path: "library",
                element: <LibraryPage />,
                loader: articleLoader,
              },
              {
                path: "engagements",
                element: <EngagementsPage />,
              },
              {
                path: "settings",
                element: <SettingsPage />,
              },
            ],
          },
          {
            path: "editor",
            element: <EditorPage />,
          },
          {
            path: "editor/:articleId",
            element: <EditorPage />,
          },
        ],
      },
    ],
  },
]);
