import { createBrowserRouter } from "react-router";
import App from "./App";
import RoutingError from "./components/RoutingError/RoutingError";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <RoutingError />,
  },
]);
