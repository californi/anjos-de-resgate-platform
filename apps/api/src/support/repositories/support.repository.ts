import type {
  AnimalNeedSnapshot,
  AnimalNeedStatus,
  CampaignSnapshot,
  CampaignStatus,
  DonorSnapshot,
  SupportRecordSnapshot,
  SupportStatus,
} from "@anjos/domain";

export const SUPPORT_REPOSITORY = Symbol("SUPPORT_REPOSITORY");

export interface SupportRepository {
  findCampaigns(): Promise<CampaignSnapshot[]>;
  findCampaignById(id: string): Promise<CampaignSnapshot | null>;
  createCampaign(campaign: CampaignSnapshot): Promise<CampaignSnapshot>;
  updateCampaignStatus(
    id: string,
    status: CampaignStatus,
  ): Promise<CampaignSnapshot | null>;
  findNeeds(): Promise<AnimalNeedSnapshot[]>;
  findNeedById(id: string): Promise<AnimalNeedSnapshot | null>;
  createNeed(need: AnimalNeedSnapshot): Promise<AnimalNeedSnapshot>;
  updateNeedStatus(
    id: string,
    status: AnimalNeedStatus,
  ): Promise<AnimalNeedSnapshot | null>;
  findDonors(): Promise<DonorSnapshot[]>;
  findDonorByEmail(email: string): Promise<DonorSnapshot | null>;
  createDonor(donor: DonorSnapshot): Promise<DonorSnapshot>;
  findRecords(): Promise<SupportRecordSnapshot[]>;
  createRecord(record: SupportRecordSnapshot): Promise<SupportRecordSnapshot>;
  updateRecordStatus(
    id: string,
    status: SupportStatus,
  ): Promise<SupportRecordSnapshot | null>;
}
