import { PageUpSolid } from "iconoir-react";
import styles from "./ScrollToTopButton.module.css";
import { useEffect, useState } from "react";

function ScrollToTopButton() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const container = document.getElementById("root");

    function handleScroll() {
      if (container.scrollTop > 100) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    }

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToTop() {
    document.getElementById("root").scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }
  if (showButton)
    return (
      <button className={styles.scrollBtn} onClick={scrollToTop}>
        <PageUpSolid width={40} height={40} />
      </button>
    );
}

export default ScrollToTopButton;
