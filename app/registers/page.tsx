import FullApplicationForm from "@/components/FullApplicationForm.tsx";
import Link from "next/link";

export default async function Register({
  searchParams,
}: {
  searchParams: Promise<{ invite_code: string | string[] | undefined }>;
}) {
  const { invite_code } = await searchParams;
  if (!invite_code) {
    return (
      <div className="p-4">
        <h4 className="text-red-500">Nenhum código encontrado:</h4>
        <Link className="text-blue-500" href="/">
          Clique aqui para voltar para o início
        </Link>
      </div>
    );
  }

  return (
    <div>
      <FullApplicationForm invite_code={invite_code as string} />
    </div>
  );
}
