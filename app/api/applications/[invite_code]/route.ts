import { PrismaClient } from "@/lib/generated/prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  context: { params: Promise<{ invite_code: string }> }
) {
  const { invite_code } = await context.params;
  console.log("invite_code", invite_code);
  const application = await prisma.application.findFirst({
    where: { codigo_convite: invite_code },
  });

  if (!application) {
    return NextResponse.json(
      { message: "Aplicação não encontrada" },
      { status: 404 }
    );
  }

  return NextResponse.json(application);
}
