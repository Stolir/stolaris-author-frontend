export function formatDateUTC(iso) {
  return iso.split("T")[0];
}

export function formatDateLocal(iso) {
  const date = new Date(iso);

  return (
    date.getFullYear() +
    "-" +
    String(date.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(date.getDate()).padStart(2, "0")
  );
}
