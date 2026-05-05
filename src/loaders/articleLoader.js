import { getUser } from "@/lib/serverRequests";
import { redirect } from "react-router";

export async function articleLoader() {
  const user = await getUser();
  if (!user) {
    throw redirect("/");
  }

  try {
    const response = await fetch("/api/author/articles", {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Response("Unable to get articles", { status: response.status });
    }
    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
}
