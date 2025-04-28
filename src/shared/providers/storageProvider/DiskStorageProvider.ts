import uploadConfig from "@config/upload";
import fs from "fs";
import path from "path";

export default class DiskStorageProvider {
  public async saveFile(dir: string, file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(dir, file),
      // path.resolve(uploadConfig.directory, file),
    );

    return file;
  }

  public async deleteFile(dir: string, file: string): Promise<void> {
    // const filePath = path.resolve(uploadConfig.directory, file);
    const filePath = path.resolve(dir, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}
