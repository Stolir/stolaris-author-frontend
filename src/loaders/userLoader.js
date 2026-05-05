import { getUser } from "@/lib/serverRequests";

export async function userLoader() {
  const user = await getUser();
  return { user };
}
