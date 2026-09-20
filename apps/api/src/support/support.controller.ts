import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateAnimalNeedDto } from "./dto/create-animal-need.dto";
import { CreateCampaignDto } from "./dto/create-campaign.dto";
import { CreateSupportRecordDto } from "./dto/create-support-record.dto";
import {
  UpdateAnimalNeedStatusDto,
  UpdateCampaignStatusDto,
  UpdateSupportStatusDto,
} from "./dto/update-support-status.dto";
import { SupportService } from "./support.service";

@Controller("support")
export class SupportController {
  constructor(private readonly supportService: SupportService) {}

  @Get("overview")
  overview() {
    return this.supportService.overview();
  }

  @Get("campaigns")
  campaigns() {
    return this.supportService.listCampaigns();
  }

  @Post("campaigns")
  createCampaign(@Body() input: CreateCampaignDto) {
    return this.supportService.createCampaign(input);
  }

  @Patch("campaigns/:id/status")
  updateCampaignStatus(
    @Param("id") id: string,
    @Body() input: UpdateCampaignStatusDto,
  ) {
    return this.supportService.updateCampaignStatus(id, input.status);
  }

  @Get("needs")
  needs() {
    return this.supportService.listNeeds();
  }

  @Post("needs")
  createNeed(@Body() input: CreateAnimalNeedDto) {
    return this.supportService.createNeed(input);
  }

  @Patch("needs/:id/status")
  updateNeedStatus(
    @Param("id") id: string,
    @Body() input: UpdateAnimalNeedStatusDto,
  ) {
    return this.supportService.updateNeedStatus(id, input.status);
  }

  @Get("donors")
  donors() {
    return this.supportService.listDonors();
  }

  @Get("records")
  records() {
    return this.supportService.listRecords();
  }

  @Post("records")
  createRecord(@Body() input: CreateSupportRecordDto) {
    return this.supportService.createRecord(input);
  }

  @Patch("records/:id/status")
  updateRecordStatus(
    @Param("id") id: string,
    @Body() input: UpdateSupportStatusDto,
  ) {
    return this.supportService.updateRecordStatus(id, input.status);
  }
}
