import { useState } from "react";
import styles from "./ExpandableText.module.css";

function ExpandableText({ id, text, wordLimit = 36 }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const splittedText = text.split(" ");
  const canOverflow = splittedText.length > wordLimit;
  const visibleText =
    splittedText.length > wordLimit
      ? splittedText.slice(0, wordLimit - 1).join(" ")
      : text;
  const hiddenText = splittedText
    .slice(wordLimit - 1, splittedText.length - 1)
    .join(" ");

  return (
    <>
      <p id={id}>
        {visibleText}
        {canOverflow && !isExpanded && <span>...</span>}
        {canOverflow && isExpanded && " " + hiddenText}
      </p>
      {canOverflow && (
        <button
          className={styles.readMoreBtn}
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Show Less" : "Show More"}
        </button>
      )}
    </>
  );
}

export default ExpandableText;
