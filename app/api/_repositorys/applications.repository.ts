import { PrismaClient } from "@/lib/generated/prisma/client";
import {
  ApplicationCreateInput,
  ApplicationUpdateInput,
} from "@/lib/generated/prisma/models";

export default class ApplicationsRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getApplications() {
    return await this.prisma.application.findMany();
  }

  async getApplicationByEmail(email: string) {
    return await this.prisma.application.findFirst({
      where: {
        email,
      },
    });
  }

  async createApplication(data: ApplicationCreateInput) {
    return await this.prisma.application.create({
      data,
    });
  }

  async updateApplication(id: number, data: ApplicationUpdateInput) {
    return await this.prisma.application.update({
      where: {
        id,
      },
      data,
    });
  }

  async getApplicationByCode(code: string) {
    return await this.prisma.application.findFirst({
      where: {
        codigo_convite: code,
      },
    });
  }
}
