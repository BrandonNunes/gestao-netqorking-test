import { PrismaClient } from "@/lib/generated/prisma/client";
import { ParticipantCreateInput } from "@/lib/generated/prisma/models";

export default class ParticipantsRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getParticipantByEmail(email: string) {
    return await this.prisma.participant.findFirst({
      where: {
        email,
      },
    });
  }

  async createParticipant(data: ParticipantCreateInput) {
    return await this.prisma.participant.create({
      data,
    });
  }
}
