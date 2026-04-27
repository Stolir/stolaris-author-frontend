import { useEffect, useState } from "react";
import styles from "./EditorDraftButton.module.css";
import AlertBox from "../AlertBox/AlertBox";
import { useNavigate } from "react-router";
import { saveAsDraft } from "@/lib/serverRequests";

function EditorDraftButton({ editor }) {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function onClick(editor) {
    const article = await saveAsDraft(editor, setError);
    if (article) {
      navigate("/author/dashboard");
    }
  }

  return (
    <>
      {error && <AlertBox onClose={() => setError(null)}>{error}</AlertBox>}
      <button className={styles.draftButton} onClick={() => onClick(editor)}>
        Save as draft
      </button>
    </>
  );
}

export default EditorDraftButton;
