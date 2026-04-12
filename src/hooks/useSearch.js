import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

export function useSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setSearchError(null);
      return;
    }
    // debounce search
    const timeout = setTimeout(async () => {
      try {
        const response = await fetch(`/api/articles/search?q=${searchQuery}`, {
          credentials: "include",
        });

        if (response.status === 401) {
          logout();
          navigate("/"); // session expired log user out
          return;
        }

        if (!response.ok) {
          setSearchError("Search failed, please try again.");
          setSearchResults([]);
          return;
        }
        const data = response.json();
        setSearchResults(data);
        setSearchError(null);
      } catch {
        setSearchError("Network error, please try again");
        setSearchResults([]);
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchQuery]);

  return { searchQuery, setSearchQuery, searchResults, searchError };
}
