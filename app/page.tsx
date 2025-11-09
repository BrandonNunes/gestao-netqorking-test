import ApplicationForm from "@/components/ApplicationForm";
import InviteAccess from "@/components/InviteAcess";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center flex-col bg-zinc-50 font-sans dark:bg-black ">
      <header className="w-full">
        <h1 className="scroll-m-20 text-4xl flex justify-between items-center font-bold tracking-tight bg-black text-white px-4 py-2 ">
          NetFuture
          <Link href="/admin">
            <Button className="cursor-pointer">
              {" "}
              <User className="inline-block w-6 h-6 ml-2 bold" />
              <span>Admin</span>
            </Button>
          </Link>
        </h1>
      </header>
      <main className="flex flex-col flex-1 items-center justify-center gap-4 px-4">
        <div className="w-full max-w-2xl">
          <h2 className="scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Intenção de participação
          </h2>
          <small className="text-sm leading-none font-medium border-b text-zinc-500 mb-4">
            Os administradores iram receber sua solicitação e lhe contatar para
            aprovação.
          </small>
          <ApplicationForm />
          <InviteAccess />
        </div>
      </main>
    </div>
  );
}
