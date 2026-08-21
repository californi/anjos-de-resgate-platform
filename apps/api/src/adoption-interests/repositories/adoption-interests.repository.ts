import type {
  AdoptionInterestSnapshot,
  AdoptionInterestStatus,
} from "@anjos/domain";

export const ADOPTION_INTERESTS_REPOSITORY = Symbol(
  "ADOPTION_INTERESTS_REPOSITORY",
);

export type AdoptionInterestRepositoryCreateInput = AdoptionInterestSnapshot;

export interface AdoptionInterestsRepository {
  findAll(): Promise<AdoptionInterestSnapshot[]>;
  findById(id: string): Promise<AdoptionInterestSnapshot | null>;
  findByAnimalId(animalId: string): Promise<AdoptionInterestSnapshot[]>;
  create(
    interest: AdoptionInterestRepositoryCreateInput,
  ): Promise<AdoptionInterestSnapshot>;
  updateStatus(
    id: string,
    status: AdoptionInterestStatus,
  ): Promise<AdoptionInterestSnapshot | null>;
}
