import { useNavigate } from "react-router";
import styles from "./HomeButton.module.css";
import { HomeSimple } from "iconoir-react";

function HomeButton() {
  const navigate = useNavigate();

  function onClick() {
    const confirmed = confirm(
      "You have unsaved progress. Are you sure you want to leave?",
    );
    if (confirmed) {
      navigate("/");
    }
  }

  return (
    <button
      aria-label="go to home page"
      className={`${styles.homeButton} tiptap-button`}
      onClick={() => onClick()}
    >
      <HomeSimple />
    </button>
  );
}

export default HomeButton;
