import styles from "./LoginForm.module.css";
import FormButton from "../FormButton/FormButton";
import FormInput from "../FormInput/FormInput";

function LoginForm() {
  return (
    <form method="post" action="/auth/login" className={styles.form}>
      <div className={styles.welcomeMessage}>
        <h1>Welcome back</h1>
        <p>ENTER YOUR CREATIVE SPACE</p>
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
      <FormButton type="submit">Submit</FormButton>
    </form>
  );
}

export default LoginForm;
