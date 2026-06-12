import { formatDateLocal } from "@/lib/utils";
import styles from "./CommentCard.module.css";
import ExpandableText from "../ExpandableText/ExpandableText";
import { deleteComment } from "@/lib/serverRequests";
import ConfirmPopup from "../ConfirmPopup/ConfirmPopup";
import { useState } from "react";

function CommentCard({ comment, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const date = formatDateLocal(comment.createdAt);
  return (
    <>
      {showConfirm && (
        <ConfirmPopup
          isOpen={showConfirm}
          onClose={() => setShowConfirm(false)}
          onConfirm={() => onDelete(comment.id)}
        >
          Are you sure you want to delete this comment? This action cannot be
          reversed.
        </ConfirmPopup>
      )}
      <article className={styles.commentContainer}>
        <div className={styles.commentInformation}>
          <div className={styles.userInfoDateContainer}>
            <p className={styles.userInfo}>
              <span>{comment.user ? comment.user.username : "Anonymous"}</span>{" "}
              {comment.parent ? (
                <>
                  replied to{" "}
                  <span>
                    {comment.parent.user
                      ? comment.parent.user.username
                      : "Anonymous"}
                  </span>{" "}
                  on
                </>
              ) : (
                "commented on"
              )}
            </p>
            <p className={styles.commentDate}>{date}</p>
          </div>
          <p className={styles.articleInfo}>{comment.article?.title}</p>
        </div>
        <div className={styles.commentContent}>
          <ExpandableText id={comment.id} text={comment.content} />
        </div>
        <button
          className={styles.removeCommentBtn}
          onClick={() => setShowConfirm(true)}
        >
          Delete Comment
        </button>
      </article>
    </>
  );
}

export default CommentCard;
