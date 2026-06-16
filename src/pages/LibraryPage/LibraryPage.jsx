import { useLoaderData, useOutletContext } from "react-router";
import styles from "./LibraryPage.module.css";
import ArticleTable from "@/components/ArticleTable/ArticleTable";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

function LibraryPage() {
  const { logout } = useAuth();
  const data = useLoaderData();

  if (!data) {
    logout();
  }

  const [articles, setArticles] = useState(data);
  if (!articles) {
    logout();
  }
  const { searchQuery } = useOutletContext();
  const [currentFilter, setCurrentFilter] = useState(null);
  const filters = [
    { value: null, displayText: "ALL ARTICLES" },
    { value: "PUBLISHED", displayText: "PUBLISHED" },
    { value: "UNPUBLISHED", displayText: "UNPUBLISHED" },
    { value: "DRAFT", displayText: "DRAFTS" },
    { value: "ARCHIVED", displayText: "ARCHIVED" },
  ];

  const searchedArticles = searchQuery
    ? articles.filter((article) =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : articles;

  function handleStatusChange(id, status) {
    setArticles((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item)),
    );
  }

  function handleDelete(id) {
    setArticles((prev) => prev.filter((article) => article.id !== id));
  }

  return (
    <div className={styles.libraryWrapper}>
      <p>Article Collection</p>
      <section className={styles.topBar}>
        <h1>Content Library</h1>
        {articles.length > 0 && (
          <div className={styles.filtersWrapper}>
            {filters.map((filter) => (
              <button
                key={filter.displayText}
                onClick={() => setCurrentFilter(filter.value)}
                className={
                  currentFilter === filter.value ? styles.selected : ""
                }
              >
                {filter.displayText}
              </button>
            ))}
          </div>
        )}
      </section>
      <section className={styles.articlesWrapper}>
        {articles.length > 0 ? (
          <ArticleTable
            data={searchedArticles}
            currentFilter={currentFilter}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
          />
        ) : (
          <p>
            You have not written any articles yet. Press "Create New Article" on
            the sidebar to start!
          </p>
        )}
      </section>
    </div>
  );
}

export default LibraryPage;
