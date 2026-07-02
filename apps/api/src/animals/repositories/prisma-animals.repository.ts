import { Animal, type AnimalSnapshot, type AnimalStatus } from "@anjos/domain";
import type { Animal as PrismaAnimal } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import {
  type AnimalRepositoryCreateInput,
  type AnimalRepositoryUpdateInput,
  type AnimalsRepository
} from "./animals.repository";

export class PrismaAnimalsRepository implements AnimalsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<AnimalSnapshot[]> {
    const animals = await this.prisma.animal.findMany({
      orderBy: [{ createdAt: "desc" }]
    });
    return animals.map(mapPrismaAnimal);
  }

  async findById(id: string): Promise<AnimalSnapshot | null> {
    const animal = await this.prisma.animal.findUnique({
      where: { id }
    });
    return animal ? mapPrismaAnimal(animal) : null;
  }

  async create(animal: AnimalRepositoryCreateInput): Promise<AnimalSnapshot> {
    const created = await this.prisma.animal.create({
      data: animal
    });
    return mapPrismaAnimal(created);
  }

  async update(id: string, animal: AnimalRepositoryUpdateInput): Promise<AnimalSnapshot | null> {
    const exists = await this.findById(id);
    if (!exists) {
      return null;
    }

    const updated = await this.prisma.animal.update({
      where: { id },
      data: animal
    });
    return mapPrismaAnimal(updated);
  }

  async updateStatus(id: string, status: AnimalStatus): Promise<AnimalSnapshot | null> {
    return this.update(id, { status, updatedAt: new Date() });
  }

  async remove(id: string): Promise<boolean> {
    const exists = await this.findById(id);
    if (!exists) {
      return false;
    }
    await this.prisma.animal.delete({ where: { id } });
    return true;
  }
}

function mapPrismaAnimal(animal: PrismaAnimal): AnimalSnapshot {
  return Animal.create({
    id: animal.id,
    name: animal.name,
    species: animal.species as AnimalSnapshot["species"],
    sex: animal.sex as AnimalSnapshot["sex"],
    size: animal.size as AnimalSnapshot["size"],
    approximateAge: animal.approximateAge,
    description: animal.description,
    photoUrl: animal.photoUrl,
    status: animal.status as AnimalSnapshot["status"],
    specialNeeds: animal.specialNeeds,
    createdAt: animal.createdAt,
    updatedAt: animal.updatedAt
  }).toJSON();
}
