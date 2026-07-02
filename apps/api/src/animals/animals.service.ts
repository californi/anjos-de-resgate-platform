import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Animal, type AnimalSnapshot, AnimalStatus } from "@anjos/domain";
import { CreateAnimalDto } from "./dto/create-animal.dto";
import { UpdateAnimalStatusDto } from "./dto/update-animal-status.dto";
import { UpdateAnimalDto } from "./dto/update-animal.dto";
import { ANIMALS_REPOSITORY, type AnimalsRepository } from "./repositories/animals.repository";

@Injectable()
export class AnimalsService {
  constructor(
    @Inject(ANIMALS_REPOSITORY)
    private readonly animalsRepository: AnimalsRepository
  ) {}

  async list(): Promise<AnimalSnapshot[]> {
    return this.animalsRepository.findAll();
  }

  async getById(id: string): Promise<AnimalSnapshot> {
    const animal = await this.animalsRepository.findById(id);
    if (!animal) {
      throw new NotFoundException(`Animal ${id} nao encontrado`);
    }
    return animal;
  }

  async create(input: CreateAnimalDto): Promise<AnimalSnapshot> {
    try {
      const animal = Animal.create({
        ...input,
        status: input.status ?? AnimalStatus.AVAILABLE
      });
      return this.animalsRepository.create(animal.toJSON());
    } catch (error) {
      throw new BadRequestException((error as Error).message);
    }
  }

  async update(id: string, input: UpdateAnimalDto): Promise<AnimalSnapshot> {
    const current = await this.getById(id);

    try {
      const animal = Animal.create(current).update(input);
      const updated = await this.animalsRepository.update(id, animal.toJSON());
      if (!updated) {
        throw new NotFoundException(`Animal ${id} nao encontrado`);
      }
      return updated;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException((error as Error).message);
    }
  }

  async updateStatus(id: string, input: UpdateAnimalStatusDto): Promise<AnimalSnapshot> {
    const current = await this.getById(id);
    const animal = Animal.create(current).changeStatus(input.status);
    const updated = await this.animalsRepository.updateStatus(id, animal.toJSON().status);

    if (!updated) {
      throw new NotFoundException(`Animal ${id} nao encontrado`);
    }

    return updated;
  }

  async remove(id: string): Promise<void> {
    const removed = await this.animalsRepository.remove(id);
    if (!removed) {
      throw new NotFoundException(`Animal ${id} nao encontrado`);
    }
  }
}
