import { getUser } from "@/lib/serverRequests";

export async function articleLoader() {
  const user = await getUser();
  if (!user) {
    return null;
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/author/articles`,
      {
        credentials: "include",
      },
    );
    if (!response.ok) {
      throw new Response("Unable to get articles", { status: response.status });
    }
    const data = await response.json();
    return [];
  } catch (err) {
    throw err;
  }
}
