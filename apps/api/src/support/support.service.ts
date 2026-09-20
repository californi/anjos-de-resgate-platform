import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import {
  AnimalNeed,
  AnimalNeedStatus,
  Campaign,
  CampaignStatus,
  Donor,
  SupportDestination,
  SupportRecord,
  SupportStatus,
  type AnimalNeedSnapshot,
  type CampaignSnapshot,
  type DonorSnapshot,
  type SupportRecordSnapshot,
} from "@anjos/domain";
import {
  ANIMALS_REPOSITORY,
  type AnimalsRepository,
} from "../animals/repositories/animals.repository";
import { CreateAnimalNeedDto } from "./dto/create-animal-need.dto";
import { CreateCampaignDto } from "./dto/create-campaign.dto";
import { CreateSupportRecordDto } from "./dto/create-support-record.dto";
import {
  SUPPORT_REPOSITORY,
  type SupportRepository,
} from "./repositories/support.repository";

export type SupportOverview = {
  campaigns: Array<CampaignSnapshot & { confirmedAmountCents: number }>;
  needs: Array<AnimalNeedSnapshot & { confirmedAmountCents: number }>;
};

@Injectable()
export class SupportService {
  constructor(
    @Inject(SUPPORT_REPOSITORY)
    private readonly supportRepository: SupportRepository,
    @Inject(ANIMALS_REPOSITORY)
    private readonly animalsRepository: AnimalsRepository,
  ) {}

  async overview(): Promise<SupportOverview> {
    const [campaigns, needs, records] = await Promise.all([
      this.supportRepository.findCampaigns(),
      this.supportRepository.findNeeds(),
      this.supportRepository.findRecords(),
    ]);
    const confirmed = records.filter(
      (record) => record.status === SupportStatus.CONFIRMED,
    );
    return {
      campaigns: campaigns
        .filter((campaign) => campaign.status === CampaignStatus.ACTIVE)
        .map((campaign) => ({
          ...campaign,
          confirmedAmountCents: sumAmounts(
            confirmed.filter((record) => record.campaignId === campaign.id),
          ),
        })),
      needs: needs
        .filter((need) => need.status === AnimalNeedStatus.OPEN)
        .map((need) => ({
          ...need,
          confirmedAmountCents: sumAmounts(
            confirmed.filter((record) => record.animalNeedId === need.id),
          ),
        })),
    };
  }

  listCampaigns(): Promise<CampaignSnapshot[]> {
    return this.supportRepository.findCampaigns();
  }

  listNeeds(): Promise<AnimalNeedSnapshot[]> {
    return this.supportRepository.findNeeds();
  }

  listDonors(): Promise<DonorSnapshot[]> {
    return this.supportRepository.findDonors();
  }

  listRecords(): Promise<SupportRecordSnapshot[]> {
    return this.supportRepository.findRecords();
  }

  async createCampaign(input: CreateCampaignDto): Promise<CampaignSnapshot> {
    try {
      const campaign = Campaign.create({
        ...input,
        status: CampaignStatus.ACTIVE,
      });
      return this.supportRepository.createCampaign(campaign.toJSON());
    } catch (error) {
      throw new BadRequestException((error as Error).message);
    }
  }

  async createNeed(input: CreateAnimalNeedDto): Promise<AnimalNeedSnapshot> {
    if (!(await this.animalsRepository.findById(input.animalId))) {
      throw new NotFoundException(`Animal ${input.animalId} nao encontrado`);
    }
    try {
      const need = AnimalNeed.create({
        ...input,
        targetAmountCents: input.targetAmountCents ?? null,
        status: AnimalNeedStatus.OPEN,
      });
      return this.supportRepository.createNeed(need.toJSON());
    } catch (error) {
      throw new BadRequestException((error as Error).message);
    }
  }

  async createRecord(
    input: CreateSupportRecordDto,
  ): Promise<SupportRecordSnapshot> {
    const references = await this.validateDestination(input);
    const email = input.donorEmail.trim().toLowerCase();
    let donor = await this.supportRepository.findDonorByEmail(email);
    if (!donor) {
      donor = await this.supportRepository.createDonor(
        Donor.create({ name: input.donorName, email }).toJSON(),
      );
    }

    try {
      const record = SupportRecord.create({
        donorId: donor.id,
        destination: input.destination,
        amountCents: input.amountCents,
        frequency: input.frequency,
        animalId: references.animalId,
        campaignId: references.campaignId,
        animalNeedId: references.animalNeedId,
        message: input.message ?? null,
        status: SupportStatus.PLEDGED,
      });
      return this.supportRepository.createRecord(record.toJSON());
    } catch (error) {
      throw new BadRequestException((error as Error).message);
    }
  }

  async updateRecordStatus(id: string, status: SupportStatus) {
    const updated = await this.supportRepository.updateRecordStatus(id, status);
    if (!updated) throw new NotFoundException(`Apoio ${id} nao encontrado`);
    return updated;
  }

  async updateCampaignStatus(id: string, status: CampaignStatus) {
    const updated = await this.supportRepository.updateCampaignStatus(id, status);
    if (!updated) throw new NotFoundException(`Campanha ${id} nao encontrada`);
    return updated;
  }

  async updateNeedStatus(id: string, status: AnimalNeedStatus) {
    const updated = await this.supportRepository.updateNeedStatus(id, status);
    if (!updated) throw new NotFoundException(`Necessidade ${id} nao encontrada`);
    return updated;
  }

  private async validateDestination(input: CreateSupportRecordDto) {
    let animalId: string | null = null;
    let campaignId: string | null = null;
    let animalNeedId: string | null = null;

    if (input.destination === SupportDestination.CAMPAIGN) {
      const campaign = input.campaignId
        ? await this.supportRepository.findCampaignById(input.campaignId)
        : null;
      if (!campaign || campaign.status !== CampaignStatus.ACTIVE) {
        throw new BadRequestException("Campanha ativa e obrigatoria");
      }
      campaignId = campaign.id;
    }

    if (input.destination === SupportDestination.SPONSORSHIP) {
      const animal = input.animalId
        ? await this.animalsRepository.findById(input.animalId)
        : null;
      if (!animal) throw new BadRequestException("Animal e obrigatorio");
      animalId = animal.id;
    }

    if (input.destination === SupportDestination.ANIMAL_NEED) {
      const need = input.animalNeedId
        ? await this.supportRepository.findNeedById(input.animalNeedId)
        : null;
      if (!need || need.status !== AnimalNeedStatus.OPEN) {
        throw new BadRequestException("Necessidade aberta e obrigatoria");
      }
      animalNeedId = need.id;
      animalId = need.animalId;
    }

    return { animalId, campaignId, animalNeedId };
  }
}

function sumAmounts(records: SupportRecordSnapshot[]): number {
  return records.reduce((sum, record) => sum + record.amountCents, 0);
}
