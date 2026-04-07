import { useAuth } from "../../context/AuthContext";
import styles from "./DashboardPage.module.css";

function DashboardPage() {
  const { user, logout } = useAuth();

  return <h1>Welcome, {user.name} </h1>;
}

export default DashboardPage;
