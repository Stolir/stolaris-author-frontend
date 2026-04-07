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
      />
    </div>
  );
}

export default FormInput;
