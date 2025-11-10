import { NextRequest, NextResponse } from "next/server";
import ParticipantsRepository from "../_repositorys/participants.repository";
import ApplicationsRepository from "../_repositorys/applications.repository";

const participantsRepository = new ParticipantsRepository();
const applicationsRepository = new ApplicationsRepository();

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log("Dados recebidos da aplicação:", data);
    const existEmail = await participantsRepository.getParticipantByEmail(
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

    const participant = await participantsRepository.createParticipant({
      ...data,
    });

    await applicationsRepository.updateApplication(data.id_intencao, {
      registro_finalizado: true,
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
