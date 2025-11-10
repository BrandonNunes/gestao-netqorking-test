import { NextResponse } from "next/server";
import ApplicationsRepository from "../../_repositorys/applications.repository";
const applicationsRepository = new ApplicationsRepository();

export async function GET(
  request: Request,
  context: { params: Promise<{ invite_code: string }> }
) {
  const { invite_code } = await context.params;
  console.log("invite_code", invite_code);
  const application = await applicationsRepository.getApplicationByCode(
    invite_code
  );

  if (!application) {
    return NextResponse.json(
      { message: "Aplicação não encontrada" },
      { status: 404 }
    );
  }

  return NextResponse.json(application);
}
