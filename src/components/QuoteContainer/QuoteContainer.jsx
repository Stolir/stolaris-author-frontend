import styles from "./QuoteContainer.module.css";

function QuoteContainer({ quote, author }) {
  return (
    <div className={styles.quoteContainer}>
      <p>{quote}</p>
      <span>― {author}</span>
    </div>
  );
}

export default QuoteContainer;
