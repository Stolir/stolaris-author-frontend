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

export function isDeepEqual(obj1, obj2) {
  if (obj1 === obj2) return true;

  if (Number.isNaN(obj1) && Number.isNaN(obj2)) return true;

  // Since primitive types are handled by the first if statement
  // return false if either of the arguments are not objects or null
  if (
    typeof obj1 !== "object" ||
    obj1 === null ||
    typeof obj2 !== "object" ||
    obj2 === null
  ) {
    return false;
  }
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);

  if (obj1Keys.length !== obj2Keys.length) return false;

  for (let key of obj1Keys) {
    if (!obj2Keys.includes(key) || !isDeepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }
  return true;
}
