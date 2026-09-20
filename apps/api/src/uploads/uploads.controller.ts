import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import type { Response } from "express";
import { UploadsService } from "./uploads.service";

type UploadedImage = {
  buffer: Buffer;
  mimetype: string;
  size: number;
};

@Controller("uploads")
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post("images")
  @UseInterceptors(FileInterceptor("file", { limits: { fileSize: 5 * 1024 * 1024 } }))
  async uploadImage(@UploadedFile() file?: UploadedImage) {
    return this.uploadsService.saveImage(file);
  }

  @Get(":filename")
  async image(
    @Param("filename") filename: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const image = await this.uploadsService.readImage(filename);
    response.set({
      "Content-Type": image.contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    });
    return new StreamableFile(image.data);
  }
}
