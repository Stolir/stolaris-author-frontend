import TypewriterQuote from "@/components/TypewriterQuote/TypewriterQuote";
import styles from "./EngagementsPage.module.css";
import { useEffect, useMemo, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import { deleteComment, getAllComments } from "@/lib/serverRequests";
import CommentCard from "@/components/CommentCard/CommentCard";
import { useOutletContext } from "react-router";
import AlertBox from "@/components/AlertBox/AlertBox";
import ScrollToTopButton from "@/components/ScrollToTopButton/ScrollToTopButton";

function EngagementsPage() {
  const [comments, setComments] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { searchQuery } = useOutletContext();

  useEffect(() => {
    (async () => {
      const allComments = await getAllComments(setError);
      if (allComments) {
        return setComments(allComments);
      } else {
        setError("Unable to get user comments. Please try again later.");
      }
    })();
    setLoading(false);
  }, []);

  async function removeComment(id) {
    const isDeleted = await deleteComment(id, setError);
    if (isDeleted) {
      setComments((prev) => prev.filter((c) => c.id !== id));
    }
  }

  const searchedComments = useMemo(() => {
    if (searchQuery) {
      return comments.filter((c) =>
        c.content.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }
    return comments;
  }, [searchQuery, comments]);

  return (
    <>
      {error && (
        <AlertBox type={"error"} onClose={() => setError(null)}>
          {error}
        </AlertBox>
      )}
      {loading && <LoadingSpinner />}
      <ScrollToTopButton />
      <section className={styles.engagementsContainer}>
        <p>User Engagements</p>
        <section className={styles.topBar}>
          <h1>Comments</h1>
        </section>
        <section className={styles.commentsContainer}>
          {loading && <p>Loading Comments...</p>}
          {searchedComments?.length > 0 ? (
            <>
              {searchedComments.map((comment) => (
                <CommentCard
                  key={comment.id}
                  comment={comment}
                  onDelete={removeComment}
                />
              ))}
            </>
          ) : (
            <p>No comments available.</p>
          )}
        </section>
      </section>
    </>
  );
}

export default EngagementsPage;
