import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put } from "@nestjs/common";
import { AnimalsService } from "./animals.service";
import { CreateAnimalDto } from "./dto/create-animal.dto";
import { UpdateAnimalStatusDto } from "./dto/update-animal-status.dto";
import { UpdateAnimalDto } from "./dto/update-animal.dto";

@Controller("animals")
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  @Get()
  list() {
    return this.animalsService.list();
  }

  @Get(":id")
  getById(@Param("id") id: string) {
    return this.animalsService.getById(id);
  }

  @Post()
  create(@Body() input: CreateAnimalDto) {
    return this.animalsService.create(input);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() input: UpdateAnimalDto) {
    return this.animalsService.update(id, input);
  }

  @Patch(":id/status")
  updateStatus(@Param("id") id: string, @Body() input: UpdateAnimalStatusDto) {
    return this.animalsService.updateStatus(id, input);
  }

  @Delete(":id")
  @HttpCode(204)
  remove(@Param("id") id: string) {
    return this.animalsService.remove(id);
  }
}
