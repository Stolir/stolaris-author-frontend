import { useNavigate } from "react-router";
import styles from "./EditorPublishButton.module.css";
import { useState } from "react";
import { saveAsDraft, updateArticleStatus } from "@/lib/serverRequests";
import AlertBox from "../AlertBox/AlertBox";

function EditorPublishButton({ editor }) {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function onClick(editor) {
    const article = await saveAsDraft(editor, setError);
    if (article) {
      const updatedArticle = await updateArticleStatus(article.id, "publish");
      if (updatedArticle) {
        navigate("/author/dashboard");
      }
    }
  }

  return (
    <>
      {error && <AlertBox onClose={() => setError(null)}>{error}</AlertBox>}
      <button className={styles.publishButton} onClick={() => onClick(editor)}>
        Publish
      </button>
    </>
  );
}

export default EditorPublishButton;
