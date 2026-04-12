import { LogOut } from "iconoir-react";
import styles from "./LogoutButton.module.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";

function LogoutButton() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await fetch("/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    logout();
    navigate("/");
  }

  return (
    <button
      onClick={handleLogout}
      className={styles.button}
      aria-label="logout"
    >
      <LogOut className={styles.svg} />
    </button>
  );
}

export default LogoutButton;
