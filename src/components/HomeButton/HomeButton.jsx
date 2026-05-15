import { useNavigate } from "react-router";
import styles from "./HomeButton.module.css";
import { HomeSimple } from "iconoir-react";

function HomeButton() {
  const navigate = useNavigate();

  return (
    <button
      aria-label="go to home page"
      className={`${styles.homeButton} tiptap-button`}
      onClick={() => navigate("/")}
    >
      <HomeSimple />
    </button>
  );
}

export default HomeButton;
