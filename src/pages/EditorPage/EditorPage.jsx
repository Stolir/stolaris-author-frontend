import AlertBox from "@/components/AlertBox/AlertBox";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { getArticle } from "@/lib/serverRequests";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

function EditorPage() {
  const navigate = useNavigate();
  const { articleId } = useParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!articleId) {
        setLoading(false);
        return;
      }
      const data = await getArticle(articleId, setError);
      setArticle(data);
      setLoading(false);
    };
    fetchArticle();
  }, [articleId]);

  if (error)
    return (
      <AlertBox
        onClose={() => {
          setError(null);
          navigate("/");
        }}
      >
        {error}
      </AlertBox>
    );

  if (loading) return <LoadingSpinner />;

  return (
    <div id="editor-wrapper">
      {error && (
        <AlertBox
          onClose={() => {
            setError(null);
          }}
        >
          {error}
        </AlertBox>
      )}
      <SimpleEditor article={article} />
    </div>
  );
}

export default EditorPage;
