import styles from "./LoginPage.module.css";
import LoginForm from "../../components/LoginForm/LoginForm";
import QuoteContainer from "../../components/QuoteContainer/QuoteContainer";
function LoginPage() {
  return (
    <>
      <section className={styles.formSection}>
        <LoginForm />
      </section>
      <section className={styles.quoteSection}>
        <QuoteContainer
          quote="The desire to create is one of the deepest yearnings of the human soul."
          author="Dieter F. Uchtdorf"
        />
      </section>
    </>
  );
}

export default LoginPage;
