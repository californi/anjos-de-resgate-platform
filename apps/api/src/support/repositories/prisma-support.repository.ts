import {
  AnimalNeed,
  type AnimalNeedSnapshot,
  type AnimalNeedStatus,
  Campaign,
  type CampaignSnapshot,
  type CampaignStatus,
  Donor,
  type DonorSnapshot,
  SupportRecord,
  type SupportRecordSnapshot,
  type SupportStatus,
} from "@anjos/domain";
import type {
  AnimalNeed as PrismaAnimalNeed,
  Campaign as PrismaCampaign,
  Donor as PrismaDonor,
  SupportRecord as PrismaSupportRecord,
} from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import type { SupportRepository } from "./support.repository";

export class PrismaSupportRepository implements SupportRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findCampaigns() {
    return (
      await this.prisma.campaign.findMany({ orderBy: { createdAt: "desc" } })
    ).map(mapCampaign);
  }

  async findCampaignById(id: string) {
    const campaign = await this.prisma.campaign.findUnique({ where: { id } });
    return campaign ? mapCampaign(campaign) : null;
  }

  async createCampaign(campaign: CampaignSnapshot) {
    return mapCampaign(await this.prisma.campaign.create({ data: campaign }));
  }

  async updateCampaignStatus(id: string, status: CampaignStatus) {
    if (!(await this.findCampaignById(id))) return null;
    return mapCampaign(
      await this.prisma.campaign.update({ where: { id }, data: { status } }),
    );
  }

  async findNeeds() {
    return (
      await this.prisma.animalNeed.findMany({ orderBy: { createdAt: "desc" } })
    ).map(mapNeed);
  }

  async findNeedById(id: string) {
    const need = await this.prisma.animalNeed.findUnique({ where: { id } });
    return need ? mapNeed(need) : null;
  }

  async createNeed(need: AnimalNeedSnapshot) {
    return mapNeed(await this.prisma.animalNeed.create({ data: need }));
  }

  async updateNeedStatus(id: string, status: AnimalNeedStatus) {
    if (!(await this.findNeedById(id))) return null;
    return mapNeed(
      await this.prisma.animalNeed.update({ where: { id }, data: { status } }),
    );
  }

  async findDonors() {
    return (
      await this.prisma.donor.findMany({ orderBy: { createdAt: "desc" } })
    ).map(mapDonor);
  }

  async findDonorByEmail(email: string) {
    const donor = await this.prisma.donor.findUnique({ where: { email } });
    return donor ? mapDonor(donor) : null;
  }

  async createDonor(donor: DonorSnapshot) {
    return mapDonor(await this.prisma.donor.create({ data: donor }));
  }

  async findRecords() {
    return (
      await this.prisma.supportRecord.findMany({
        orderBy: { createdAt: "desc" },
      })
    ).map(mapRecord);
  }

  async createRecord(record: SupportRecordSnapshot) {
    return mapRecord(
      await this.prisma.supportRecord.create({ data: record }),
    );
  }

  async updateRecordStatus(id: string, status: SupportStatus) {
    const exists = await this.prisma.supportRecord.findUnique({ where: { id } });
    if (!exists) return null;
    return mapRecord(
      await this.prisma.supportRecord.update({
        where: { id },
        data: { status },
      }),
    );
  }
}

function mapCampaign(value: PrismaCampaign): CampaignSnapshot {
  return Campaign.create({
    ...value,
    status: value.status as CampaignSnapshot["status"],
  }).toJSON();
}

function mapNeed(value: PrismaAnimalNeed): AnimalNeedSnapshot {
  return AnimalNeed.create({
    ...value,
    category: value.category as AnimalNeedSnapshot["category"],
    status: value.status as AnimalNeedSnapshot["status"],
  }).toJSON();
}

function mapDonor(value: PrismaDonor): DonorSnapshot {
  return Donor.create(value).toJSON();
}

function mapRecord(value: PrismaSupportRecord): SupportRecordSnapshot {
  return SupportRecord.create({
    ...value,
    destination: value.destination as SupportRecordSnapshot["destination"],
    frequency: value.frequency as SupportRecordSnapshot["frequency"],
    status: value.status as SupportRecordSnapshot["status"],
  }).toJSON();
}
