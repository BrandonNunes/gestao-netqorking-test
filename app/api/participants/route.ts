import { PrismaClient } from "@/lib/generated/prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log("Dados recebidos da aplicação:", data);
    const existEmail = await prisma.participant.findFirst({
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

    const participant = await prisma.participant.create({
      data: {
        ...data,
      },
    });

    await prisma.application.update({
      where: {
        id: data.id_intencao,
      },
      data: {
        registro_finalizado: true,
      },
    });

    return NextResponse.json(
      {
        message: "Processado com sucesso!",
        data: participant,
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
