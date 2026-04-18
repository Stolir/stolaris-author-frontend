import { useEffect, useState } from "react";
import styles from "./EditorDraftButton.module.css";
import AlertBox from "../AlertBox/AlertBox";

function EditorDraftButton({ editor }) {
  const [error, setError] = useState(null);

  async function onClick(editor) {
    setError(null);
    const doc = editor.getJSON();
    console.log(doc);
    const firstHeading = doc.content.find((block) => block.type === "heading");
    if (!firstHeading) {
      setError("You must at least include one heading in the article");
      return;
    }
    const title = firstHeading.content[0].text;

    console.log(title);
    try {
      const response = await fetch("/api/author/articles", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title,
          content: doc.content,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        if (data.errors) {
          setError(data.errors.map((error) => error.msg)); // Input validation errors
        } else {
          setError(data.message); // Auth/Server errors
        }
        return;
      }
      console.log(data);
    } catch (err) {
      setError(err);
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
