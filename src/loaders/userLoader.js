import { getUser } from "@/lib/utils";

export async function userLoader() {
  const user = await getUser();
  return { user };
}
