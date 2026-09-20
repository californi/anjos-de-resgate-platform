import {
  type AnimalNeedSnapshot,
  type AnimalNeedStatus,
  type CampaignSnapshot,
  type CampaignStatus,
  type DonorSnapshot,
  type SupportRecordSnapshot,
  type SupportStatus,
} from "@anjos/domain";
import type { SupportRepository } from "./support.repository";

export class InMemorySupportRepository implements SupportRepository {
  private readonly campaigns = new Map<string, CampaignSnapshot>();
  private readonly needs = new Map<string, AnimalNeedSnapshot>();
  private readonly donors = new Map<string, DonorSnapshot>();
  private readonly records = new Map<string, SupportRecordSnapshot>();

  async findCampaigns() {
    return newestFirst([...this.campaigns.values()]);
  }

  async findCampaignById(id: string) {
    return this.campaigns.get(id) ?? null;
  }

  async createCampaign(campaign: CampaignSnapshot) {
    this.campaigns.set(campaign.id, campaign);
    return campaign;
  }

  async updateCampaignStatus(id: string, status: CampaignStatus) {
    const current = this.campaigns.get(id);
    if (!current) return null;
    const updated = { ...current, status, updatedAt: new Date() };
    this.campaigns.set(id, updated);
    return updated;
  }

  async findNeeds() {
    return newestFirst([...this.needs.values()]);
  }

  async findNeedById(id: string) {
    return this.needs.get(id) ?? null;
  }

  async createNeed(need: AnimalNeedSnapshot) {
    this.needs.set(need.id, need);
    return need;
  }

  async updateNeedStatus(id: string, status: AnimalNeedStatus) {
    const current = this.needs.get(id);
    if (!current) return null;
    const updated = { ...current, status, updatedAt: new Date() };
    this.needs.set(id, updated);
    return updated;
  }

  async findDonors() {
    return newestFirst([...this.donors.values()]);
  }

  async findDonorByEmail(email: string) {
    return (
      [...this.donors.values()].find((donor) => donor.email === email) ?? null
    );
  }

  async createDonor(donor: DonorSnapshot) {
    this.donors.set(donor.id, donor);
    return donor;
  }

  async findRecords() {
    return newestFirst([...this.records.values()]);
  }

  async createRecord(record: SupportRecordSnapshot) {
    this.records.set(record.id, record);
    return record;
  }

  async updateRecordStatus(id: string, status: SupportStatus) {
    const current = this.records.get(id);
    if (!current) return null;
    const updated = { ...current, status, updatedAt: new Date() };
    this.records.set(id, updated);
    return updated;
  }
}

function newestFirst<T extends { createdAt: Date }>(items: T[]): T[] {
  return items.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}
