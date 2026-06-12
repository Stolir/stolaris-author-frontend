import { getReadTime } from "./utils";

export async function saveAsDraft(editor, setError) {
  setError(null);
  const doc = editor.getJSON();
  const firstHeading = doc.content.find((block) => block.type === "heading");
  if (!firstHeading || !firstHeading.content) {
    setError("You must include at least one heading in the article");
    return;
  }
  const title = firstHeading.content[0].text;
  const readTime = getReadTime(editor);
  try {
    const response = await fetch("/api/author/articles", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
        content: doc,
        readTime: readTime,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      if (data.errors) {
        setError(data.errors.map((error) => error.msg)); // Input validation errors
      } else {
        setError(data.message); // Auth/Server errors
      }
      return;
    }
    return data;
  } catch (err) {
    setError(err);
  }
}

export async function updateArticleStatus(articleId, action, setError) {
  try {
    const response = await fetch(
      `/api/author/articles/${articleId}/${action}`,
      {
        method: "POST",
        credentials: "include",
      },
    );
    const data = await response.json();
    if (!response.ok) {
      setError(data.message);
      return;
    }
    return data;
  } catch (err) {
    setError(err);
  }
}

export async function getArticle(id, setError) {
  try {
    const response = await fetch(`/api/author/articles/${id}`, {
      credentials: "include",
    });
    const data = await response.json();
    if (!response.ok) {
      setError(data.message);
      return;
    }
    return data;
  } catch (err) {
    setError(err);
  }
}

export async function saveExistingArticle(articleId, editor, setError) {
  setError(null);
  const doc = editor.getJSON();
  const firstHeading = doc.content.find((block) => block.type === "heading");
  if (!firstHeading || !firstHeading.content) {
    setError("You must include at least one heading in the article");
    return;
  }
  const title = firstHeading.content[0].text;
  const readTime = getReadTime(editor);
  try {
    const response = await fetch(`/api/author/articles/${articleId}`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
        content: doc,
        readTime,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      if (data.errors) {
        setError(data.errors.map((error) => error.msg)); // Input validation errors
      } else {
        setError(data.message); // Auth/Server errors
      }
      return;
    }
    return data;
  } catch (err) {
    setError(err);
  }
}

export async function getUser() {
  try {
    const response = await fetch("/auth/me", {
      credentials: "include",
    });
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    return data?.user;
  } catch (err) {
    return null;
  }
}

export async function getAllComments(setError) {
  try {
    const response = await fetch("/api/comments");
    const data = await response.json();
    if (!response.ok) {
      setError(data);
      return;
    }
    return data;
  } catch {
    setError("A network error has occurred. Please try again later.");
  }
}

export async function deleteComment(id, setError) {
  try {
    const response = await fetch(`/api/comments/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!response.ok) {
      const data = await response.json();
      setError(data.message);
      return;
    }
    return true;
  } catch {
    setError("A network error has occurred. Please try again later.");
  }
}
