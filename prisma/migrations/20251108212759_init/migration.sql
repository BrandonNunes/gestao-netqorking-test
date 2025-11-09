-- CreateTable
CREATE TABLE "applications" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "motivo_participacao" TEXT NOT NULL,
    "aprovado" BOOLEAN NOT NULL DEFAULT false,
    "recusado" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "applications_pkey" PRIMARY KEY ("id")
);
