import { Link } from "react-router";
import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <header>
      <Link to="/" className={`${styles.logo}`}>
        <p>STOLARIS</p>
      </Link>
    </header>
  );
}

export default Navbar;
