import styles from "./EditorSaveButton.module.css";

function EditorSaveButton({ editor }) {
  function onSave(editor) {
    console.log(editor.getJSON());
    console.log(editor.getHTML());
  }

  return (
    <button className={styles.saveButton} onClick={() => onSave(editor)}>
      Log
    </button>
  );
}

export default EditorSaveButton;
