import { useEffect, useState } from "react";
import styles from "./TypewriterQuote.module.css";

function TypewriterQuote({ fullQuote, fullAuthor }) {
  const [quote, setQuote] = useState("");
  const [showAuthor, setShowAuthor] = useState(false);

  useEffect(() => {
    setQuote("");
    setShowAuthor(false);
  }, [fullQuote, fullAuthor]);

  useEffect(() => {
    if (quote.length < fullQuote.length) {
      const timeout = setTimeout(() => {
        setQuote(fullQuote.slice(0, quote.length + 1));
      }, 40);

      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setShowAuthor(true);
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [quote, fullQuote]);

  return (
    <div className={`${styles.quoteContainer}`}>
      <p
        className={`${styles.quote} ${quote.length < fullQuote.length ? styles.cursor : ""}`}
      >
        {quote}
      </p>
      {fullAuthor && (
        <p
          className={`${styles.author} ${styles.fadeAuthor} ${showAuthor ? styles.visible : ""}`}
        >
          ― {fullAuthor}
        </p>
      )}
    </div>
  );
}

export default TypewriterQuote;
