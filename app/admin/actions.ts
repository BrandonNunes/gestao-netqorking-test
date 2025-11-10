"use server";
import { cookies } from "next/headers";
import { TOKEN_NAME } from "@/proxy";
import { redirect } from "next/navigation";

export async function loginAdmin(data: unknown) {
  const cookiesStore = await cookies();
  cookiesStore.set(TOKEN_NAME, "2345678");
  redirect("/admin/private");
}

export async function logoutAdmin() {
  const cookiesStore = await cookies();
  cookiesStore.delete(TOKEN_NAME);
  redirect("/admin");
}
