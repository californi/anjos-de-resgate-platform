import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import {
  AdoptionInterest,
  type AdoptionInterestSnapshot,
  AnimalStatus,
} from "@anjos/domain";
import {
  ANIMALS_REPOSITORY,
  type AnimalsRepository,
} from "../animals/repositories/animals.repository";
import { CreateAdoptionInterestDto } from "./dto/create-adoption-interest.dto";
import { UpdateAdoptionInterestStatusDto } from "./dto/update-adoption-interest-status.dto";
import {
  ADOPTION_INTERESTS_REPOSITORY,
  type AdoptionInterestsRepository,
} from "./repositories/adoption-interests.repository";

@Injectable()
export class AdoptionInterestsService {
  constructor(
    @Inject(ADOPTION_INTERESTS_REPOSITORY)
    private readonly adoptionInterestsRepository: AdoptionInterestsRepository,
    @Inject(ANIMALS_REPOSITORY)
    private readonly animalsRepository: AnimalsRepository,
  ) {}

  async list(): Promise<AdoptionInterestSnapshot[]> {
    return this.adoptionInterestsRepository.findAll();
  }

  async listByAnimal(animalId: string): Promise<AdoptionInterestSnapshot[]> {
    await this.assertAnimalExists(animalId);
    return this.adoptionInterestsRepository.findByAnimalId(animalId);
  }

  async create(
    input: CreateAdoptionInterestDto,
  ): Promise<AdoptionInterestSnapshot> {
    const animal = await this.assertAnimalExists(input.animalId);
    if (animal.status === AnimalStatus.IN_ADOPTION_PROCESS) {
      throw new BadRequestException(
        "Interesse de adocao nao pode ser registrado para animal em processo de adocao",
      );
    }

    try {
      const interest = AdoptionInterest.create(input);
      return this.adoptionInterestsRepository.create(interest.toJSON());
    } catch (error) {
      throw new BadRequestException((error as Error).message);
    }
  }

  async updateStatus(
    id: string,
    input: UpdateAdoptionInterestStatusDto,
  ): Promise<AdoptionInterestSnapshot> {
    const updated = await this.adoptionInterestsRepository.updateStatus(
      id,
      input.status,
    );
    if (!updated) {
      throw new NotFoundException(`Interesse de adocao ${id} nao encontrado`);
    }
    return updated;
  }

  private async assertAnimalExists(animalId: string) {
    const animal = await this.animalsRepository.findById(animalId);
    if (!animal) {
      throw new NotFoundException(`Animal ${animalId} nao encontrado`);
    }
    return animal;
  }
}
