import styles from "./LoginPage.module.css";
import LoginForm from "../../components/LoginForm/LoginForm";
import QuoteContainer from "../../components/QuoteContainer/QuoteContainer";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
function LoginPage() {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;
  if (user) return <Navigate to="/author/dashboard" />;

  return (
    <>
      <section className={styles.formSection}>
        <LoginForm />
      </section>
      <section className={styles.quoteSection}>
        <QuoteContainer
          fullQuote="The desire to create is one of the deepest yearnings of the human soul."
          fullAuthor="Dieter F. Uchtdorf"
        />
      </section>
    </>
  );
}

export default LoginPage;
