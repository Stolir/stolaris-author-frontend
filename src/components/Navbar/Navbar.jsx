import { Link } from "react-router";
import styles from "./Navbar.module.css";
import LogoutButton from "../LogoutButton/LogoutButton";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { user } = useAuth();

  if (!user) {
    return (
      <header className={styles.navbar}>
        <Link to="/" className={`${styles.logo}`}>
          <p>
            AA<span>.</span> Author
          </p>
        </Link>
      </header>
    );
  }

  return <header></header>;
}

export default Navbar;
