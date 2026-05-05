import { formatDateLocal } from "@/lib/utils";
import styles from "./ArticleTable.module.css";
import { Link } from "react-router";
import {
  FastArrowLeft,
  FastArrowRight,
  MoreHoriz,
  NavArrowLeft,
  NavArrowRight,
} from "iconoir-react";
import { useEffect, useState } from "react";
import ArticleTableOptions from "../ArticleTableOptions/ArticleTableOptions";
import ConfirmPopup from "../ConfirmPopup/ConfirmPopup";

function ArticleTable({ data, currentFilter, onStatusChange, onDelete }) {
  const ITEMS_PER_PAGE = 5;
  const MAX_PAGES_DISPLAYED = 5;

  const [articles, setArticles] = useState(data);
  const [pageInfo, setPageInfo] = useState({
    totalPages: articles.length / ITEMS_PER_PAGE,
    currentPage: 1,
    pageArray: [],
  });

  // Apply article filters and per page limits

  useEffect(() => {
    setArticles(data);
  }, [data]);

  const filteredArticles = currentFilter
    ? articles.filter((a) => a.status === currentFilter)
    : articles;

  const paginatedArticles = filteredArticles.slice(
    (pageInfo.currentPage - 1) * ITEMS_PER_PAGE,
    pageInfo.currentPage * ITEMS_PER_PAGE,
  );
  useEffect(() => {
    const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);

    const pageArray = Array.from({ length: totalPages }, (_, i) => i + 1);
    setPageInfo((prev) => ({
      ...prev,
      totalPages,
      pageArray,
      currentPage: Math.min(prev.currentPage, totalPages || 1),
    }));
  }, [articles, currentFilter]);

  const [menuState, setMenuState] = useState({
    open: false,
    x: 0,
    y: 0,
    item: null,
  });

  // Open and close options menu
  function handleOpenMenu(e, item) {
    e.stopPropagation();

    const rect = e.currentTarget.getBoundingClientRect();

    setMenuState({
      open: true,
      x: rect.left,
      y: rect.bottom,
      item,
    });
  }

  function handleCloseMenu() {
    setMenuState((prev) => ({ ...prev, open: false }));
  }

  // State and functions for the actions within the options menu
  const [confirmPopupOpt, setConfirmPopupOpt] = useState({
    shown: false,
    onConfirm: null,
  });

  async function cancelChoiceHandler() {
    setConfirmPopupOpt({ shown: false, onConfirm: null });
  }

  // Immediately remove from view when delete response is successful
  function removeArticle(id) {
    onDelete(id);
  }

  // Immediately update status when backend response is successful
  function changeArticleStatus(id, status) {
    onStatusChange(id, status);
  }

  // Close menu when clicking anywhere
  useEffect(() => {
    function handleClick(e) {
      handleCloseMenu();
    }

    if (menuState.open) {
      document.addEventListener("click", handleClick);
    }

    return () => document.removeEventListener("click", handleClick);
  }, [menuState.open]);

  function setCurrentPage(page) {
    setPageInfo((prev) => ({ ...prev, currentPage: page }));
  }

  function goPrevPage() {
    if (pageInfo.currentPage > 1) {
      setPageInfo((prev) => ({ ...prev, currentPage: prev.currentPage - 1 }));
    }
  }

  function goNextPage() {
    if (pageInfo.currentPage < pageInfo.totalPages) {
      setPageInfo((prev) => ({ ...prev, currentPage: prev.currentPage + 1 }));
    }
  }

  function goLastPage(direction) {
    if (direction === "left") {
      setPageInfo((prev) => ({ ...prev, currentPage: 1 }));
    }
    if (direction === "right") {
      setPageInfo((prev) => ({ ...prev, currentPage: prev.totalPages }));
    }
  }

  function getResultText() {
    if (pageInfo.totalPages < 2) {
      return `Showing ${paginatedArticles.length} results`;
    } else {
      if (pageInfo.currentPage === pageInfo.totalPages) {
        return `Showing ${1 + ITEMS_PER_PAGE * (pageInfo.currentPage - 1)} to ${filteredArticles.length} of ${filteredArticles.length} results`;
      } else {
        return `Showing ${1 + ITEMS_PER_PAGE * (pageInfo.currentPage - 1)} to ${paginatedArticles.length * pageInfo.currentPage} of ${filteredArticles.length} results`;
      }
    }
  }

  const resultCountText = getResultText();

  let pageIncrement = 0;
  pageInfo.currentPage > MAX_PAGES_DISPLAYED
    ? (pageIncrement = pageInfo.currentPage - MAX_PAGES_DISPLAYED)
    : 0;
  return (
    <>
      {confirmPopupOpt.shown && (
        <ConfirmPopup
          onConfirm={confirmPopupOpt.onConfirm}
          onClose={cancelChoiceHandler}
        >
          Are you sure you want to delete this article?
        </ConfirmPopup>
      )}
      <table className={styles.articleTable}>
        <thead>
          <tr>
            <th>Article Title</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Last updated</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {paginatedArticles.map((article) => (
            <tr key={article.id}>
              <th scope="row">
                <Link to={`/author/editor/${article.id}`}>{article.title}</Link>
              </th>
              <td>
                <span
                  className={`${styles[article.status]} ${styles.articleStatus}`}
                >
                  {article.status}
                </span>
              </td>
              <td>{formatDateLocal(article.createdAt)}</td>
              <td>{formatDateLocal(article.lastUpdated)}</td>
              <td>
                <button
                  className={styles.articleControls}
                  onClick={(e) => handleOpenMenu(e, article)}
                >
                  <MoreHoriz />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>{resultCountText}</td>
            <td colSpan={4}>
              <div className={styles.pageControls}>
                <button
                  disabled={pageInfo.currentPage <= 1}
                  onClick={() => goLastPage("left")}
                  aria-label="go to first page"
                >
                  <FastArrowLeft />
                </button>
                <button
                  disabled={pageInfo.currentPage <= 1}
                  onClick={goPrevPage}
                  aria-label="go to next page"
                >
                  <NavArrowLeft />
                </button>
                {pageInfo.pageArray
                  .slice(0 + pageIncrement, MAX_PAGES_DISPLAYED + pageIncrement)
                  .map((page) => (
                    <button
                      key={`p${page}`}
                      className={
                        page === pageInfo.currentPage ? styles.current : ""
                      }
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                <button
                  disabled={pageInfo.currentPage >= pageInfo.totalPages}
                  onClick={goNextPage}
                  aria-label="go to previous page"
                >
                  <NavArrowRight />
                </button>
                <button
                  disabled={pageInfo.currentPage >= pageInfo.totalPages}
                  onClick={() => goLastPage("right")}
                  aria-label="go to last page"
                >
                  <FastArrowRight />
                </button>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
      {menuState.open && (
        <ArticleTableOptions
          article={menuState.item}
          position={{ x: menuState.x, y: menuState.y }}
          setConfirmPopupOpt={setConfirmPopupOpt}
          removeArticle={removeArticle}
          changeArticleStatus={changeArticleStatus}
        />
      )}
    </>
  );
}

export default ArticleTable;
