import { useState } from "react";
import styles from "./ArticleTableOptions.module.css";
import AlertBox from "../AlertBox/AlertBox";
import ConfirmPopup from "../ConfirmPopup/ConfirmPopup";
import { updateArticleStatus } from "@/lib/serverRequests";

function ArticleTableOptions({
  article,
  position,
  setConfirmPopupOpt,
  removeArticle,
  changeArticleStatus,
}) {
  const [error, setError] = useState(null);

  async function showConfirmHandler(callback) {
    setConfirmPopupOpt({ shown: true, onConfirm: callback });
  }

  async function deleteArticle(articleId) {
    try {
      const response = await fetch(`/api/author/articles/${articleId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) {
        const data = await response.json();
        setError(data?.message || "Delete Failed");
        return;
      }
      removeArticle(articleId);
      setConfirmPopupOpt({ shown: false, onConfirm: null });
    } catch (err) {
      setError(err.message || "Network error");
    }
  }

  async function changeStatusHandler(articleId, action) {
    const article = await updateArticleStatus(articleId, action);
    changeArticleStatus(articleId, article.status);
  }

  const statuses = [
    { name: "PUBLISHED", displayText: "Publish", action: "publish" },
    { name: "UNPUBLISHED", displayText: "Unpublish", action: "unpublish" },
    { name: "DRAFT", displayText: "Draft", action: "draft" },
    { name: "ARCHIVED", displayText: "Archive", action: "archive" },
  ];

  return (
    <>
      {error && <AlertBox onClose={() => setError(null)}>{error}</AlertBox>}
      <ul
        style={{ position: "absolute", top: position.y, left: position.x }}
        className={styles.optionMenu}
      >
        {statuses.map((status) => {
          if (status.name === "UNPUBLISHED" && article.status !== "PUBLISHED") {
            return null;
          }
          if (article.status != status.name) {
            return (
              <li key={status.name}>
                <button
                  onClick={() => changeStatusHandler(article.id, status.action)}
                >
                  {status.displayText}
                </button>
              </li>
            );
          }
        })}

        <li>
          <button
            type="button"
            onClick={() => {
              showConfirmHandler(() => deleteArticle(article.id));
            }}
          >
            Delete
          </button>
        </li>
      </ul>
    </>
  );
}

export default ArticleTableOptions;
