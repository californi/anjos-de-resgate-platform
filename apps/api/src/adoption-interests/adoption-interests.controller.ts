import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { AdoptionInterestsService } from "./adoption-interests.service";
import { CreateAdoptionInterestDto } from "./dto/create-adoption-interest.dto";
import { UpdateAdoptionInterestStatusDto } from "./dto/update-adoption-interest-status.dto";

@Controller("adoption-interests")
export class AdoptionInterestsController {
  constructor(
    private readonly adoptionInterestsService: AdoptionInterestsService,
  ) {}

  @Get()
  list() {
    return this.adoptionInterestsService.list();
  }

  @Get("animal/:animalId")
  listByAnimal(@Param("animalId") animalId: string) {
    return this.adoptionInterestsService.listByAnimal(animalId);
  }

  @Post()
  create(@Body() input: CreateAdoptionInterestDto) {
    return this.adoptionInterestsService.create(input);
  }

  @Patch(":id/status")
  updateStatus(
    @Param("id") id: string,
    @Body() input: UpdateAdoptionInterestStatusDto,
  ) {
    return this.adoptionInterestsService.updateStatus(id, input);
  }
}
