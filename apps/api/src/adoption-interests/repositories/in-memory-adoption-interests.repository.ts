import {
  AdoptionInterest,
  type AdoptionInterestSnapshot,
  type AdoptionInterestStatus,
} from "@anjos/domain";
import {
  type AdoptionInterestRepositoryCreateInput,
  type AdoptionInterestsRepository,
} from "./adoption-interests.repository";

export class InMemoryAdoptionInterestsRepository implements AdoptionInterestsRepository {
  private readonly interests = new Map<string, AdoptionInterestSnapshot>();

  constructor(initialInterests: AdoptionInterestSnapshot[] = []) {
    initialInterests.forEach((interest) =>
      this.interests.set(
        interest.id,
        AdoptionInterest.create(interest).toJSON(),
      ),
    );
  }

  async findAll(): Promise<AdoptionInterestSnapshot[]> {
    return this.sort([...this.interests.values()]);
  }

  async findById(id: string): Promise<AdoptionInterestSnapshot | null> {
    return this.interests.get(id) ?? null;
  }

  async findByAnimalId(animalId: string): Promise<AdoptionInterestSnapshot[]> {
    return this.sort(
      [...this.interests.values()].filter(
        (interest) => interest.animalId === animalId,
      ),
    );
  }

  async create(
    input: AdoptionInterestRepositoryCreateInput,
  ): Promise<AdoptionInterestSnapshot> {
    this.interests.set(input.id, input);
    return input;
  }

  async updateStatus(
    id: string,
    status: AdoptionInterestStatus,
  ): Promise<AdoptionInterestSnapshot | null> {
    const current = this.interests.get(id);
    if (!current) {
      return null;
    }

    const updated = AdoptionInterest.create(current)
      .changeStatus(status)
      .toJSON();
    this.interests.set(id, updated);
    return updated;
  }

  private sort(
    interests: AdoptionInterestSnapshot[],
  ): AdoptionInterestSnapshot[] {
    return interests.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    );
  }
}
