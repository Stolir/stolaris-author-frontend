import styles from "./FormInput.module.css";

function FormInput({
  type = "text",
  name,
  label,
  onChange,
  onBlur,
  id,
  value,
  placeholder,
  isRequired,
  error,
  disabled = false,
}) {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        required={isRequired}
        className={error ? styles.validationError : ""}
        autoComplete={name}
        disabled={disabled}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}

export default FormInput;
