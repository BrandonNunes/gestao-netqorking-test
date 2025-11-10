import { NextRequest, NextResponse } from "next/server";
import ApplicationsRepository from "@/app/api/_repositorys/applications.repository";

const applicationsRepository = new ApplicationsRepository();

export async function GET() {
  const applications = await applicationsRepository.getApplications();
  return NextResponse.json(applications);
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log("Dados recebidos da aplicação:", data);
    const existEmail = await applicationsRepository.getApplicationByEmail(
      data.email
    );

    if (existEmail) {
      return NextResponse.json(
        {
          message: "Email já cadastrado",
        },
        { status: 409 }
      );
    }

    const application = await applicationsRepository.createApplication(data);

    return NextResponse.json(
      {
        message: "Solicitação recebida com sucesso!",
        data: application,
        timestamp: new Date().toISOString(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao processar solicitação:", error);
    return NextResponse.json(
      {
        message: "Erro ao processar solicitação",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 400 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const data = await req.json();
    console.log("Dados recebidos da aplicação:", data);
    const application = await applicationsRepository.updateApplication(
      data.id,
      data
    );
    if (data.codigo_convite) {
      // SIMULA ENVIO DE EMAIL PARA O USUARIO
      console.log("Enviando email para:", application.email);
      console.log("Código de convite:", data.codigo_convite);
    }
    return NextResponse.json(
      {
        message: "Solicitação atualizada com sucesso!",
        data: application,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao processar solicitação:", error);
    return NextResponse.json(
      {
        message: "Erro ao processar solicitação",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 400 }
    );
  }
}
