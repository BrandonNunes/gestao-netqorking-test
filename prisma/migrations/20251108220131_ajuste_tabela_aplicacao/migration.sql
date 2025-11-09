/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `applications` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[codigo_convite]` on the table `applications` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "applications" ADD COLUMN     "codigo_convite" TEXT,
ADD COLUMN     "registro_finalizado" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "applications_email_key" ON "applications"("email");

-- CreateIndex
CREATE UNIQUE INDEX "applications_codigo_convite_key" ON "applications"("codigo_convite");
