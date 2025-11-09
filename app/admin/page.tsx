import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";

export default function AdminPage() {
  const loginAdmin = async (formData: FormData) => {
    "use server";
    const usuario = formData.get("usuario");
    const password = formData.get("password");
    const loginSchema = z.object({
      usuario: z.string().min(3, "Usuário inválido"),
      password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
    });

    redirect("/admin/private");
  };
  return (
    <div className="w-full min-h-screen justify-center items-center flex flex-col">
      <h1>Login Admin</h1>
      <form
        action={loginAdmin}
        className="w-full max-w-md p-8 space-y-6 bg-white rounded-md shadow-md"
      >
        <div className="flex flex-col gap-4">
          <label htmlFor="usuario">Usuário</label>
          <input
            type="text"
            id="usuario"
            name="usuario"
            required
            className="w-full p-2 border border-zinc-300 rounded-md"
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="w-full p-2 border border-zinc-300 rounded-md"
          />
          <Button type="submit">Login</Button>
        </div>
      </form>
    </div>
  );
}
