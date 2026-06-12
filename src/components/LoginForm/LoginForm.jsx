import styles from "./LoginForm.module.css";
import FormButton from "../FormButton/FormButton";
import FormInput from "../FormInput/FormInput";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";

const welcomeMessages = [
  "Let your thoughts become creation.",
  "Enter the studio. Write without consequences.",
  "Write without judgment. Create without limits.",
  "A quiet corner for your loudest thoughts.",
  "Write for yourself, even if just for a moment.",
];

function LoginForm() {
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useAuth();

  // picks a welcome message at random
  const randomWM = useMemo(() => {
    return welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setFieldErrors({});
    const formData = new FormData(e.target);

    try {
      const response = await fetch("/auth/login/author", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.get("username"),
          password: formData.get("password"),
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        if (data.errors) {
          const mappedErrors = {};
          data.errors.forEach((err) => {
            mappedErrors[err.path] = err.msg;
          });
          setFieldErrors(mappedErrors);
        } else {
          setError(data.message);
        }
        return;
      }
      login(data.user);
      navigate("/author/dashboard");
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
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
        isRequired={true}
        error={fieldErrors.username}
      />
      <FormInput
        type="password"
        label="PASSWORD"
        id="password"
        name="password"
        placeholder="*********"
        isRequired={true}
        error={fieldErrors.password}
      />

      <FormButton type="submit">Login</FormButton>
      <p className={styles.error}>{error ? error : ""}</p>
    </form>
  );
}

export default LoginForm;
