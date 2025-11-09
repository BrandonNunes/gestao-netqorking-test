import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        <Button className="cursor-pointer">
          {" "}
          <User className="inline-block w-6 h-6 ml-2 bold" />
          <span>Admin</span>
        </Button>
      </header>
      <main className="flex flex-col flex-1 items-center justify-center gap-4 px-4">
        {children}
      </main>
    </div>
  );
}
