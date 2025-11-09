import { PrismaClient } from "@/lib/generated/prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const applications = await prisma.application.findMany();
  return NextResponse.json(applications);
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log("Dados recebidos da aplicação:", data);
    const existEmail = await prisma.application.findFirst({
      where: {
        email: data.email,
      },
    });

    if (existEmail) {
      return NextResponse.json(
        {
          message: "Email já cadastrado",
        },
        { status: 409 }
      );
    }

    const application = await prisma.application.create({
      data: {
        nome: data.nome,
        email: data.email,
        motivo_participacao: data.motivo_participacao,
      },
    });

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
    const application = await prisma.application.update({
      where: {
        id: data.id,
      },
      data: {
        ...data,
      },
    });
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
