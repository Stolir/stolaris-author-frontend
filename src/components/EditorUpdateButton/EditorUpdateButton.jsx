import { useNavigate } from "react-router";
import styles from "./EditorUpdateButton.module.css";
import { useState } from "react";
import { saveExistingArticle } from "@/lib/serverRequests";
import AlertBox from "../AlertBox/AlertBox";

function EditorUpdateButton({ id, editor }) {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function onClick() {
    const article = await saveExistingArticle(id, editor, setError);
    if (article) {
      navigate("/author/dashboard");
    }
  }

  return (
    <>
      {error && <AlertBox onClose={() => setError(null)}>{error}</AlertBox>}
      <button className={styles.updateButton} onClick={() => onClick()}>
        Save
      </button>
    </>
  );
}

export default EditorUpdateButton;
