import {
  AdoptionInterest,
  type AdoptionInterestSnapshot,
  type AdoptionInterestStatus,
} from "@anjos/domain";
import type { AdoptionInterest as PrismaAdoptionInterest } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import {
  type AdoptionInterestRepositoryCreateInput,
  type AdoptionInterestsRepository,
} from "./adoption-interests.repository";

export class PrismaAdoptionInterestsRepository implements AdoptionInterestsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<AdoptionInterestSnapshot[]> {
    const interests = await this.prisma.adoptionInterest.findMany({
      orderBy: [{ createdAt: "desc" }],
    });
    return interests.map(mapPrismaAdoptionInterest);
  }

  async findById(id: string): Promise<AdoptionInterestSnapshot | null> {
    const interest = await this.prisma.adoptionInterest.findUnique({
      where: { id },
    });
    return interest ? mapPrismaAdoptionInterest(interest) : null;
  }

  async findByAnimalId(animalId: string): Promise<AdoptionInterestSnapshot[]> {
    const interests = await this.prisma.adoptionInterest.findMany({
      where: { animalId },
      orderBy: [{ createdAt: "desc" }],
    });
    return interests.map(mapPrismaAdoptionInterest);
  }

  async create(
    input: AdoptionInterestRepositoryCreateInput,
  ): Promise<AdoptionInterestSnapshot> {
    const created = await this.prisma.adoptionInterest.create({
      data: input,
    });
    return mapPrismaAdoptionInterest(created);
  }

  async updateStatus(
    id: string,
    status: AdoptionInterestStatus,
  ): Promise<AdoptionInterestSnapshot | null> {
    const exists = await this.findById(id);
    if (!exists) {
      return null;
    }

    const updated = await this.prisma.adoptionInterest.update({
      where: { id },
      data: { status, updatedAt: new Date() },
    });
    return mapPrismaAdoptionInterest(updated);
  }
}

function mapPrismaAdoptionInterest(
  interest: PrismaAdoptionInterest,
): AdoptionInterestSnapshot {
  return AdoptionInterest.create({
    id: interest.id,
    animalId: interest.animalId,
    requesterName: interest.requesterName,
    contact: interest.contact,
    message: interest.message,
    status: interest.status as AdoptionInterestSnapshot["status"],
    createdAt: interest.createdAt,
    updatedAt: interest.updatedAt,
  }).toJSON();
}
