export async function userLoader() {
  try {
    const response = await fetch("/auth/me", {
      credentials: "include",
    });
    if (!response.ok) {
      return { user: nul };
    }
    const data = await response.json();
    return data;
  } catch {
    return { user: null };
  }
}
