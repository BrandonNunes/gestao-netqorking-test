import { Button } from "@/components/ui/button";
import { TOKEN_NAME } from "@/middleware";
import { User, LogOut } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { logoutAdmin } from "../actions";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get(TOKEN_NAME);

  return (
    <div className="flex min-h-screen items-center justify-center flex-col bg-zinc-50 font-sans dark:bg-black ">
      <header className="w-full scroll-m-20  flex justify-between items-center font-bold tracking-tight bg-black text-white px-4 py-2">
        <h1 className="text-4xl">NetFuture</h1>
        <div className="flex items-center justify-center gap-2">
          <Link
            className="text-white text-md border-b-2 border-white hover:border-b-4"
            href="/admin/dashboard"
          >
            Dashboard
          </Link>
          <Link
            className="text-white border-b-2 border-white hover:border-b-4"
            href="/admin/private"
          >
            Listagem
          </Link>
        </div>
        <Button className="cursor-pointer" onClick={logoutAdmin}>
          {" "}
          <LogOut className="inline-block w-6 h-6 ml-2 bold" />
        </Button>
      </header>
      <main className="flex flex-col flex-1 items-center justify-center gap-4 px-4">
        {children}
      </main>
    </div>
  );
}
