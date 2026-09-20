import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, join } from "node:path";

const MIME_EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

type UploadedImage = {
  buffer: Buffer;
  mimetype: string;
  size: number;
};

@Injectable()
export class UploadsService {
  private readonly uploadDirectory =
    process.env.UPLOAD_DIR ?? join(process.cwd(), "apps/api/uploads");

  async saveImage(file?: UploadedImage) {
    if (!file) throw new BadRequestException("Selecione uma imagem");
    const extension = MIME_EXTENSIONS[file.mimetype];
    if (!extension) {
      throw new BadRequestException("Use uma imagem JPG, PNG ou WebP");
    }
    if (file.size > 5 * 1024 * 1024) {
      throw new BadRequestException("A imagem deve ter no maximo 5 MB");
    }

    await mkdir(this.uploadDirectory, { recursive: true });
    const filename = `${randomUUID()}.${extension}`;
    await writeFile(join(this.uploadDirectory, filename), file.buffer);
    return { filename, path: `/uploads/${filename}` };
  }

  async readImage(filename: string) {
    const safeFilename = basename(filename);
    if (safeFilename !== filename || !/^[a-f0-9-]+\.(jpg|png|webp)$/.test(filename)) {
      throw new NotFoundException("Imagem nao encontrada");
    }
    try {
      const data = await readFile(join(this.uploadDirectory, safeFilename));
      return { data, contentType: contentTypeFor(filename) };
    } catch {
      throw new NotFoundException("Imagem nao encontrada");
    }
  }
}

function contentTypeFor(filename: string): string {
  if (filename.endsWith(".png")) return "image/png";
  if (filename.endsWith(".webp")) return "image/webp";
  return "image/jpeg";
}
