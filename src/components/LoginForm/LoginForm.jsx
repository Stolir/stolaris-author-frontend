import styles from "./LoginForm.module.css";
import FormButton from "../FormButton/FormButton";
import FormInput from "../FormInput/FormInput";
import { useMemo } from "react";

const welcomeMessages = [
  "Let your thoughts become creation.",
  "Where you can write as if no one is watching.",
  "Enter the studio. Write without consequences.",
  "Write without judgment. Create without limits.",
  "A quiet corner for your loudest thoughts.",
  "Write for yourself, even if just for a moment.",
];

function LoginForm() {
  // picks a welcome message at random
  const randomWM = useMemo(() => {
    return welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
  }, []);

  return (
    <form method="post" action="/auth/login" className={styles.form}>
      <div className={styles.welcomeMessage}>
        <h1>Welcome back</h1>
        <p>{randomWM}</p>
      </div>
      <FormInput
        type="text"
        label="USERNAME"
        id="username"
        name="username"
        placeholder="johndoe"
      />
      <FormInput
        type="password"
        label="PASSWORD"
        id="password"
        name="password"
        placeholder="*********"
      />
      <FormButton type="submit">Login</FormButton>
    </form>
  );
}

export default LoginForm;
