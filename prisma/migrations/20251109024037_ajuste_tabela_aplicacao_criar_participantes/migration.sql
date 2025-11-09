-- AlterTable
ALTER TABLE "applications" ADD COLUMN     "empresa" TEXT;

-- CreateTable
CREATE TABLE "participants" (
    "id" SERIAL NOT NULL,
    "id_intencao" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "empresa" TEXT,
    "email" TEXT NOT NULL,
    "telefone" TEXT,
    "rede_social" TEXT,
    "cpf_cnpj" TEXT,
    "descricao_habilidades" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "participants_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "participants_id_intencao_key" ON "participants"("id_intencao");

-- CreateIndex
CREATE UNIQUE INDEX "participants_email_key" ON "participants"("email");

-- AddForeignKey
ALTER TABLE "participants" ADD CONSTRAINT "participants_id_intencao_fkey" FOREIGN KEY ("id_intencao") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
